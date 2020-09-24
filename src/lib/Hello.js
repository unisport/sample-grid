import React, {useContext} from 'react'

const Hello = () => {
  let context = useContext("LocaleContext");
  console.log(context);

  return (<div>Hello</div>);
};

export default Hello;