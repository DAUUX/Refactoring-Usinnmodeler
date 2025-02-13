import './style.scss'
import usinnModeler from "../../assets/icons/logo-usinn-white.png";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Toast } from '../Toast';
import api from '../../services/api';
import { slugify } from '../../Helpers';
import { useEffect, useState } from 'react';
import { useSocket } from '../../services/SocketContext';

function DashboardMenu({menuOpen, setMenuOpen, onCreateDiagram}) {
    const socket = useSocket()

    const navigate   = useNavigate();
    const [updateTrigger, setUpdateTrigger] = useState(false)
    const [countNotific, setCountNotific] = useState(0)

    useEffect(() => {
        if (!socket) return;
    
        socket.on('notification_received_dashboard', async (data) => {
            try {
                setUpdateTrigger(prev => !prev);
            } catch (err) {
              console.error('Erro ao reproduzir o áudio:', err);
            }
        });

        socket.on('notification_refresh_dashboard', async (data) => {
            try {
            setUpdateTrigger(prev => !prev)
            } catch (error) {
            console.log('Erro na ação com a notificação')
            }
        })
    
        return () => {
          socket.off('notification_received_dashboard');
          socket.off('notification_refresh_dashboard');
        };
        
      }, [socket]);

    const getCountNotification = async () => {
        try {
            const user_id = JSON.parse(localStorage.getItem('user')).id
            const res = await api.get(`notification/count/${user_id}`)
            setCountNotific(res.data.count)
        } catch (error) {
            console.log('ocorreu um erro ao contar as notificações', error)
        }
    }

    useEffect(() => {
        getCountNotification()
    },[updateTrigger])

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
        },{
            name: 'Notificações',
            path: '/notification',
            icon: 'bi-bell'
        }
    ]

    const route = "/dashboard"

    let { pathname } = useLocation()

    async function createNewDiagram(e) {

        e.preventDefault();
        // return
        navigate('/modeler');
        // onCreateDiagram(true);
        // const data = {name: 'Novo diagrama', diagram_data: '', diagram_svg: ''};

        onCreateDiagram(true);
        const data = {name: 'Novo diagrama', diagram_data: '', diagram_svg: ''};

        try {
        
            const res = await api.post('diagrams', data);

            const {id, name} = res.data;

            navigate(`/modeler/${id}/${slugify(name)}`);
        
        } catch (error) {
        
            Toast('error', error, "errorCircle");
        
        }

        onCreateDiagram(false);

    } 

    useEffect(() => {
        document.body.style.overflowY = menuOpen ? 'hidden' : 'auto'
    },[menuOpen])
 
    return (
        <aside id="dashboard-menu" className={`position-sticky sticky-top bg-primary d-flex flex-column pt-5 align-items-center ${menuOpen ? 'open' : ''}`}>

            <div className="d-flex flex-column mb-4">
                <img src={usinnModeler} alt="logo USINN" />
                <span className="text-white mt-2 fs-5">Modeler</span>
            </div>

            <div className="w-100 px-3 mb-3">
                <button id="btn-new" onClick={createNewDiagram} className="btn btn-lg w-100 btn-light text-primary mt-4"> <i className="bi bi-plus-lg me-2"></i> NOVO </button>
            </div>

            <ul className="nav flex-column w-100">
                {
                    menuItems.map(item => (
                        <li className={`nav-item ${(pathname.split("/")[2] ? "/"+pathname.split("/")[2] : '') === item.path ? 'active' : ''}`} key={item.name}>
                            <Link to={`${route}${item.path}`} className="d-block fs-5 text-decoration-none px-4 py-4" onClick={() => setMenuOpen(false)}> 
                                <i className={`bi ${item.icon} me-2`}></i>  {item.name} 
                                {item.name === 'Notificações' && countNotific > 0 &&
                                    <span className='bg-danger text-white p-1 px-2 rounded-2 fs-6 float-end'>{
                                        countNotific > 99 ? '99+' : countNotific
                                    }</span>
                                }
                            </Link>
                        </li>
                    ))
                }          
            </ul>

            <Link to="/#Tutorial" target="_blank" className="text-white d-block fw-bold text-decoration-none mt-auto mb-4"> Assista ao tutorial</Link>

        </aside>
    )

}

export default DashboardMenu;