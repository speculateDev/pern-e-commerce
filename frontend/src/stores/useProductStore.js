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

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      if (!confirm('Are you sure you want to delete?')) return;
      await axios.delete(`/products/${id}`);
      set((prevState) => ({
        products: prevState.products.filter((product) => product.id !== id),
      }));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.log('Error in deleteProduct: ', error);
      toast.error('Something went wrong');
    } finally {
      set({ loading: false });
    }
  },
}));
