import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";

const baseURL =
  "https://www.unisport.dk/api/products/batch/?list=200776,223466,222649,217763,217769,213591,225707,222189,217706,213590,200777,223214,223002,223226,213576,225811,226350,217758,226546,217740,222822,198079,225701,217710,222824,226542,222411,222191,225705,226547,222192,217793,206016,225964,223191,190711,222316,217810,226102,222314";

export default function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data.products);
    });
  }, []);

  if (!post) return null;

  post.sort(function (a, b) {
    return a.prices.discount_percentage - b.prices.discount_percentage;
  });

  return (
    <div className="productList">
      {post.map((products) => (
        <div className="singleProduct">
          <img
            className="productImg"
            src={products.product_main_image}
            alt=""
          />
          <div className="details">
            <h4>{products.name}</h4>
            <p>
              Minimal price:
              {products.prices.min_price}
              {products.prices.currency}
            </p>
            <p>
              Discount:
              {products.prices.discount_percentage}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
