// import '../styles/globals.css'
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import ThemeProvider from "../contexts/ThemeContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ThemeProvider theme={{}}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ChakraProvider>
  );
}
export default MyApp;
