/**
 */
import React from "react";
import { createPortal } from "react-dom";

const Header = (props) => {
  return createPortal(props.children, document.createElement("div"));
};

export default Header;
