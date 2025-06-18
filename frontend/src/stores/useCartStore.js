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
}));
