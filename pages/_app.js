import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import customTheme from "../theme";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
