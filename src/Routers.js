import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Modeler from "./pages/modeler/Modeler";
import ShareRoute from "./components/ShareRoute";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/dashboard/Dashboard";
const Routers = () => {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE_ROUTE}>
      <Switch>
        <PrivateRoute path="/modeler/:id?/:slug?" component={Modeler} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <ShareRoute path="/shared/:token" component={ShareRoute} />
        <Route path="/" exact component={Home} />
        <Route path="/cadastro" exact component={Register} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
};
export default Routers;
