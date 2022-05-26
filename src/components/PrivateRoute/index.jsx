import { Redirect, Route, useLocation } from "react-router-dom";

const PrivateRoute = (props) => {
    const location = useLocation();
    const authLogin = !!localStorage.getItem('token');
  
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