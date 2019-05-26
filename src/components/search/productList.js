import React from "react";

class ItemList extends React.Component {
  renderItems = () => {
    const { items } = this.props;
    return items.map(item => {
      const url = item.image;
      const name = item.name;
      const price = item.price;
      const discount = item.discount_percentage;
      const delivery = item.delivery;
      return (
        <li key={item.id}>
          <img src={url} alt="item!" />
          <p>{name}</p>
          <p>Price: {price}DK</p>
          <p>Discount: -{discount}%</p>
          <p>Delivery: {delivery}</p>
        </li>
      );
    });
  };

  render() {
    return <ul className="list">{this.renderItems()}</ul>;
  }
}

export default ItemList;
