import React from "react";
import ReactDOM from "react-dom";
import ProductSearch from "./components/search";
import "./index.css";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <h1>UNI SPORT</h1>
        <ProductSearch />
      </div>
    </React.Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
