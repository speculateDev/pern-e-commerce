import { categories } from '../constants';
import { useProductStore } from '../stores/useProductStore';

function FilterCategory() {
  const { filter } = useProductStore();

  return (
    <div className="flex justify-center gap-10 mb-10">
      {categories.map((category) => (
        <button onClick={() => filter(category)} key={category} className="btn btn-outline">
          {category}
        </button>
      ))}
    </div>
  );
}

export default FilterCategory;
