import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Modeler from "./pages/modeler/Modeler";
import ShareRoute from "./components/ShareRoute";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivacyTerms from "./pages/privacyTerms/PrivacyTerms";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";
import AlterPassword from "./pages/alter_password/AlterPassword";
import RequestChange from "./pages/alter_password/RequestChange";
import { SocketProvider } from "./services/SocketContext"

const Routers = () => {
  return (
    // forceRefresh para tentar corrigir problema onde o salvamento e atalhos do modeler não funcionam
    <BrowserRouter basename={process.env.REACT_APP_BASE_ROUTE}>
      <Routes>
        <Route path="/modeler/:id?/:slug?" element={<SocketProvider><PrivateRoute element={<Modeler />} /></SocketProvider>} />
        <Route path="/dashboard/*" element={<SocketProvider><PrivateRoute element={<Dashboard />} /></SocketProvider>} />
        <Route path="/shared/:token" element={<SocketProvider><ShareRoute /></SocketProvider>} />
        <Route path="/" exact element={<Home />} />
        <Route path="/cadastro" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/privacidade" element={<PrivacyTerms />} />
        <Route path="/redefinir-senha/:token" exact element={<AlterPassword />} />
        <Route path="/request-change" exact element={<RequestChange />} />
        <Route path="*" element={<Home />} />
        <Route path="/atualizar" element={<UpdateProfile />}/>
      </Routes>
    </BrowserRouter>
  );
};
export default Routers;
