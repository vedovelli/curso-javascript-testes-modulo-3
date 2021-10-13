/* istanbul ignore file */
import '../styles/globals.css';

if (
  !process.env.NEXT_PUBLIC_USE_API &&
  process.env.NODE_ENV === 'development'
) {
  require('../miragejs/server').makeServer();
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
