import { useEffect } from 'react';
import CartItem from '../components/CartItem';
import { useCartStore } from '../stores/useCartStore';
import OrderSummary from '../components/OrderSummary';
import PeopleAlsoBought from '../components/PeopleAlsoBought';
import { useProductStore } from '../stores/useProductStore';

function CartPage() {
  const { cart, getCartItems, loading } = useCartStore();
  const { getFeaturedProducts } = useProductStore();

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  useEffect(() => {
    getFeaturedProducts();
  }, [getFeaturedProducts]);

  if (loading)
    return (
      <div className="mt-16 flex items-center justify-center h-64">
        <span className="loading loading-spinner loading-lg size-24" />
      </div>
    );

  return (
    <div className="container mx-auto py-8 md:py-16 px-4">
      <div className="md:gap-6 xl:gap-8 lg:flex mt-6 sm:mt-8">
        {cart.length > 0 && <OrderSummary />}

        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl mb-6 lg:mb-0">
          <div className="space-y-6">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <PeopleAlsoBought />
        </div>
      </div>
    </div>
  );
}

export default CartPage;
