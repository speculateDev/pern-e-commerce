import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useThemeStore } from './stores/useThemeStore';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';

import Navbar from './components/Navbar';

function App() {
  const { theme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
