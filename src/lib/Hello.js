import React, { useContext } from "react";
import UserContext from "../context/User";

const Hello = () => {
  let context = useContext(UserContext);
  console.log(context);

  return <div>Hello</div>;
};

export default Hello;
