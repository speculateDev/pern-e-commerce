import { ArrowLeftIcon, Trash2Icon, SaveIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProductStore } from '../stores/useProductStore';
import toast from 'react-hot-toast';
import { categories } from '../constants';

function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchProduct, currentProduct, loading, deleteProduct, updateProduct, error } =
    useProductStore();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
  });

  useEffect(() => {
    fetchProduct(id);
  }, [fetchProduct, id]);

  useEffect(() => {
    if (currentProduct) {
      setFormData({
        name: currentProduct.name || '',
        price: currentProduct.price || '',
        image: currentProduct.image || '',
        category: currentProduct.category || '',
      });
    }
  }, [currentProduct]);

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete the product?')) return;
    await deleteProduct(id);
    navigate('/');
  }

  async function handleUpdate() {
    if (!formData.name || !formData.image || !formData.price)
      return toast.error('All Fields are required');
    updateProduct(id, formData);
  }

  if (loading || !currentProduct)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner size-40"></div>
      </div>
    );

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  const { image } = currentProduct;

  return (
    <div className="max-w-4xl container mx-auto py-8 px-4">
      <Link className="btn btn-ghost mb-8" to="/">
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* PRODUCT IMAGE */}
        <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
          <img
            src={image}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
            alt="Product Image"
            className="size-full object-cover"
          />
        </div>

        {/* PRODUCT FORM */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Edit Product</h2>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {/* PRODUCT NAME */}
              <div className="form-control">
                <label htmlFor="name" className="label">
                  Product Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered w-full"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              {/* PRODUCT PRICE */}
              <div className="form-control">
                <label htmlFor="price" className="label">
                  Product Price
                </label>

                <input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  className="input input-bordered w-full"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              {/* PRODUCT NAME */}
              <div className="form-control">
                <label htmlFor="img" className="label">
                  Image URL
                </label>

                <input
                  id="img"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="https://example.com/image.png"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              {/* FORM CATEGORY */}
              <div className="form-control">
                <label htmlFor="category">
                  <span>Category</span>
                </label>
                <select
                  id="category"
                  className="mt-2 select select-bordered select-primary max-w-sl w-full text-base"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="" disabled className="text-gray-500">
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* FORM ACTIONS */}
              <div className="flex justify-between mt-8">
                <button onClick={handleDelete} type="button" className="btn btn-error">
                  <Trash2Icon className="size-4 mr-2" />
                  Delete Product
                </button>

                <button
                  disabled={loading || !formData.name || !formData.image || !formData.price}
                  onClick={handleUpdate}
                  type="submit"
                  className="btn btn-primary"
                >
                  {loading ? (
                    <span className="loading loading-spinner size-16"></span>
                  ) : (
                    <>
                      <SaveIcon className="size-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
