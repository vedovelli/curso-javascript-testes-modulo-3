import create from 'zustand';

const initialState = {
  open: false,
  products: [],
};

const addProduct = (store, product) => {
  if (store.state.products.includes(product)) {
    return store.state.products;
  }
  return [...store.state.products, product];
};

export const useCartStore = create((set) => ({
  state: {
    ...initialState,
  },
  actions: {
    toggle: () =>
      set((store) => ({
        state: { ...store.state, open: !store.state.open },
      })),
    reset: () => set((store) => ({ state: { ...initialState } })),
    add: (product) =>
      set((store) => {
        return {
          state: { open: true, products: addProduct(store, product) },
        };
      }),
  },
}));
