import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import StarRating from "react-star-ratings";

const Order = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const getUserOrder = async () => {
      try {
        const res = await userRequest.get(
          `/orders/find/${user.currentUser._id}`
        );
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserOrder();
  }, [user]);

  const handleRating = async(id) =>{
    const singleRating = {
      star: rating,
      name: user.currentUser.name,
      postedBy: user.currentUser_id,
      comment: comment,
    };
    try {
      await userRequest.put(`/products/ratings/${id}`, singleRating);
      setComment("")
      setRating(0);
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="text-center mb-8">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Thank You for Your Orders!</h1>
          <p className="text-gray-600 mt-2">
            Here are the details of your recent orders.
          </p>
        </div>

        {orders.map((order, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Order #{index + 1}</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Items Ordered</h3>
                <div className="flex flex-col space-y-4">
                  {order.products.map((item, idx) => (
                    <div className="flex flex-col" key={idx}>
                      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1 ml-4">
                          <h4 className="text-lg font-semibold">
                            {item.title}
                          </h4>
                          <p className="text-gray-600">{item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{item.price}</p>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <h3 className="my-3">Rate this product</h3>
                        <StarRating
                          numberOfStars={5}
                          starDimension="25px"
                          rating={rating}
                          isSelectable={true}
                          starRatedColor={"#FF7BA9"}
                          changeRating={(newRating) => {
                            setRating(newRating);
                          }}
                        />
                        <textarea
                          name=""
                          id=""
                          onChange={(e) => setComment(e.target.value)}
                          className="p-[10px] w-[300px] mt-3"
                          placeholder="leave a message"
                        ></textarea>
                        <button className="bg-[#1e1e1e] mt-3 w-[200px] p-[5px] text-white" onClick={() => handleRating(item._id)}>
                          Submit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">
                  Shipping Information
                </h3>
                <p className="text-gray-600">{order.email}</p>
                <p className="text-gray-600">{order?.phone}</p>
                <p className="text-gray-600">{order.name}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
                <p className="text-gray-600">VISA</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-medium">Subtotal:</span>
                  <span className="text-lg font-semibold">{order.total}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-medium">Shipping:</span>
                  <span className="text-lg font-semibold">$10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg font-medium">Total:</span>
                  <span className="text-lg font-bold">{order.total}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-8 text-center">
          <Link to="/">
            <button className="bg-[#ef93db] text-white p-3 rounded-lg font-semibold">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Order;