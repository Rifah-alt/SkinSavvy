import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { userRequest } from '../requestMethods';

const Product = () => {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];

  const [product, setProduct] = useState(null);
  const [inputs, setInputs] = useState({});  // only changed fields
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // NOTE: no leading slash to avoid double slashes with baseURL
        const res = await userRequest.get(`products/find/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Fetch product failed:', err);
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Cast number inputs to Number, booleans to true/false
    let casted = value;
    if (type === 'number') casted = value === '' ? '' : Number(value);
    if (name === 'inStock') casted = value === 'true';
    setInputs((prev) => ({ ...prev, [name]: casted }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!product) return;

    // Build payload: only send changed fields
    const payload = { ...inputs };

    // If nothing was changed, no need to call API
    if (Object.keys(payload).length === 0) {
      alert('No changes to save.');
      return;
    }

    try {
      setSaving(true);
      // PUT /api/v1/products/:id
      await userRequest.put(`products/${id}`, payload);
      // Update local UI so it reflects saved data
      setProduct((prev) => ({ ...prev, ...payload }));
      setInputs({});
      alert('Product updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      alert(err?.response?.data?.message || 'Update failed. Check console.');
    } finally {
      setSaving(false);
    }
  };

  if (!product) {
    return (
      <div className="p-5 w-[70vw]">
        <h3 className="text-2xl">Loading product…</h3>
      </div>
    );
  }

  return (
    <div className="p-5 w-[70vw]">
      {/* FIRST PART */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-3xl font-semibold">Product</h3>
        <Link to="/newproduct">
          <button className="bg-slate-400 p-[10px] font-semibold text-white cursor-pointer">
            Create
          </button>
        </Link>
      </div>

      {/* SECOND PART */}
      <div className="flex flex-col md:flex-row gap-5">
        {/* CHART */}
        <div className="flex-1">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
            height={250}
            width={500}
            margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
            grid={{ vertical: true, horizontal: true }}
          />
        </div>

        {/* PRODUCT CARD */}
        <div className="flex-1 bg-white p-5 shadow-lg rounded-lg">
          <div className="flex items-center mb-5">
            <img src={product.img} alt="" className="h-20 w-20 rounded-full mr-5" />
            <span className="text-2xl font-semibold">Product Image</span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-semibold">ID:</span>
              <span>{product._id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Sales:</span>
              <span>{product._id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">In stock:</span>
              <span>{product.inStock ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* THIRD PART – UPDATE FORM */}
      <div className="mt-5 bg-white p-5 shadow-lg rounded-lg">
        <form className="flex flex-col md:flex-row gap-5" onSubmit={handleUpdate}>
          {/* LEFT */}
          <div className="flex-1 space-y-5">
            <div>
              <label className="block mb-2 font-semibold">Product Name</label>
              <input
                type="text"
                name="title"
                value={inputs.title ?? product.title ?? ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Product Description</label>
              <input
                type="text"
                name="desc"
                value={inputs.desc ?? product.desc ?? ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Product Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={
                  inputs.originalPrice ??
                  (typeof product.originalPrice === 'number' ? product.originalPrice : '')
                }
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Product Discounted Price</label>
              <input
                type="number"
                name="discountedPrice"
                value={
                  inputs.discountedPrice ??
                  (typeof product.discountedPrice === 'number' ? product.discountedPrice : '')
                }
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">InStock</label>
              <select
                name="inStock"
                value={String(inputs.inStock ?? !!product.inStock)}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-1 flex flex-col items-center space-y-5">
            <div className="flex flex-col items-center">
              <img src={product.img} alt="" className="h-40 w-40 rounded-full mr-5" />
              <label className="cursor-pointer mt-5">
                <FaUpload className="text-2xl text-gray-700" />
              </label>

              <button
                type="submit"
                disabled={saving}
                className="bg-slate-500 disabled:opacity-60 text-white py-2 px-4 rounded mt-5"
              >
                {saving ? 'Saving…' : 'Update'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
