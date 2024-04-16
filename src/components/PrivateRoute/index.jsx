import { Redirect, Route, useLocation } from "react-router-dom";

const PrivateRoute = (props) => {
    const location = useLocation();
    const authToken = !!localStorage.getItem('token');
    const authUser = !!localStorage.getItem('user');
  
    return authToken && authUser ? (
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