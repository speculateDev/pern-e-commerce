import { Link, useResolvedPath } from 'react-router-dom';
import { ShoppingCartIcon, ShoppingBagIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import { useProductStore } from '../stores/useProductStore';

function Navbar() {
  const { products } = useProductStore();

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
              <span className="font-semibold font-mono tracking-widest text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                POSGRESTORE
              </span>
            </div>
          </Link>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            <ThemeSelector />

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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
