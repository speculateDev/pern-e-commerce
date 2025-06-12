import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useThemeStore } from './stores/useThemeStore';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import { THEMES } from './constants';

function App() {
  const { theme } = useThemeStore();

  // Get toastStyling
  const currentTheme = THEMES.find((t) => theme === t.name);
  const toastBackground = currentTheme.colors[0];

  const toastBorder = currentTheme.colors[1];
  const toastText = currentTheme.colors[2];

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
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
