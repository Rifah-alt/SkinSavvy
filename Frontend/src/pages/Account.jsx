import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/userRedux";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      const storageKey = `userProfile_${user._id}`;
      const savedData = localStorage.getItem(storageKey);

      if (savedData) {
        const profile = JSON.parse(savedData);
        setName(profile.name);
        setEmail(profile.email);
        setPhone(profile.phone);
        setAddress(profile.address);
      } else {
        setName(user.name);
        setEmail(user.email);
        setPhone("+1 (555) 123-4567");
        setAddress("DownTown 123, Sydney");
      }
    }
  }, [user]);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (user) {
      const storageKey = `userProfile_${user._id}`;
      const profileData = { name, email, phone, address };
      localStorage.setItem(storageKey, JSON.stringify(profileData));
      setMessage("Changes Successfull!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setMessage("Password update submitted");
    setTimeout(() => setMessage(""), 3000);
    console.log("Password update submitted");
  };

  const handleLogout = () => {
    if (user) {
      localStorage.removeItem(`userProfile_${user._id}`);
    }
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
        <div className="mb-8">
          <h2 className="text-xl font-extrabold mb-6 text-gray-800">
            Account Information
          </h2>
          <div className="space-y-4">
            <p className="text-xl font-semibold text-gray-800">{name}</p>
            <p className="text-gray-600">{email}</p>
            <p className="text-gray-600">{phone}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Account Settings</h3>
          <form className="space-y-6" onSubmit={handleSaveChanges}>
            <div>
              <label className="block text-gray-700 text-sm font-semibold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold">Telephone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {message && <p className="text-center text-sm text-green-600">{message}</p>}
            <button
              type="submit"
              className="w-full bg-[#1e1e1e] text-white p-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Save Changes
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-800">Change Password</h3>
          <form className="space-y-6" onSubmit={handlePasswordUpdate}>
            <div>
              <label className="block text-gray-700 text-sm font-semibold">
                Current Password
              </label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold">
                New Password
              </label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1e1e1e] text-white p-3 rounded-lg shadow-md hover:bg-gray-500 transition duration-300"
            >
              Update Password
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full bg-red-500 text-white p-3 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;