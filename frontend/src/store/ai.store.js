import axios from "axios";
import { create } from "zustand";

axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

export const useAiStore = create((set) => ({
  loading: false,
  err: null,
  response: null,
  therapistResponse: null,

  fetchSymptom: async (prompt) => {
    try {
      set({ loading: true, err: null });

      const res = await axios.post(
        `${API_URL}/api/ai/symptom`,
        { prompt },
        {
          withCredentials: true,
        }
      );

      set({ response: res.data.response });
    } catch (error) {
      set({
        err: error.response?.data?.message || "Request failed",
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  clearResponse: () =>
    set({
      response: null,
      err: null,
    }),
}));