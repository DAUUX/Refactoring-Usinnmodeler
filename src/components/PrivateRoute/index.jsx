import { Redirect, Route, useLocation } from "react-router-dom";

const PrivateRoute = (props) => {
    const location = useLocation();
    const authLogin = !!localStorage.getItem('token');

    /**
     * TODO checar se o token é válido na API
     */
  
    return authLogin ? (
        <Route {...props} />
    ) : (
        <Redirect
            to={{
                pathname: "/login",
                state: { from: location }
            }}
        />
    );
};

export default PrivateRoute;