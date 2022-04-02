import React from "react";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";

// TODO: add theme color palette and font here
const theme = extendTheme();

export const ChakraUIThemeProvider: React.FC = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
