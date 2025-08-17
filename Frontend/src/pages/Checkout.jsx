import { useEffect } from "react";
import { useSelector} from "react-redux";

const Checkout = () => {
  const user = useSelector((state) => state.user);

  useEffect(()=>{
    const getUserCart = () =>{

    }
    getUserCart()
  },[])
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl flex">
        {/* Left Section: Form */}
        <div className="w-full md:w-2/3 pr-4">
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>
          
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input type="text" value={user.currentUser.name} className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input type="email" value={user.currentUser.email} className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700">City</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700">State</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700">Zip Code</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700">Card Details</label>
              <input type="text" placeholder="Card Number" className="w-full p-2 border border-gray-300 rounded mt-1 mb-2" />
              <input type="text" placeholder="MM/YY" className="w-full p-2 border border-gray-300 rounded mt-1 mb-2" />
              <input type="text" placeholder="CVC" className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            
            <button type="submit" className="w-full bg-[#1e1e1e] text-white p-2 rounded mt-4 hover:bg-blue-600">Place Order</button>
          </form>
        </div>

        {/* Right Section: Order Summary */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg border border-gray-300">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="mb-4">
            <p className="text-gray-700">Item 1</p>
            <p className="text-gray-600">$20.00</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">Item 2</p>
            <p className="text-gray-600">$15.00</p>
          </div>
          <div className="border-t border-gray-300 pt-4">
            <p className="font-semibold text-gray-700">Total</p>
            <p className="text-xl font-bold">$35.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;