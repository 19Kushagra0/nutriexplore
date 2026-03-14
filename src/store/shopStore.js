import { create } from "zustand";

export const useShopStore = create((set) => ({
  products: [],
  page: 1,

  activeSort: "",
  activeCategory: "",

  setFilters: (activeSort, activeCategory) => {
    set({
      activeSort,
      activeCategory,
    });
  },

  addProducts: (newProducts) =>
    set((state) => {
      const existingCodes = new Set(state.products.map((p) => p.code));
      const uniqueNewProducts = newProducts.filter(
        (p) => !existingCodes.has(p.code),
      );
      return {
        products: [...state.products, ...uniqueNewProducts],
      };
    }),

  setPage: (page) => set({ page }),
}));
