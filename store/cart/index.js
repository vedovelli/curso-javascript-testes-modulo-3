import create from 'zustand';

export const useCartStore = create((set) => ({
  state: {
    open: false,
    products: [],
  },
  actions: {
    toggle: () => set((store) => ({ state: { open: !store.state.open } })),
    add: (product) =>
      set((store) => ({
        state: { ...store.state, products: [...store.state.products, product] },
      })),
  },
}));
