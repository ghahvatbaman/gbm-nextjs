import React from "react";
import {extendTheme, ChakraProvider} from "@chakra-ui/react";

// TODO: add themeProvider color palette and font here
const themeProvider = extendTheme();

export const ChakraUIThemeProvider: React.FC = ({children}) => {
    return (
        <ChakraProvider theme={themeProvider}>
            {children}
        </ChakraProvider>
    );
};
