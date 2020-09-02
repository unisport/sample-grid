import React from "react";
import { formatCurrency } from "../util";

function Tile(props) {
  const data = props.data;
  if (!data) {
    return <div />;
  }

  return (
    <div className="tile-container">
      <img src={data.image} />
      <div className="tile-info-container">
        <span className="name">{data.name}</span>
        {data.prices ? (
          <div>
            <span className="price">
              {formatCurrency(
                data.prices.recommended_retail_price,
                "da-DK",
                "DKK"
              )}
            </span>
            {data.discount_percentage ? (
              <span className="discount-percentage">
                -{data.discount_percentage}%
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Tile;
