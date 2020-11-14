import { renderHook, act } from '@testing-library/react-hooks';
import { useCartStore } from './';
import { makeServer } from '../../miragejs/server';

describe('useCartStore', () => {
  let result;
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    result = renderHook(() => useCartStore()).result;
  });

  afterEach(() => {
    server.shutdown();

    act(() => {
      result.current.actions.reset();
    });
  });

  it('should return state.open equals false', () => {
    expect(result.current.state.open).toBe(false);
  });

  it('should toggle state.open', () => {
    expect(result.current.state.open).toBe(false);

    act(() => {
      result.current.actions.toggle();
    });
    expect(result.current.state.open).toBe(true);

    act(() => {
      result.current.actions.toggle();
    });
    expect(result.current.state.open).toBe(false);
  });

  it('should add products and open the cart', () => {
    const products = server.createList('product', 2);

    expect(result.current.state.open).toBe(false);
    expect(result.current.state.products).toHaveLength(0);

    act(() => {
      for (const product of products) {
        result.current.actions.add(product);
      }
    });

    expect(result.current.state.open).toBe(true);
    expect(result.current.state.products).toHaveLength(products.length);
  });

  it('should NOT add same product twice', () => {
    const product = server.create('product');

    expect(result.current.state.products).toHaveLength(0);

    act(() => {
      result.current.actions.add(product);
      result.current.actions.add(product);
    });

    expect(result.current.state.products).toHaveLength(1);
  });

  it('should remove products', () => {
    const [product1, product2] = server.createList('product', 2);

    expect(result.current.state.products).toHaveLength(0);

    act(() => {
      result.current.actions.add(product1);
      result.current.actions.add(product2);
    });

    expect(result.current.state.products).toHaveLength(2);

    act(() => {
      result.current.actions.remove(product1);
    });

    expect(result.current.state.products).toHaveLength(1);
    expect(result.current.state.products[0]).toEqual(product2);
  });

  it('should keep product if provided product is not found', () => {
    const [product1, product2, product3] = server.createList('product', 3);

    expect(result.current.state.products).toHaveLength(0);

    act(() => {
      result.current.actions.add(product1);
      result.current.actions.add(product2);
    });

    expect(result.current.state.products).toHaveLength(2);

    act(() => {
      result.current.actions.remove(product3);
    });

    expect(result.current.state.products).toHaveLength(2);
  });

  it('should remove all products', () => {
    const [product1, product2] = server.createList('product', 2);

    act(() => {
      result.current.actions.add(product1);
      result.current.actions.add(product2);
      result.current.actions.removeAll();
    });

    expect(result.current.state.products).toHaveLength(0);
  });
});
