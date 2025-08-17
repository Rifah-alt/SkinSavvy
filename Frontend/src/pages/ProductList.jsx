import { useState } from "react";
import { useLocation } from "react-router-dom";
import Products from "../components/Products";

const ProductList = () => {
  const location = useLocation();
  const query = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between m-4">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-lg font-semibold mr-4">Filter Products:</span>
          <select
            name="concern"
            className="p-2 mb-4 sm:mb-0 sm:mr-4"
            onChange={handleFilters}
          >
            <option disabled selected>
              Concern
            </option>
            <option>Dry Skin</option>
            <option>Pigmentation</option>
            <option>Oil Control</option>
            <option>Anti Acne</option>
            <option>Sunburn</option>
            <option>Skin Brightening</option>
            <option>Tan Removal</option>
            <option>Night Routine</option>
            <option>UV Protection</option>
            <option>Damaged Hair</option>
            <option>Frizzy Hair</option>
            <option>Stretch Marks</option>
            <option>Color Protection</option>
            <option>Dry Hair</option>
            <option>Soothing</option>
            <option>Dandruff</option>
            <option>Greying</option>
            <option>Hairfall</option>
            <option>Hair Color</option>
            <option>Well Being</option>
            <option>Acne</option>
            <option>Hair Growth</option>
          </select>

          <select
            name="brand"
            className="p-2 mb-4 sm:mb-0 sm:mr-4"
            onChange={handleFilters}
          >
            <option disabled selected>
              Popular Brands
            </option>
            <option>Garnier</option>
            <option>Kylie</option>
            <option>Kiss Beauty</option>
            <option>Dr Rashel</option>
            <option>Luron</option>
            <option>Nivea</option>
            <option>Heaven Dove</option>
            <option>Disaar</option>
            <option>Johnsons Baby</option>
            <option>Rexona</option>
            <option>Kylie</option>
          </select>

          <select
            name="skintype"
            className="p-2 mb-4 sm:mb-0"
            onChange={handleFilters}
          >
            <option disabled selected>
              Skin type
            </option>
            <option>All</option>
            <option>Oily</option>
            <option>Dry</option>
            <option>Sensitive</option>
            <option>Normal</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-lg font-semibold mr-4">Sort Products:</span>
          <select className="p-2" onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>

      <Products query={query}  filters={filters} sort={sort}  />
    </div>
  );
};

export default ProductList;