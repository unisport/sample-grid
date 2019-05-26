import React from "react";
import { getItems } from "./getProducts";
import ItemList from "./productList";

console.clear();

class ProductSearch extends React.Component {
  state = {
    data: undefined,
    requestState: "loading"
  };

  componentDidMount() {
    getItems()
      .then(response => {
        const newData = response.products;
        this.setState({ data: newData, requestState: "done" });
      })
      .catch(err => {
        console.log(err);
        this.setState({ requestState: "error" });
      });
  }

  render() {
    const { requestState, data } = this.state;
    if (requestState === "loading") {
      return <h3>Loading ...</h3>;
    } else if (requestState === "error") {
      return <h3>There was an error!</h3>;
    } else {
      return (
        <React.Fragment>
          <ItemList items={data} />
        </React.Fragment>
      );
    }
  }
}

export default ProductSearch;
