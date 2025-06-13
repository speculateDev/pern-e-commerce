import { create } from 'zustand';
import { axios } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  loading: false,
  authUser: null,

  signup: async (data) => {
    set({ loading: true });
    try {
      if (!data.email || !data.password || !data.confirmPassword || !data.username)
        return toast.error('All fields are required');

      if (data.confirmPassword !== data.password) return toast.error('Passwords must match');

      const res = await axios.post('/auth/signup', data);
      set({ authUser: res.data.user });

      toast.success('Successfully created an account');
    } catch (error) {
      toast.error(error.response.data.message || 'Something went wrong');
    } finally {
      set({ loading: false });
    }
  },
}));
