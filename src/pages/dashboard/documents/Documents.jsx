import { Route, Switch, useRouteMatch, Link, useLocation } from "react-router-dom";
import UserProfile from "../../../components/UserProfile";
import MyDocuments  from "./MyDocuments";
import SharedDocuments from "./SharedDocuments";
import './style.scss'

function Documents() {

    let match = useRouteMatch();

    let { pathname } = useLocation();
    
    return (
        <div id="documentsPage" className="flex-fill h-100">
            <nav className="navbar navbar-expand-lg bg-white p-3 justify-content-between">
                <div className="container-fluid">
                    <div className="mb-0 h4">
                        <b>Documentos</b>
                    </div>
                    <UserProfile/>
                </div>
            </nav>
            
            <div id="documentsNav" className="my-4">
                <ul className="nav nav-tabs bold">
                    <li className={`nav-item ${pathname == match.url ? 'active' : ''} mx-3`}>
                        <Link to={`${match.url}`} className="text-dark d-block text-decoration-none pb-2 px-2">
                            Meus documentos
                        </Link> 
                    </li>
                    <li className={`nav-item ${pathname == match.url+'/compartilhados' ? 'active' : ''}`}>
                        <Link to={`${match.url}/compartilhados`} className="text-dark d-block text-decoration-none pb-2 px-2">
                            Compartilhados comigo
                        </Link> 
                    </li>
                </ul>
            </div>
            
            <Switch>
                <Route path={`${match.path}/compartilhados`}>
                    <SharedDocuments/>
                </Route>
                <Route path={match.path}>
                    <MyDocuments/>
                </Route>
            </Switch>
                
        </div>
    )
}

export default Documents;