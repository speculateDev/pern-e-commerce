import { useProductStore } from '../stores/useProductStore';
import ProductCard from './ProductCard';

function PeopleAlsoBought() {
  const { featuredProducts, loading } = useProductStore();

  if (loading)
    return (
      <div className="mt-16 flex items-center justify-center h-64">
        <span className="loading loading-spinner loading-lg size-24" />
      </div>
    );

  return (
    <div className="mt-8">
      <h3 className="text-2xl text-primary font-bold">People Also bought</h3>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default PeopleAlsoBought;
