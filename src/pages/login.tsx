import {ReactElement} from "react";
import {AuthLayout} from "../layouts";
import {LoginContainer} from "modules/login";

const Login = () => {
    return (
        <LoginContainer/>
    )
}
Login.getLayout = function getLayout(page: ReactElement) {
    return <AuthLayout>{page}</AuthLayout>;
};

export default Login;
