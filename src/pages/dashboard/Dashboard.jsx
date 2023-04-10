import "./style.scss"
import { useState } from "react";
import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import DashboardMenu from "../../components/DashboardMenu";
import Documents from "./documents/Documents";
import Spinner from "../../components/Spinner";

function Dashboard() {
    let match = useRouteMatch();

    const [menuOpen, setMenuOpen]             = useState(false);
    const [loadingOverlay, setLoadingOverlay] = useState(false);

    const username = JSON.parse(localStorage.getItem("user"))['name']

    return (
        <main id="dashboard" className={`flex-fill d-flex align-items-center ${menuOpen ? 'menu-open' : ''}`}>
            
            <DashboardMenu menuOpen={menuOpen} onCreateDiagram={(value) => setLoadingOverlay(value) } />
        
            <Switch>
                <Route path={`${match.path}/documentos`}>
                    <Documents/>
                </Route>
                <Route path={match.path}>
                    <div className="h-100 w-100 text-center pt-5">
                        <h3>Seja bem-vindo, {username}!</h3>
                    </div>
                </Route>
            </Switch>

            <div id="loadingOverlay" className={`${loadingOverlay ? 'open':''}`}>
                <Spinner className="spinner-border spinner-border text-light" isLoading={loadingOverlay}  />
            </div>

            <button 
                onClick={()=> setMenuOpen(!menuOpen)}
                className="btn btn-menu btn-primary rounded-circle shadow d-lg-none position-fixed bottom-0 start-0 mb-4 ms-4">
                <i className={`bi bi-${menuOpen ? 'arrow-left' : 'arrow-right'}`}></i>
            </button>

        </main>
    )

}


export default Dashboard;