import { EditIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../stores/useProductStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useCartStore } from '../stores/useCartStore';

function ProductCard({ product }) {
  const { deleteProduct } = useProductStore();
  const { addToCart } = useCartStore();

  function handleDelete() {
    if (!confirm('Are you sure you want to delete?')) return;
    deleteProduct(product.id);
  }
  const { isAdmin, authUser } = useAuthStore();

  return (
    <div className="card overflow-hidden bg-base-100 shadow-2xl hover:shadow-2xl transition-shadow duration-300">
      {/* PRODUCT IMAGE */}
      <figure className="relative pt-[56.25%]">
        <img
          onError={(e) => {
            e.target.style.display = 'none';
          }}
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        {/* PRODUCT INFO */}
        <h2 className="card-title text-lg font-semibold">{product.name}</h2>
        <p className="text-2xl font-bold text-primary">${Number(product.price).toFixed(2)}</p>
        {/* CARD ACTIONS */}
        {isAdmin && (
          <div className="card-actions justify-end mt-4">
            <Link to={`/products/${product.id}`} className="btn btn-sm btn-info btn-outline">
              <EditIcon className="size-4" />
            </Link>

            <button className="btn btn-sm btn-error btn-outline" onClick={handleDelete}>
              <Trash2Icon className="size-4" />
            </button>
          </div>
        )}

        {authUser && (
          <button onClick={() => addToCart(product)} className="btn btn-primary mt-6">
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
