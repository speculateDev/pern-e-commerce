import { useState } from 'react';
import { DollarSign, Image, PackageIcon, PlusCircleIcon } from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';
import { categories } from '../constants';

function AddProductModal() {
  const defaultValues = {
    name: '',
    price: '',
    image: '',
    category: '',
  };

  const { addProduct, loading } = useProductStore();
  const [formData, setFormData] = useState(defaultValues);

  return (
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box">
        {/* CLOSE BUTTON */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
        </form>

        {/* MODAL HEADER */}
        <h3 className="font-bold text-xl mb-8">Add New Product</h3>

        <div className="space-y-6">
          <div className="grid gap-6">
            {/* PRODUCT NAME INPUT */}
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span>Product Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <PackageIcon className="size-5" />
                </div>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            {/* PRODUCT PRICE INPUT */}
            <div className="form-control">
              <label className="label" htmlFor="price">
                <span>Price</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <DollarSign className="size-5" />
                </div>

                <input
                  id="price"
                  type="number"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label" htmlFor="image">
                <span>Image URL</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Image className="size-5" />
                </div>

                <input
                  id="image"
                  type="text"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  step="0.01"
                  min="0"
                  placeholder="https://example.com/image.png"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
            </div>

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
          </div>

          {/* MODAL ACTIONS */}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost">Cancel</button>
            </form>

            <button
              onClick={() => {
                addProduct(formData);
                setFormData(defaultValues);
              }}
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={
                !formData.name || !formData.price || !formData.image || !formData.category
              }
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="size-5 mr-2" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>Close</button>
      </form>
    </dialog>
  );
}

export default AddProductModal;
