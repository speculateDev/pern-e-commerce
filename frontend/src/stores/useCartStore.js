import { create } from 'zustand';
import { axios } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useCartStore = create((set, get) => ({
  cart: [],
  total: 0,
  loading: false,

  getCartItems: async () => {
    set({ loading: true });

    try {
      const res = await axios.get('/cart');
      set({ cart: res.data });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      toast.error(error.response.data.message || 'Something went wrong');
    } finally {
      set({ loading: false });
    }
  },

  addToCart: async (product) => {
    try {
      await axios.post('/cart', { productId: product.id });
      toast.success('product added to cart');

      set((prevState) => {
        const existingItem = prevState.cart.find((item) => item.id === product.id);

        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [...prevState.cart, { quantity: 1, ...product }];

        return { cart: newCart };
      });

      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message || 'Something went wrong');
    }
  },

  calculateTotals: async () => {
    const { cart } = get();
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    total = total.toFixed(2);

    set({ total });
  },

  removeFromCart: async (productId) => {
    try {
      if (productId && !confirm('Are you sure you want to delete the product?')) return;

      await axios.delete('/cart', { data: { productId } });

      set((prevState) => ({
        cart: productId ? prevState.cart.filter((item) => item.id !== productId) : [],
      }));

      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      if (quantity === 0) {
        get().removeFromCart(productId);
        return;
      }

      await axios.put(`/cart/${productId}`, { quantity });

      set((prevState) => ({
        cart: prevState.cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        ),
      }));

      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  clearCart: () => {
    set({ cart: [], total: 0 });
  },
}));
