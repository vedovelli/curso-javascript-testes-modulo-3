import create from 'zustand';

const initialState = {
  open: false,
  products: [],
};

export const useCartStore = create((set) => ({
  state: {
    ...initialState,
  },
  actions: {
    toggle: () => set((store) => ({ state: { open: !store.state.open } })),
    reset: () => set((store) => ({ state: { ...initialState } })),
    add: (product) =>
      set((store) => ({
        state: { open: true, products: [...store.state.products, product] },
      })),
  },
}));
