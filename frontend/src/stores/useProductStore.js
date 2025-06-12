import { create } from 'zustand';
import { axios } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useProductStore = create((set, get) => ({
  // Products state
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });

    try {
      const res = await axios.get('/products');
      set({ products: res.data.data, error: null });
    } catch (error) {
      if (error.status === 429) set({ error: 'Rate limit exceeded' });
      else set({ error: 'Something went wrong' });
      console.error('Error in fetchProducts: ', error);
    } finally {
      set({ loading: false });
    }
  },
}));
