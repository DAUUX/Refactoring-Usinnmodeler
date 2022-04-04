import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
const Routers = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cadastro" exact component={Register} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
};
export default Routers;
