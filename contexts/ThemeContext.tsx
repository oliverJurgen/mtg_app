import React from "react";
import createContext from "../utils/createContext";
import theme from "../theme/theme";
import { getTheme } from "../theme/theme";

const [useContext, ContextProvider] = createContext<any>();

type Props = {};

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [colorTheme, setColorTheme] = React.useState("light");

  const currTheme = getTheme(`${colorTheme}`);
  const toggleTheme = () => {
    if (colorTheme === "dark") {
      setColorTheme("light");
      return;
    }
    setColorTheme("dark");
  };

  return (
    <ContextProvider value={[currTheme, toggleTheme]}>{children}</ContextProvider>
  );
};

export default ThemeProvider;
export const useTheme = () => useContext();
