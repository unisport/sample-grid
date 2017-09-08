'use strict';

import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from './NotFoundPage';
import products from '../data/products';

export default class ProductPage extends React.Component {
  render() {
    const id = this.props.params.id;
    const product = products.filter((product) => product.id === id)[0];


    if (!product) {
      return <NotFoundPage/>;
    }
    const headerStyle = { backgroundImage: `url(/img/logo.png)` };
    return (
      <div className="product-full">
        <div className="product">
          <header style={headerStyle}/>
          <div className="picture-container">
            <img src={product.image}/>
            <h2 className="name">{product.name}</h2>
          </div>
          <section className="description">
            <strong></strong>
            Kids:{product.kid_adult}<br/>
            Delivery:{product.delivery}<br/>
            Sizes:{product.sizes}<br/>
            Old price:{product.price_old}<br/>
            New price:{product.price} kr<br/>

          </section>

        </div>
        <div className="navigateBack">
          <Link to="/">« Gå tilbage</Link>
        </div>
      </div>
    );
  }
}
