import React from 'react';
import ProductPreview from './ProductPreview';
import products from '../data/products';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="products-selector">
          {products.map(productData => <ProductPreview key={productData.id} {...productData} />)}
        </div>
      </div>
    );
  }
}