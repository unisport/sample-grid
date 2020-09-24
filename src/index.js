import React, {useState} from "react";
import {render} from "react-dom";

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>Hello Pussy</div>
  );
}

const rootElm = document.getElementById("root-element");

render(
  <Example/>,
  rootElm);
