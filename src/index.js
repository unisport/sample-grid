import React from "react";
import { render } from "react-dom";

import App from "./app";
import UserContext from "./context/User";

// Mount elements
const rootElm = document.getElementById("root-element");

// Create a user object
const User = {
  locale: navigator.language || "en-GB",
};

// Render the app
render(
  <UserContext.Provider value={User}>
    <App />
  </UserContext.Provider>,
  rootElm
);
