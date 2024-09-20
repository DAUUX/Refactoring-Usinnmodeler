import './style.scss'
import usinnModeler from "../../assets/icons/logo-usinn-white.png";

import { Link, useRouteMatch, useLocation } from "react-router-dom";
import { Toast } from '../Toast';
import api from '../../services/api';
import { slugify } from '../../Helpers';
import { useHistory } from "react-router-dom";

function DashboardMenu({menuOpen, onCreateDiagram}) {

    const history   = useHistory();

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

    async function createNewDiagram(e) {

        e.preventDefault();

        history.push('/modeler');
        // onCreateDiagram(true);
        // const data = {name: 'Novo diagrama', diagram_data: '', diagram_svg: ''};

        // try {
        
        //     const res = await api.post('diagrams', data);

        //     const {id, name} = res.data;

        //     history.push(`/modeler/${id}/${slugify(name)}`);
        
        // } catch (error) {
        
        //     if(error == "TypeError: Cannot read properties of undefined (reading 'status')"){
        //         Toast('error', "Falha na conexão ao servidor", "errorServer");
        //     }
        //     else{
        //         Toast('error', error, "errorCircle");
        //     }
        
        // }

        // onCreateDiagram(false);

    } 


    return (
        <aside id="dashboard-menu" className={`bg-primary d-flex flex-column pt-5 align-items-center ${menuOpen ? 'open' : ''}`}>

            <div className="d-flex flex-column mb-4">
                <img src={usinnModeler} alt="logo USINN" />
                <span className="text-white mt-2 fs-5">Modeler</span>
            </div>

            <div className="w-100 px-3 mb-3">
                <button id="btn-new" onClick={createNewDiagram} className="btn btn-lg w-100 btn-light text-primary mt-4"> <i className="bi bi-plus-lg me-2"></i> NOVO </button>
            </div>

            <ul className="nav flex-column w-100">
                {
                    menuItems.map(item=>{
                        return  (
                            <li className={`nav-item ${(pathname.split("/")[2] ? "/"+pathname.split("/")[2] : '') == item.path ? 'active' : ''}`} key={item.name}>
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