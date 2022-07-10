import React from "react";
import {Footer, Header} from "components";


export const BlankLayout: React.FC = ({children}) => {
    return (
        <>
        <main>{children}</main>
        </>
    );
};
