import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Make a GET request to the WooCommerce product endpoint
        const response = await axios.get(
          `https://webcodes.ee/test/wp-json/wp/v2/products`
        );
        console.log(response.data);
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
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="productPage">
      <h2>Recent Products</h2>
      <ul className="products">
        {products.map((product) => (
          <li className="product" key={product.id}>
            <h3>{product.title.rendered}</h3>
            {product.acf && product.acf.image && (
              <img src={product.acf.image.url} alt={product.title.rendered} />
            )}
            <p
              dangerouslySetInnerHTML={{
                __html: product.content.rendered,
              }}></p>
            <span
              dangerouslySetInnerHTML={{
                __html: product.short_description,
              }}></span>

            {/* Add more product details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetProducts;
