import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import ThemeProvider from "../contexts/ThemeContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </ChakraProvider>
  );
}
export default MyApp;
