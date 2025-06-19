import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import { loadStripe } from '@stripe/stripe-js';
import { axios } from '../lib/axios';

function OrderSummary() {
  const { total, cart } = useCartStore();

  async function handlePayment() {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

    const res = await axios.post('/payment/create-checkout-session', {
      products: cart,
    });

    const session = res.data;

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error('Error: ', result.error);
    }
  }

  return (
    <div className="max-w-4xl flex-1 space-y-6 lg:order-2 mb-7 lg:mb-0">
      <div className="space-y-4 rounded-lg border border-neutral-content/30 bg-neutral p-4 sm:p-6">
        <p className="text-primary font-semibold text-2xl">Order Summary</p>

        <div className="space-y-4">
          <dl className="flex items-center justify-between border-b border-neutral-content/30 pb-2">
            <dt className="text-base font-normal text-neutral-content">Total</dt>

            <dt className="text-base text-primary font-bold">${total}</dt>
          </dl>

          <button
            onClick={handlePayment}
            className="btn w-full btn-primary text-sm hover:scale-105"
          >
            Proceed to checkout
          </button>

          <div className="flex items-center justify-center gap-2">
            <span className="text-neutral-content/50">or</span>
            <Link
              to="/"
              className="flex items-center text-primary gap-2 underline font-medium hover:no-underline hover:brightness-125"
            >
              Continue Shopping
              <MoveRight className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
