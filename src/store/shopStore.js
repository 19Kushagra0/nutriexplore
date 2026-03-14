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

  // Search State
  searchQuery: "",
  searchResults: [],
  searchPage: 1,
  searchHasMore: false,
  searchLoading: false,

  setSearchQuery: (query) => set({ searchQuery: query }),
  resetSearch: () =>
    set({ searchResults: [], searchPage: 1, searchHasMore: false }),
  setSearchPage: (page) => set({ searchPage: page }),
  setSearchHasMore: (hasMore) => set({ searchHasMore: hasMore }),
  setSearchLoading: (loading) => set({ searchLoading: loading }),
  addSearchResults: (newResults) =>
    set((state) => {
      const existingCodes = new Set(state.searchResults.map((p) => p.code));
      const uniqueNewProducts = newResults.filter(
        (p) => !existingCodes.has(p.code)
      );
      return {
        searchResults: [...state.searchResults, ...uniqueNewProducts],
      };
    }),
}));
