'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class ProductPreview extends React.Component {
  render() {
    return (
     
      <Link to={`/product/${this.props.id}`}>
      <div className="product-preview">
          <img src={this.props.image}/>
          <h2 className="name">{this.props.name}</h2>
          <span className="medals-count"> {this.props.price} kr</span>
        </div>
      </Link>
      

    );
  }
}

