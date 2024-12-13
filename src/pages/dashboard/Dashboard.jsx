import "./style.scss"
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardMenu from "../../components/DashboardMenu";
import Documents from "./documents/Documents";
import Spinner from "../../components/Spinner";
import UpdateProfile from "../updateProfile/UpdateProfile";
import ChangePassword from "../change_password/ChangePassword";
import Inicio from "./inicio/Inicio";
import Notification from "./notification"
import NotificationDiagram from "./notification/NotificationDiagram.jsx"

function Dashboard() {

    const [menuOpen, setMenuOpen]             = useState(false);
    const [loadingOverlay, setLoadingOverlay] = useState(false);

    return (
        <main id="dashboard" className={`flex-fill d-flex ${menuOpen ? 'menu-open' : ''}`}>
            
            <DashboardMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} onCreateDiagram={(value) => setLoadingOverlay(value) } />
            
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path={`documentos/*`} element={<Documents/>} />
                <Route path={`notification`} element={<Notification/>} />
                <Route path={`notification/:id`} element={<NotificationDiagram />}/>
                <Route path={`atualizarperfil`} element={<UpdateProfile/>} />
                <Route path={`atualizarsenha`} element={<ChangePassword/>} />
            </Routes>

            <div id="loadingOverlay" className={`${loadingOverlay ? 'open':''}`}>
                <Spinner className="spinner-border spinner-border text-light" isLoading={loadingOverlay}  />
            </div>   

            <button 
                onClick={()=> setMenuOpen(!menuOpen)}
                className="btn btn-menu btn-primary rounded-circle shadow d-lg-none position-fixed border-white bottom-0 start-0 mb-4 ms-4">
                <i className={`bi bi-${menuOpen ? 'arrow-left' : 'arrow-right'}`}></i>
            </button>

        </main>
    )

}


export default Dashboard;