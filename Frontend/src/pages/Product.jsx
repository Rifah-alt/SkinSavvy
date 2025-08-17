import { FaMinus, FaPlus } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { showAverage } from "../components/rating";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const location = useLocation();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  let price;

  const handleQuantity = (action) => {
    if (action === "dec") {
      setQuantity(quantity === 1 ? 1 : quantity - 1);
    }

    if (action === "inc") {
      setQuantity(quantity + 1);
    }
  };
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest.get("/products/find/" + id);

        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [id]);

  const handlePrice = (
    originalPrice,
    discountedPrice,
    wholePrice,
    minimumQuantity,
    quantity
  ) => {
    if (quantity > minimumQuantity && discountedPrice) {
      discountedPrice = wholePrice;

      price = discountedPrice;

      return price;
    } else if (quantity > minimumQuantity && originalPrice) {
      originalPrice = wholePrice;

      price = originalPrice;

      return price;
    } else if (discountedPrice) {
      price = discountedPrice;

      return price;
    } else {
      price = originalPrice;

      return price;
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, price }));
    toast.success("Product has been added to basket successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="h-auto flex justify-stretch p-[30px]">
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
      <div className="flex-1 h-[500px] w-[600px]">
        <img
          src={product.img}
          alt=""
          className="h-[100%] w-[100%] object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col ml-10">
        <h2 className="text-[25px] font-semibold mb-[20px]">{product.title}</h2>
        <span>{product.desc}</span>

        <span className="text-xl font-semibold my-2">
          ${" "}
          {handlePrice(
            product.originalPrice,
            product.discountedPrice,
            product.wholesalePrice,
            product?.wholesaleMinimumQuantity,
            quantity
          )}
        </span>

        <div className="flex items-center my-6">
        {product && product?.ratings && product?.ratings.length > 0
              ? showAverage(product)
              : ""}
        </div>

        <div className="h-52 w-96 border-2 border-gray-300 rounded-lg shadow-md my-4 p-6 bg-white">
          <h2 className="flex items-center justify-center font-semibold text-lg text-gray-700 mb-4">
            WHAT’S IN THE BOX
          </h2>
          <hr className="mb-4" />
          <span className="block text-gray-600 text-base">
            1 Garnier Even & Matte Vitamin C Cleansing Foam 500ml
          </span>
        </div>

        <div className="inline-flex items-center bg-[#ef93db] text-white font-semibold text-sm px-6 py-4 rounded-full shadow-md">
          Wholesale Available: ${product.wholesalePrice} as from{" "}
          {product?.wholesaleMinimumQuantity} items
        </div>

        <div className="flex items-center my-5 p-4 ">
          <FaMinus
            className="bg-[#ef93db] text-white cursor-pointer p-2 rounded-full mr-4 text-3xl"
            onClick={() => handleQuantity("dec")}
          />
          <span className="text-lg font-semibold mx-4">{quantity}</span>
          <FaPlus
            className="bg-[#ef93db] text-white cursor-pointer p-2 rounded-full ml-4 text-3xl"
            onClick={() => handleQuantity("inc")}
          />
        </div>

        <button
          className="bg-[#1e1e1e] p-[10px] w-[200px] text-white cursor-pointer"
          onClick={handleClick}
        >
          Add to Cart
        </button>

        <hr className="my-6" />

        <div className="flex flex-col">
          <h2 className="font-semibold text-[18px]">Reviews</h2>
          {product.ratings?.map((rating, index) =>
          
          <div className="flex items-center" key={index}>
            <StarRatings
              numberOfStars={5}
              rating={rating.star}
              isSelectable={true}
              starRatedColor="yellow"
              starDimension="30px"
              starSpacing="2px"
            />
            <span className="font-semibold mx-[20px]">{rating.name}</span>
            <span>{rating.comment}</span>
          </div>
          
          )}
          

          
        </div>
      </div>
    </div>
  );
};

export default Product;