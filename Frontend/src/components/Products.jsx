import { useState, useEffect } from "react";
import { userRequest } from "../requestMethods.js";
import { Link } from "react-router-dom";
import { showAverage } from "./rating.jsx";
import PropTypes from "prop-types";

const Products = ({ filters, sort, query }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        let res;
        if (query) {
          res = await userRequest.get(`/products?search=${query}`);
        } else {
          res = await userRequest.get(`/products`);
        }
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [query]);

  useEffect(() => {
    let tempProducts = [...products];

    // Apply filters
    if (filters) {
      tempProducts = tempProducts.filter((item) =>
        Object.entries(filters).every(([key, value]) => {
          if (!value) return true; // Skip empty filters
          return item[key].includes(value);
        })
      );
    }

    // Apply sorting
    if (sort === "newest") {
      tempProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sort === "asc") {
      tempProducts.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sort === "desc") {
      tempProducts.sort((a, b) => b.discountedPrice - a.discountedPrice);
    }

    setFilteredProducts(tempProducts);
  }, [products, filters, sort]);

  return (
    <div className="flex flex-wrap mx-[30px]">
      {filteredProducts.map((product, index) => (
        <Link to={`/product/${product._id}`} key={index}>
          <div className="flex flex-col items-center justify-center h-[500px] w-[250px] m-[20px] cursor-pointer">
            <img
              src={product.img}
              alt=""
              className="h-[400px] w-[400px] object-cover"
            />
            <h2 className="font-semibold text-[18px]">{product.title}</h2>
            {product && product?.ratings && product?.ratings.length > 0
              ? showAverage(product)
              : ""}
          </div>
        </Link>
      ))}
    </div>
  );
};

Products.propTypes = {
  cat: PropTypes.string,
  filters: PropTypes.object,
  sort: PropTypes.string,
  query: PropTypes.string,
};

export default Products;