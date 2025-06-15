import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useThemeStore } from './stores/useThemeStore';
import { useAuthStore } from './stores/useAuthStore';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CheckingAuthSpinner from './components/CheckingAuthSpinner';

import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

import Navbar from './components/Navbar';
import { THEMES } from './constants';

function App() {
  const { theme } = useThemeStore();
  const { checkAuth, authUser, checkingAuth, isAdmin } = useAuthStore();

  // Get toastStyling
  const currentTheme = THEMES.find((t) => theme === t.name);
  const toastBackground = currentTheme.colors[0];

  const toastBorder = currentTheme.colors[1];
  const toastText = currentTheme.colors[2];

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <CheckingAuthSpinner />;

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={authUser ? <Navigate to="/" /> : <AuthPage />} />
        <Route
          path="/products/:id"
          element={isAdmin ? <ProductPage /> : <Navigate to="/auth" />}
        />
        <Route path="/cart" element={!authUser ? <Navigate to="/" /> : <CartPage />} />
      </Routes>

      <Toaster
        toastOptions={{
          style: {
            background: toastBackground,
            border: `2px solid ${toastBorder}`,
            color: toastText,
          },
        }}
      />
    </div>
  );
}

export default App;
