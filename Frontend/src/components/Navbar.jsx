import { FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Badge from "@mui/material/Badge";
import { useSelector} from "react-redux";
import { useState } from "react";


const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const [search, setSearch] = useState('');
  const user = useSelector((state) => state.user);
  return (
    <div className="flex items-center justify-between h-[100px] bg-white shadow-md px-6">
      <div className="cursor-pointer m-2">
        <Link to="/">
          <img src="/skinlogo1.png" height="150px" width="200px" alt="" />
        </Link>
      </div>
      <div className="flex items-center m-2">
        <input
          type="text"
          placeholder="Search products"
          onChange={(e) => setSearch(e.target.value)}
          className="p-[15px] border-2 border-[#f096dd] border-solid w-[500px] outline-none rounded-lg mr-[-30px]"
        />
        <Link to={`/products/${search}`}>
           <FaSearch className="text-[20px] cursor-pointer" />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/cart" className="relative group">
          <Badge badgeContent={quantity} color="secondary">
            <ShoppingBasketIcon className="text-[#e455c5] group-hover:text-pink-600 transition duration-300" />
          </Badge>
        </Link>
        <Link to="/login" className="flex items-center space-x-2 border border-pink-300 p-2 rounded-lg hover:bg-pink-100 transition duration-300">
          <FaUser className="text-[#e455c5] hover:text-pink-600 transition duration-300" />
          {!user.currentUser ? <span className="text-[#e455c5] hover:text-pink-600 transition duration-300 font-semibold">Login</span>: 
          <Link to="/myaccount"><span className="text-[#e455c5] hover:text-pink-600 transition duration-300 font-semibold">{user.currentUser.name}</span></Link>
          }
        </Link>
      </div>
    </div>
  );
};

export default Navbar;