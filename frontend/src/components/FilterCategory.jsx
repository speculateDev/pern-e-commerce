import { categories } from '../constants';
import { useProductStore } from '../stores/useProductStore';

function FilterCategory() {
  const { filter } = useProductStore();

  return (
    <div className="flex justify-center items-center gap-5 mb-10 flex-wrap md:flex-nowrap">
      {categories.map((category) => (
        <button onClick={() => filter(category)} key={category} className="btn btn-outline">
          {category}
        </button>
      ))}
    </div>
  );
}

export default FilterCategory;
