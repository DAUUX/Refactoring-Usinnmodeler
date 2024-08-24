import React, {createElement} from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Modeler from "./pages/modeler/Modeler";
import ShareRoute from "./components/ShareRoute";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivacyTerms from "./pages/privacyTerms/PrivacyTerms";
import UserProfile from "./components/UserProfile";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";
import AlterPassword from "./pages/alter_password/AlterPassword";
import RequestChange from "./pages/alter_password/RequestChange";
import ModeleReactFlow from "./pages/modeler/ModelerReactFlow";
import { ModelerProvider } from "./context/modelerContext";

const Routers = () => {
  return (
    // forceRefresh para tentar corrigir problema onde o salvamento e atalhos do modeler não funcionam
    <BrowserRouter basename={process.env.REACT_APP_BASE_ROUTE}>
      <Switch>
        <PrivateRoute path="/modeler/:id?/:slug?" component={Modeler} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <ShareRoute path="/shared/:token" component={ShareRoute} />
        <Route 
          path="/" 
          exact 
          render={(props) => (
            <ModelerProvider><ModeleReactFlow {...props}/></ModelerProvider>
          )}/>
        <Route path="/cadastro" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/privacidade" component={PrivacyTerms} />
        <Route path="/redefinir-senha/:token" exact component={AlterPassword} />
        <Route path="/request-change" exact component={RequestChange} />
        <Route path="*" component={Home} />
        <Route path="/atualizar" component={UpdateProfile}/>
      </Switch>
    </BrowserRouter>
  );
};
export default Routers;
