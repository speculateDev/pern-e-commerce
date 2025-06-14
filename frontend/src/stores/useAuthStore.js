import { create } from 'zustand';
import { axios } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  loading: false,
  authUser: null,
  isAdmin: null,
  checkingAuth: true,

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

  login: async (data) => {
    try {
      set({ loading: true });

      if (!data.email || !data.password) return toast.error('All fields are required');

      const res = await axios.post('/auth/login', data);
      set({ authUser: res.data.user, isAdmin: res.data.user.role === 'admin' });

      toast.success('Successfully logged in');
    } catch (error) {
      // console.log(error);
      toast.error(error.response?.data?.message || 'Wrong credentials');
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      const res = await axios.post('/auth/logout');

      if (res.status === 200) set({ authUser: null, isAdmin: false });
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.response.data.message || 'Something went wrong');
    }
  },

  checkAuth: async () => {
    try {
      set({ checkingAuth: true });
      const res = await axios.get('/auth/me');

      set({ authUser: res.data.user, isAdmin: res.data.user.role === 'admin' });
    } catch (error) {
      // toast.error(error.response.data.message || 'Something went wrong');
      set({ authUser: null });
    } finally {
      set({ checkingAuth: false });
    }
  },
}));
