/**
 * ProductList
 *
 * @param props object
 */
import React, { useContext } from "react";
import Product from "./Product";

// ProductList Component
const ProductList = (props) => {
  let products = props.products.sort((a, b) => a.price - b.price);

  let productGrid = products.map((product, indx) => (
    <Product
      key={indx}
      id={product.id}
      price={product.price}
      image={product.product_main_image}
      name={product.name}
      currency={product.currency}
      availability={product.stock}
      delivery={product.delivery}
    />
  ));

  return <div className="product_list">{productGrid}</div>;
};

export default ProductList;
