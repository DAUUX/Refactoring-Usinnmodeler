import "./style.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { Toast } from "../../components/Toast";
import ShareDiagramModal from "../../components/ShareDiagramModal";
import { slugify } from "../../Helpers";
import logo from "../../assets/icons/usinn-logo-min.png";
import UserProfile from "../../components/UserProfile";
import ExportDiagramModal from "../../components/ExportDiagramModal";
import Spinner from "../../components/Spinner";
import Notifications from "../../components/Notifications";
import { useSocket } from "../../services/SocketContext";
import { Modal } from 'bootstrap';

function Modeler(props) {
    const socket = useSocket()

    useEffect(() => {
        document.title = 'Diagrama - USINN Modeler';
    },[]);

    const [loadingOverlay, setLoadingOverlay] = useState(false);
    const [diagram, setDiagram]       = useState('');
    const [diagramSVG, setDiagramSVG] = useState('');
    const [name, setName]             = useState('');
    const [owner, setOwner]           = useState(false);
    const [created, setCreated]       = useState(false);
    const [shareModalId]              = useState('ShareDiagramModal');
    const [oculteManipulationIcons, setOculteManipulationIcons] = useState(true);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket) return;
    
        socket.on('component_refresh', async (data) => {
          try {
            validPermissionForEdit();
          } catch (error) {
            console.log('Erro ao atualizar componente')
          }
        })
    
        return () => {
          socket.off('component_refresh');
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    async function validPermissionForEdit() {      
        try {
            let user_id = JSON.parse(localStorage.getItem('user')).id;
            const diagram = await api.get(`/collaboration/${id}/${user_id}`);
            const collaboratorPermission = diagram.data.permission;
            collaboratorPermission === 1 ? setOculteManipulationIcons(true) : setOculteManipulationIcons(false);
        } catch (error) {
            Toast('error', 'Você não tem permissão para acessar o diagrama', 'aviso')
            navigate('/dashboard')
        }  
        
    }

    async function createDiagramEditor() {

        if (!created) {
            window.createEditor(`${process.env.PUBLIC_URL}/config/usinnComponents.xml`);
            setCreated(true);
        }

        if (!id)
            return;

        try {
            const res = await api.get(`diagrams/${id}`);
            
            const {diagram_data, name, user_id} = res.data;
            setName(name);            

            window.history.replaceState(null, name, `/modeler/${id}/${slugify(name)}`);  

            setOwner(user_id === JSON.parse(localStorage.getItem('user')).id ? true : false);
            
            validPermissionForEdit();

            const event = new CustomEvent('openDiagram', { detail: diagram_data });
            window.dispatchEvent(event);

        } catch (error) {

            Toast('error', error, "errorCircle");
            
            navigate('/modeler');
            
        }
    }

    async function updateDiagram() {

        setLoadingOverlay(true);

        try {
            
            const data = {name, diagram_data: diagram, diagram_svg: diagramSVG};
            
            const response = await api.put(`diagrams/${id}`, data);

            window.history.replaceState(null, name, `/modeler/${id}/${slugify(response.data.name)}`);

            const resDiagram = await api.get(`diagrams/${id}`);  
            const {user_id} = resDiagram.data;

            const my_id = JSON.parse(localStorage.getItem('user')).id
            const collaborator_name = JSON.parse(localStorage.getItem('user')).name;

            const resCollab = await api.get(`collaboration/${id}`)
            const user_ids = resCollab.data.collaborators.map(collaborator => collaborator.collaborator_id);
            user_ids.push(user_id);
            const filtered_user_ids = user_ids.filter(id => id !== my_id);
            
            await api.post('notification', {user_id: filtered_user_ids, diagram_id: id, diagram_name: name, type: 2, message: `"${collaborator_name}" editou o ${owner ? 'diagrama compartilhado com você' : 'seu diagrama'}: "${name}"`})
            await socket.emit('send_notification', filtered_user_ids);

            Toast('success', 'Diagrama salvo com sucesso!', "checkCircle");
        
        } catch (error) {

            Toast('error', error, "errorCircle");
        
        }

        setLoadingOverlay(false);
    }

    async function rename(e = null) {

        if (e)
            e.preventDefault();

        try {
            
            const data = {name};
            const res = await api.get(`diagrams/${id}`);  
            const {user_id} = res.data
            const nameAntes = res.data.name
            
            const response = await api.put(`diagrams/rename/${id}`, data);

            window.history.replaceState(null, name, `/modeler/${id}/${slugify(response.data.name)}`);

            if(!owner && nameAntes !== name){
                const collaborator_name = JSON.parse(localStorage.getItem('user')).name;
                
                await api.post('notification', {user_id: user_id, diagram_id: id, diagram_name: name, type: 2, message: `"${collaborator_name}" alterou o nome do seu diagrama: "${nameAntes}" para "${name}"`})
                await socket.emit('send_notification', user_id);
            }else if(owner && nameAntes !== name){

                const my_id = JSON.parse(localStorage.getItem('user')).id
                    const collaborator_name = JSON.parse(localStorage.getItem('user')).name;

                    const res = await api.get(`collaboration/${id}`)
                    const user_ids = res.data.collaborators.map(collaborator => collaborator.collaborator_id);
                    user_ids.push(user_id);
                    const filtered_user_ids = user_ids.filter(id => id !== my_id);

                await api.post('notification', {user_id: filtered_user_ids, diagram_id: id, diagram_name: name, type: 2, message: `"${collaborator_name}" alterou o nome do diagrama compartilhado: "${nameAntes}" para "${name}"`})
                await socket.emit('send_notification', filtered_user_ids);
            }

            Toast('success', 'Diagrama salvo com sucesso!', "checkCircle");

            document.getElementById('nameInput').blur()
        
        } catch (error) {

            Toast('error', error, "errorCircle");
        
        }
    }

    useEffect(()=>{
        createDiagramEditor();

        const saveDiagram = (event) => {
            setDiagram(event.detail.xml);
            setDiagramSVG(event.detail.svg);
        }

        window.addEventListener('saveDiagram', saveDiagram);

        return () => { 
            window.removeEventListener('saveDiagram', saveDiagram);
        };
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])
    
    useEffect(()=>{
        if (diagram && diagramSVG) {
            updateDiagram();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [diagram, diagramSVG])

    const openSharedModal = () => {
        const modal = new Modal(`#${shareModalId}`)          
        modal.show();
    }

    return (
        <main id="modelerPage" className="container-fluid px-0 flex-fill d-flex flex-column bg-white h-100">
            

            <nav id="modelerNavbar" className="navbar navbar-expand-lg bg-primary ">
                <div className="container-fluid ps-lg-4 pe-lg-3">
                    <div className="d-flex align-items-center">
                        <button className="navbar-toggler bg-light me-3 me-lg-0" type="button" data-bs-toggle="collapse" data-bs-target="#modelerNavbarToggle" aria-controls="modelerNavbarToggle" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <form onSubmit={rename} className="d-flex align-items-center flex-grow-1" role="search" >
                            <Link to="/dashboard" className="d-flex align-items-center"> <img src={logo} className="m-auto" alt="logo USINN" /> </Link>
                            <input value={name} onChange={(e) => {setName(e.target.value)}} onBlur={rename} className="form-control py-0 ms-3 px-2 text-white flex-grow-1" type="text" id="nameInput" name="name" autoComplete="name" />
                        </form>
                    </div>
                    <div className="collapse navbar-collapse justify-content-end" id="modelerNavbarToggle">
                        <div className="d-flex justify-content-end align-items-center pt-3 pb-1 py-lg-0">
                            <span>
                                {id && owner &&
                                    <button data-bs-target={`#${shareModalId}`} className="btn btn-light btn-sm order-last text-primary me-4" title="Compartilhar" onClick={openSharedModal}>
                                        Compartilhar <i className="bi bi-share-fill fs-7"></i>
                                    </button>
                                }
                            </span>
                            
                            <span>
                                <div className="d-flex align-items-center gap-2">
                                    <Notifications iconColor={'text-white'}/>
                                    <UserProfile textColor = "white"/>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
            


           <div hidden={oculteManipulationIcons}>
                <div id="actionsMenu" className="d-flex py-2 px-5" >
                    {/* mxGraph actions added here */ }
                    <button data-bs-toggle="modal" data-bs-target={`#exportModalId`} className="btn bg-white btn-sm order-last" title="Exportar" > 
                        <i className="bi bi-box-arrow-up-right fs-5 pe-4 "></i>
                        <span className="h6 text-secondary">Exportar diagrama</span>
                    </button>                             
                </div>
            </div> 

            <section role="main" className="row flex-fill position-relative overflow-hidden g-0" >
                {/* Menu lateral */}
                <div id="modelerToolbar" className="position-absolute bg-white" hidden={oculteManipulationIcons}>
                    <center> <div id="toolbar" ></div> </center>
                </div>

                {/* Editor */}
                <div id="graph" className="col-12 bg-white h-100">
                    <center id="splash"> <img src="/images/loading.gif" alt=""/> </center>
                </div>

                <div id="outlineContainer"></div>

                <div id="zoomActions" hidden="hidden"></div>
                <div id="footer" hidden="hidden">
                </div>
            </section>

            <ShareDiagramModal id={shareModalId} diagram_id={id} />

            
            <ExportDiagramModal id={"exportModalId"} onExportDiagram={(value)=>{setLoadingOverlay(value)}} diagramSVG={diagramSVG}/>

            <div id="loadingOverlay" className={`${loadingOverlay ? 'open':''}`}>
                <Spinner className="spinner-border spinner-border text-light" isLoading={loadingOverlay}  />
            </div>

        </main>
    )
}

export default Modeler;