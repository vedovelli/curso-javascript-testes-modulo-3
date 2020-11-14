import create from 'zustand';
import produce, { original } from 'immer';

export const useCartStore = create(set => {
  const setState = fn => set(produce(fn));

  const initialState = {
    open: false,
    products: [],
  };

  return {
    state: {
      ...initialState,
    },
    actions: {
      toggle: () =>
        setState(({ state }) => {
          state.open = !state.open;
        }),
      add: product =>
        setState(({ state }) => {
          if (!original(state.products).includes(product)) {
            state.products.push(product);
          }
          state.open = true;
        }),
      remove: product =>
        setState(({ state }) => {
          const index = original(state.products).indexOf(product);
          if (index > -1) {
            state.products.splice(index, 1);
          }
        }),
      removeAll: () =>
        setState(({ state }) => {
          state.products = [];
        }),
      reset: () => set({ state: { ...initialState } }),
    },
  };
});
