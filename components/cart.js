import CartItem from './cart-item';
import { useCartStore } from '../store/cart';

export default function Cart() {
  const { open, products } = useCartStore((store) => store.state);
  const { toggle, removeAll } = useCartStore((store) => store.actions);

  const hasProducts = products.length > 0;

  return (
    <div
      data-testid="cart"
      className={`${
        !open ? 'hidden' : ''
      }  fixed right-0 z-10 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium text-gray-700">Your cart</h3>
        {hasProducts ? (
          <button
            onClick={() => {
              removeAll();
            }}
          >
            Clear cart
          </button>
        ) : null}
        <button
          data-testid="close-button"
          onClick={() => toggle()}
          className="text-gray-600 focus:outline-none"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <hr className="my-3" />
      {!hasProducts ? (
        <h3 className="text-center font-bold text-blue-600">
          There are no items in the cart
        </h3>
      ) : null}
      {products.map((product) => (
        <CartItem product={product} key={product.id} />
      ))}
      {hasProducts ? (
        <a className="flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
          <span>Checkout</span>
          <svg
            className="h-5 w-5 mx-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </a>
      ) : null}
    </div>
  );
}
