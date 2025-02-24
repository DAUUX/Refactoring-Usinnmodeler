import { Route, Routes, Link, useLocation} from "react-router-dom";
import UserProfile from "../../../components/UserProfile";
import MyDocuments  from "./MyDocuments";
import SharedDocuments from "./SharedDocuments";
import FavoritedDocuments from "./FavoritedDocuments";
import Notifications from "../../../components/Notifications"
import './style.scss'

function Documents() {

    const route = "/dashboard/documentos"
    const { pathname } = useLocation()
    
    return (
        <div id="documentsPage" className="flex-fill h-100">
            <nav className="navbar navbar-expand-lg bg-white p-3 px-1 px-sm-3 justify-content-between">
                <div className="container-fluid">
                    <div className="mb-0 h4">
                        <h1 className="h4 m-0">Documentos</h1>
                    </div>
                    <div className="d-flex align-items-center ps-sm-4 gap-2 ms-auto">
                        <Notifications/>
                        <UserProfile/>
                    </div>
                </div>
            </nav>
            
            <div id="documentsNav" className="my-4">
                <ul className="nav nav-tabs bold flex-column flex-sm-row px-3 gap-3">
                    <li className={`nav-item ${pathname === route ? 'active' : ''}`}>
                        <Link to={route} className="d-flex align-items-center text-dark d-block text-decoration-none px-2">
                            Meus documentos
                        </Link> 
                    </li>
                    <li className={`nav-item ${pathname === route+'/favoritos' ? 'active' : ''}`}>
                        <Link to={`${route}/favoritos`} className="d-flex align-items-center text-dark d-block text-decoration-none px-2">
                            Meus favoritos
                        </Link> 
                    </li>
                    <li className={`nav-item ${pathname === route+'/compartilhados' ? 'active' : ''}`}>
                        <Link to={`${route}/compartilhados`} className="d-flex align-items-center text-dark d-block text-decoration-none px-2">
                            Compartilhados comigo
                        </Link> 
                    </li>
                </ul>
            </div>
            
            <Routes>
                <Route path={`/compartilhados`} element={<SharedDocuments/>} />
                <Route path={`/favoritos`} element={<FavoritedDocuments/>} />       
                <Route path={`/`} element={<MyDocuments/>} />
            </Routes>
                
        </div>
    )
}

export default Documents;