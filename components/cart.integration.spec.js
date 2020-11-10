import { renderHook, act } from '@testing-library/react-hooks';
import { screen, render } from '@testing-library/react';
import { useCartStore } from '../store/cart';
import { makeServer } from '../miragejs/server';
import userEvent from '@testing-library/user-event';
import Cart from './cart';

describe('Cart', () => {
  let server;
  let result;
  let spy;
  let add;
  let toggle;
  let reset;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    result = renderHook(() => useCartStore()).result;
    add = result.current.actions.add;
    reset = result.current.actions.reset;
    toggle = result.current.actions.toggle;
    spy = jest.spyOn(result.current.actions, 'toggle');
  });

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  it('should add css class "hidden" in the component', () => {
    render(<Cart />);

    expect(screen.getByTestId('cart')).toHaveClass('hidden');
  });

  it('should add css class "hidden" in the component', () => {
    act(() => {
      toggle();
    });

    render(<Cart />);

    expect(screen.getByTestId('cart')).not.toHaveClass('hidden');
  });

  it('should call store toggle() twice', () => {
    render(<Cart />);

    const button = screen.getByTestId('close-button');

    act(() => {
      userEvent.click(button);
      userEvent.click(button);
    });

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should display 2 products cards', () => {
    const products = server.createList('product', 2);

    act(() => {
      for (const product of products) {
        add(product);
      }
    });

    render(<Cart />);

    expect(screen.getAllByTestId('cart-item')).toHaveLength(2);
  });
});
