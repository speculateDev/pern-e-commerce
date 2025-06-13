import { create } from 'zustand';
import { axios } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useProductStore = create((set, get) => ({
  // Products state
  allProducts: [],
  products: [],
  loading: false,
  error: null,
  category: null,
  currentProduct: null,

  fetchProducts: async () => {
    set({ loading: true });

    try {
      const res = await axios.get('/products');
      set({ products: res.data.data, error: null, allProducts: res.data.data });
    } catch (error) {
      if (error.status === 429) set({ error: 'Rate limit exceeded' });
      else set({ error: 'Something went wrong' });
      console.error('Error in fetchProducts: ', error);
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ loading: true });

    try {
      const res = await axios.get(`/products/${id}`);
      set({ currentProduct: res.data.data });
    } catch (error) {
      console.error('Error in fetchProduct: ', error);
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
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

  addProduct: async (data) => {
    set({ loading: true });

    try {
      if (!data.image || !data.name || !data.price || !data.category)
        return toast.error('All fields are required');
      await axios.post(`products`, data);
      toast.success('Product successfully created');
      document.getElementById('add_product_modal').close();
      await get().fetchProducts();
    } catch (error) {
      console.error('Error in addProduct-store: ', error);
      toast.error('Something went wrong');
    } finally {
      set({ loading: false });
      document.getElementById('add_product_modal').close();
    }
  },

  filter: (category) => {
    set({ loading: true });
    const currentState = get();

    if (category === currentState.category) {
      set({ category: null, products: get().allProducts, loading: false });
      return;
    }

    set({
      category: category,
      products: currentState.allProducts.filter((prod) => prod.category === category),
    });

    set({ loading: false });
  },
}));
