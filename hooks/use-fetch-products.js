import { useState, useEffect } from 'react';
import http from '../http';

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    http
      .get('/api/products')
      .then((res) => {
        if (mounted) {
          setProducts(res.data.products);
        }
      })
      .catch((error) => {
        if (mounted) {
          setError(true);
        }
      });

    return () => (mounted = false);
  }, []);

  return { products, error };
};
