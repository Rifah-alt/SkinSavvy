import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userRequest } from "../requestMethods";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await userRequest.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center mt-[5%]">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex items-center bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="h-[500px] w-[500px] transition-transform duration-700 ease-in-out transform hover:scale-105">
          <img
            src="/lotion1.jpg"
            alt="Register"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="p-10  w-[500px]">
          <h2 className="text-xl font-bold text-gray-700 mb-5">Register</h2>
          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d55fbb]"
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d55fbb]"
                placeholder="example@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d55fbb]"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#d55fbb] text-white font-bold rounded-md transition-transform duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transform hover:scale-105"
              onClick={handleRegister}
            >
              Register
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-600">
            <span>Have an account already? </span>
            <Link to="/login" className="text-red-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;