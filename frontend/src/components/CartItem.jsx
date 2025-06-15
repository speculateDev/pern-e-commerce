import { TrashIcon, PlusIcon, MinusIcon } from 'lucide-react';

function CartItem({ item }) {
  return (
    <div className="md:flex rounded-lg border p-4 shadow-sm border-neutral-content/10 bg-neutral md:p-6 md:gap-6">
      <img className="h-20 md:h-32 rounded object-cover" src={item.image} alt="Product Image" />

      <div className="w-full flex-1 space-y-4">
        <p className="text-base font-medium text-white hover:text-primary hover:underline">
          {item.name}
        </p>
        <p className="text-sm ">{item.category}</p>

        <button className="text-red-400 hover:text-red-300 hover:underline">
          {<TrashIcon />}
        </button>
      </div>

      <div className="flex items-center  justify-end">
        <div className="flex items-center gap-2">
          <button className="h-5 w-5 inline-flex items-center rounded-md border bg-neutral border-neutral-content/30 focus:ring-2 focus:ring-primary focus:outline-none">
            <MinusIcon />
          </button>
          <p>{item.quantity}</p>
          <button className="h-5 w-5 inline-flex items-center rounded-md border bg-neutral border-neutral-content/30 focus:ring-2 focus:ring-primary focus:outline-none">
            <PlusIcon />
          </button>
        </div>

        <div className="text-end w-32">
          <p className="font-bold text-primary">${item.price}</p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
