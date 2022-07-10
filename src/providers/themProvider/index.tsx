import React from "react";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";

// TODO: add themeProvider color palette and font here
const themeProvider = extendTheme({
  fonts: {
    heading: `Dana, sans-serif`,
    body: `Dana, sans-serif`,
  },
});

export const ChakraUIThemeProvider: React.FC = ({ children }) => {
  return (
    <ChakraProvider theme={themeProvider}>
      <Global
        styles={`
            @font-face {
                font-family: 'Dana';
                font-style: normal;
                src: url('/fonts/Dana-Regular.ttf') format('ttf');
            }
      `}
      />
      {children}
    </ChakraProvider>
  );
};
