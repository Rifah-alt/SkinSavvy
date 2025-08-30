import {
  FaBox,
  FaChartBar,
  FaClipboard,
  FaClipboardList,
  FaCog,
  FaElementor,
  FaHdd,
  FaHome,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom"; 


const Menu = () => {
  const [activeLink, setActiveLink] = useState("/");
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <div className="h-[100vh] bg-gray-100 p-[20px] w-[350px] shadow-lg">
      <ul className="flex flex-col items-start justify-start mt-[20px] pl-[20px]">
        <Link to="/" onClick={() => handleLinkClick("/")}>
          <li
            className={`flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100      
            ${
              activeLink === "/"
                ? "bg-[#ef93db] p-[10px] w-[200px] text-white"
                : ""
            }
            
            `}
          >
            <FaHome
              className={`mr-[15px] text-[#ef93db]  ${
                activeLink === "/" ? "text-white" : "text-[#ef93db]"
              }`}
            />
            Home
          </li>
        </Link>
        <li className="flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100">
          <FaUser className="mr-[15px]  text-[#ef93db] " />
          Profile
        </li>

        <hr className="w-full my-[20px] border-gray-300" />

        <Link to="/users" onClick={() => handleLinkClick("/users")}>
          <li
            className={`flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100
            
              ${
                activeLink === "/users"
                  ? "bg-[#ef93db] p-[10px] w-[200px] text-white"
                  : ""
              }
            
            `}
          >
            <FaBox
              className={`mr-[15px] text-[#ef93db]  ${
                activeLink === "/users" ? "text-white" : "text-[#ef93db]"
              }`}
            />
            Users
          </li>
        </Link>

        <Link to="/products" onClick={() => handleLinkClick("/products")}>
          <li
            className={`flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100
            
              ${
                activeLink === "/products"
                  ? "bg-[#ef93db] p-[10px] w-[200px] text-white"
                  : ""
              }
            
            `}
          >
            <FaUsers
              className={`mr-[15px] text-[#ef93db]  ${
                activeLink === "/products" ? "text-white" : "text-[#ef93db]"
              }`}
            />
            Products
          </li>
        </Link>

        <Link to="/orders" onClick={() => handleLinkClick("/orders")}>
          <li
            className={`flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100
            
              ${
                activeLink === "/orders"
                  ? "bg-[#ef93db] p-[10px] w-[200px] text-white"
                  : ""
              }
            
            `}
          >
            <FaClipboardList
              className={`mr-[15px] text-[#ef93db]  ${
                activeLink === "/orders" ? "text-white" : "text-[#ef93db]"
              }`}
            />
            Orders
          </li>
        </Link>

        <hr className="w-full my-[20px] border-gray-300" />


        <li className="flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100">
          <FaCog className="mr-[15px] text-[#ef93db] " />
          Settings
        </li>

        <li className="flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100">
          <FaHdd className="mr-[15px] text-[#ef93db] " />
          Backups
        </li>
        <hr className="w-full my-[20px] border-gray-300" />
        <li className="flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100">
          <FaChartBar className="mr-[15px] text-[#ef93db] " />
          Charts
        </li>

        <li className="flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100">
          <FaClipboard className="mr-[15px] text-[#ef93db] " />
          All logs
        </li>

        <li className=" flex items-center justify-between text-[20px] cursor-pointer mt-[20px] transition-colors duration-100 shadow-lg">
        <FaUser className="mr-2 text-[#ef93db]" />
        <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Menu;