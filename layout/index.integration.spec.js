import { setAutoFreeze } from 'immer';
import { render, screen } from '@testing-library/react';
import { renderHook, act as hooksAct } from '@testing-library/react-hooks';
import { act as componentsAct } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { useCartStore } from '../store/cart';
import { makeServer } from '../miragejs/server';
import http from '../http';
import Layout from './';

jest.mock('../http');

setAutoFreeze(false);

describe('Layout', () => {
  const server = makeServer({ environment: 'test' });
  const products = server.createList('product', 2);
  server.shutdown();

  let result;
  beforeAll(() => {
    result = renderHook(() => useCartStore()).result;

    jest
      .spyOn(result.current.actions, 'removeAll')
      .mockImplementation(() => true);
  });

  beforeEach(async () => {
    await hooksAct(async () => {
      for (const product of products) {
        result.current.actions.add(product);
      }
    });
  });

  it('should NOT call store.actions.removeAll() OR axios.post() when email is empty', async () => {
    render(<Layout />);

    const checkoutButton = screen.getByTestId('checkout-button');

    await userEvent.click(checkoutButton);

    expect(result.current.actions.removeAll).not.toHaveBeenCalled();
    expect(http.post).not.toHaveBeenCalled();
  });

  it('should call store.actions.removeAll() axios.post() with proper data on form submit', async () => {
    render(<Layout />);

    const emailInput = screen.getByTestId('input-email');
    const checkoutButton = screen.getByTestId('checkout-button');
    const email = 'vedovelli@gmail.com';

    await userEvent.type(emailInput, email);
    await userEvent.click(checkoutButton);

    expect(result.current.actions.removeAll).toHaveBeenCalledTimes(1);

    expect(http.post).toHaveBeenCalledTimes(1);
    expect(http.post).toHaveBeenCalledWith(
      '/api/order',
      { products },
      { headers: { email } },
    );
  });

  it('should display error message when axios.post() fails', async () => {
    http.post.mockRejectedValue('boo');

    render(<Layout />);

    const emailInput = screen.getByTestId('input-email');
    const checkoutButton = screen.getByTestId('checkout-button');
    const email = 'vedovelli@gmail.com';

    await componentsAct(async () => {
      await userEvent.type(emailInput, email);
      await userEvent.click(checkoutButton);
    });

    expect(screen.getByText(/fail to save order/i)).toBeInTheDocument();
  });

  it('should call toggle() on toggle button click', async () => {
    jest.spyOn(result.current.actions, 'toggle');

    render(<Layout />);

    await hooksAct(async () => {
      await userEvent.click(screen.getByTestId('toggle-button'));
      expect(result.current.actions.toggle).toHaveBeenCalledTimes(1);
    });
  });
});
