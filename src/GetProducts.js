import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetProducts = () => {
    const [loading, setLoading] = useState(true);
  const [products, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Make a GET request to the WooCommerce product endpoint
        const response = await axios.get(`https://webcodes.ee/test/wp-json/wc/v3/products/`, {
          params: {
            consumer_key: 'ck_5dac46908b30df591e0f5d62185400c67972b883',
            consumer_secret: 'cs_f8a2cb6191aeffcffb876e792b35c4a7ceeaaaca',
          }
        });
        // Set the retrieved product in the state
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className='loading-container'>
        <div className='loading'>Loading...</div>
      </div>
    )
  }

  return (
    <div className='productPage'>
    <h2>Recent Products</h2>
    <ul className='products'>
      {products.map(product => (
        <li className="product" key={product.id}>
          <h3>{product.name}</h3>
          <p dangerouslySetInnerHTML={{__html: product.description}}></p>
          <img src={product.images[0].src} alt={product.name} />
          <span dangerouslySetInnerHTML={{__html: product.short_description}}></span>
          <p className='regularPrice'>Regular price: {product.regular_price}</p>
          <p>Price: {product.price}</p>
          {/* Add more product details as needed */}
        </li>
      ))}
    </ul>
  </div>
  );
};

export default GetProducts;
