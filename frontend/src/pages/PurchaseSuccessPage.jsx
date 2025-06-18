import { ArrowRight, CheckCircle, HandHeart } from 'lucide-react';
import { Link } from 'react-router-dom';

function PurchaseSuccessPage() {
  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-neutral rounded-lg shadow-xl overflow-hidden relative z-10">
        <div className="p-6 sm:p-8 ">
          <div className="flex justify-center">
            <CheckCircle className="text-primary-400 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-primary-400 mb-2">
            Purchase Successful!
          </h1>

          <p className="text-neutral-content text-center mb-2">
            Thank you for your order. {"We're"} processing it now.
          </p>
          <p className="text-primary-400 text-center text-sm mb-6">
            Check your email for order details and updates
          </p>

          <div className="rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-content">Order number</span>
              <span className="text-sm text-primary font-semibold">
                {new URLSearchParams(window.location.search).get('session_id')?.slice(-8)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-content">Estimated delivery</span>
              <span className="text-sm text-primary font-semibold">3-5 business days</span>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-primary hover:bg-primary/70 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center">
              <HandHeart className="mr-2" size={18} />
              Thanks for trusting us!
            </button>

            <Link
              to="/"
              className="w-full bg- hover:bg-primary/20 text-neutral-content font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            >
              Continue Shopping
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseSuccessPage;
