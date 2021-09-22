import React from "react";
import "./App.css";
import Grid from "@mui/material/Grid";
import data from "./data.json";

//Sorts the json data into least "percentage_discount"ed first
const sortedData = data.products.sort((a, b) => {
  return parseInt(a.discount_percentage) - parseInt(b.discount_percentage);
});

class List extends React.Component {
  constructor(props) {
    //builds functions
    super(props);
    this.state = { data: sortedData };
    this.addRRP();
  }

  //Loops through the data.json and looks for "discount_percentage" that has more than 0. If it does then add "recomended_retail_price" to state (is used on line 60)
  addRRP() {
    let RRP = "";
    for (let i = 0; this.state.data.length > i; i++) {
      if (this.state.data[i].discount_percentage > 0) {
        RRP = this.state.data[i].prices.recommended_retail_price + " " + "DKK";
      } else {
        RRP = "";
      }

      this.state.data[i].prices.rrp = RRP;
      this.setState({ data: this.state.data });
    }
  }

  render() {
    return this.state.data.map((products) => (
      <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
        <div className="product-square">
          <div className="picture">
            {
              //if product has a discount display discount
              products.discount_percentage > 0 && (
                <div className="percent">-{products.discount_percentage}%</div>
              )
            }
            {/* gets image from json*/}
            <a href={products.url}>
              <img className="img-fluid" src={products.image} />
            </a>
          </div>

          <br />
          <div className="title-div">
            <a className="product-name" href={products.url}>
              <p className="desc">{products.name}</p>
            </a>
          </div>
          <Grid container>
            <Grid className="price" item xs={12}>
              <p className="price-text">
                {products.prices.min_price} {products.prices.currency}
                <br />
                <sub className="rrp-text">{products.prices.rrp}</sub>
              </p>
            </Grid>
            <Grid className="sizes" item xs={12}>
              <select className="size-list">
                {/* Maps the "name-short" from the array "stock" in the json and puts it in a dropdown select menu*/}
                {products.stock.map(function (object) {
                  return (
                    <option className="sizes-label">{object.name_short}</option>
                  );
                })}
              </select>
            </Grid>
          </Grid>
        </div>
      </Grid>
    ));
  }
}
export default List;
