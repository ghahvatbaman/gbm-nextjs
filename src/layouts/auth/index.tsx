import React, {FC} from "react";
import {Header} from "components";

export const AuthLayout: FC = ({children}) => {
    return (
        <>
            <Header/>
            <main>{children} </main>
        </>
    )
};
