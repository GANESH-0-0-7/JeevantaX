import axios from "axios";
import { create } from "zustand";

axios.defaults.withCredentials = true;

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const useAuthStore = create((set) => ({
  loading: false,
  err: null,
  user: null,
  backendConnected: true,

  signup: async (data) => {
    try {
      set({ loading: true, err: null });

      const res = await axios.post(
        `${API}/api/auth/signup`,
        data,
        { withCredentials: true }
      );

      set({
        user: res.data.user,
        backendConnected: true,
      });
    } catch (error) {
      set({
        err: error.response?.data?.message || "Signup failed",
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  login: async (data) => {
    try {
      set({ loading: true, err: null });

      const res = await axios.post(
        `${API}/api/auth/login`,
        data,
        { withCredentials: true }
      );

      set({
        user: res.data.user,
        backendConnected: true,
      });
    } catch (error) {
      set({
        err: error.response?.data?.message || "Login failed",
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    try {
      set({ loading: true, err: null });

      const res = await axios.get(
        `${API}/api/auth/checkAuth`,
        { withCredentials: true }
      );

      set({
        user: res.data.user,
        backendConnected: true,
      });
    } catch (error) {
      set({
        user: null,
        backendConnected: true,
        err: error.response?.data?.message || null,
      });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axios.post(
        `${API}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error);
    } finally {
      set({
        user: null,
        loading: false,
      });
    }
  },
}));