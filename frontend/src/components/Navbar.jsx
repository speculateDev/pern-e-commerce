import { useEffect } from 'react';
import { Link, useResolvedPath } from 'react-router-dom';
import { ShoppingCartIcon, ShoppingBagIcon, CircleUserRound, LogOut } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import { useProductStore } from '../stores/useProductStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useCartStore } from '../stores/useCartStore';

function Navbar() {
  const { products } = useProductStore();
  const { authUser, logout } = useAuthStore();
  const { cart, getCartItems } = useCartStore();

  useEffect(() => {
    if (authUser) getCartItems();
  }, [getCartItems, authUser]);

  const { pathname } = useResolvedPath();
  const isHomePage = pathname === '/';

  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar min-h-[4rem] px-4 justify-between">
          {/* LOGO */}
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-2">
              <ShoppingCartIcon className="size-9 text-primary" />
              <span className="hidden sm:inline font-semibold font-mono tracking-widest text-md sm:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                POSGRESTORE
              </span>
            </div>
          </Link>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            <ThemeSelector />

            <>
              {isHomePage && (
                <div className="indicator">
                  <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                    <ShoppingBagIcon className="size-5" />
                    <span className="badge badge-sm badge-primary indicator-item">
                      {products.length}
                    </span>
                  </div>
                </div>
              )}

              {authUser && (
                <Link className="indicator cursor-pointer" to="/cart">
                  <div className="p-2 rounded-full hover:bg-gray-300/10 transition-colors">
                    <ShoppingCartIcon className="size-5" />
                    <span className="badge badge-sm badge-error indicator-item">
                      {cart.length}
                    </span>
                  </div>
                </Link>
              )}

              {!authUser ? (
                <Link className="btn btn-md btn-ghost" to={'/auth'}>
                  <CircleUserRound />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              ) : (
                <button className="btn btn-md btn-ghost" onClick={() => logout()}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
