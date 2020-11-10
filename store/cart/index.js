import create from 'zustand';

export const useCartStore = create((set) => ({
  state: {
    open: false,
  },
  actions: {
    toggle: () => set((store) => ({ state: { open: !store.state.open } })),
  },
}));
