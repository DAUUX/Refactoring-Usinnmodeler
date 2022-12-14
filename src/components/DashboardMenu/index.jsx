import './style.scss'
import usinnModeler from "../../assets/icons/logo-usinn-white.png";

import { Link, useRouteMatch, useLocation } from "react-router-dom";

function DashboardMenu({menuOpen}) {

    const menuItems = [
        {
            name: 'Início',
            path: '',
            icon: 'bi-house'
        },
        {
            name: 'Documentos',
            path: '/documentos',
            icon: 'bi-file-earmark'
        }
    ]

    let match = useRouteMatch();

    let { pathname } = useLocation()

    return (
        <aside id="dashboard-menu" className={`bg-primary d-flex flex-column pt-5 align-items-center ${menuOpen ? 'open' : ''}`}>

            <div className="d-flex flex-column mb-4">
                <img src={usinnModeler} alt="logo USINN" />
                <span className="text-white mt-2 fs-5">Modeler</span>
            </div>

            <div className="w-100 px-3 mb-3">
                <Link id="btn-new" className="btn btn-lg w-100 btn-light text-primary mt-4" to="/modeler"> <i className="bi bi-plus-lg me-2"></i> NOVO </Link>
            </div>

            <ul className="nav flex-column w-100">
                {
                    menuItems.map(item=>{
                        return  (
                            <li className={`nav-item ${pathname == match.url+item.path ? 'active' : ''}`} key={item.name}>
                                <Link to={`${match.url}${item.path}`} className="text-white d-block fs-5 text-decoration-none px-4 py-4"> 
                                    <i className={`bi ${item.icon} me-2`}></i>  {item.name} 
                                </Link>
                            </li>
                        )
                    })
                }                
            </ul>

            <a href="#" className="text-white d-block fw-bold text-decoration-none mt-auto mb-4"> Assista ao tutorial</a>

        </aside>
    )

}

export default DashboardMenu;