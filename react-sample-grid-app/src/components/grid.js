import React from "react";
import Tile from "./tile";
function Grid(props) {
  return (
    <div className="grid-container">
      {props.data
        ? props.data.map((el, index) => <Tile data={el} />)
        : "Loading..."}
    </div>
  );
}

export default Grid;
