import React, {useState, createContext, useContext, Suspense, lazy} from "react";
import {render} from "react-dom";
const Hello = lazy(() => import("./lib/Hello"));
// Create locale as context
const LocaleContext = createContext('locale');

function Example() {
  let context = useContext(LocaleContext);
  const [count, setCount] = useState(0);

  return (
    <div>Hello Pussy</div>
  );
}

const rootElm = document.getElementById("root-element");
let locale = navigator.language || "en-GB";

render(
  <LocaleContext.Provider value={{locale}}>
    <Suspense fallback={<div>Loading...</div>}>
      <Hello />
    </Suspense>
  </LocaleContext.Provider>
  ,
  rootElm
);
