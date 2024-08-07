
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

function Modeler(props) {

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
    const [oculteManipulationIcons, setOculteManipulationIcons] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    async function validPermissionForEdit() {        
        let user_id = JSON.parse(localStorage.getItem('user')).id;
        const diagram = await api.get(`/collaboration/${id}/${user_id}`);
        const collaboratorPermission = diagram.data.permission;
        collaboratorPermission === 1 ? setOculteManipulationIcons(true) : setOculteManipulationIcons(false);
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

            if(error === "TypeError: Cannot read properties of undefined (reading 'status')"){
                Toast('error', "Falha na conexão ao servidor", "errorServer");
            }
            else{
                Toast('error', error, "errorCircle");
            }
            navigate('/modeler');
            
        }
    }

    async function updateDiagram() {

        setLoadingOverlay(true);

        try {
            
            const data = {name, diagram_data: diagram, diagram_svg: diagramSVG};
            
            const response = await api.put(`diagrams/${id}`, data);

            window.history.replaceState(null, name, `/modeler/${id}/${slugify(response.data.name)}`);

            Toast('success', 'Diagrama salvo com sucesso!', "checkCircle");
        
        } catch (error) {
        
            if(error === "TypeError: Cannot read properties of undefined (reading 'status')"){
                Toast('error', "Falha na conexão ao servidor", "errorServer");
            }
            else{
                Toast('error', error, "errorCircle");
            }
        
        }

        setLoadingOverlay(false);
    }

    async function rename(e = null) {

        if (e)
            e.preventDefault();

        try {
            
            const data = {name};
            
            const response = await api.put(`diagrams/rename/${id}`, data);

            window.history.replaceState(null, name, `/modeler/${id}/${slugify(response.data.name)}`);

            Toast('success', 'Diagrama salvo com sucesso!', "checkCircle");

            document.getElementById('nameInput').blur()
        
        } catch (error) {
        
            if(error === "TypeError: Cannot read properties of undefined (reading 'status')"){
                Toast('error', "Falha na conexão ao servidor", "errorServer");
            }
            else{
                Toast('error', error, "errorCircle");
            }
        
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

    return (
        <main id="modelerPage" className="container-fluid px-0 flex-fill d-flex flex-column bg-white h-100">
            

            <nav id="modelerNavbar" className="navbar navbar-expand-lg bg-primary ">
                <div className="container-fluid px-lg-5">
                    <button className="navbar-toggler bg-light me-3 me-lg-0" type="button" data-bs-toggle="collapse" data-bs-target="#modelerNavbarToggle" aria-controls="modelerNavbarToggle" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <form onSubmit={rename} className="d-flex me-auto" role="search" >
						<Link to="/dashboard"> <img src={logo} className="me-4" alt="logo USINN" /> </Link>
                        <input value={name} onChange={(e) => {setName(e.target.value)}} onBlur={rename} className="form-control py-0 px-2 text-white" type="text" id="nameInput" name="name" autoComplete="name" />
                    </form>
                    <div className="collapse navbar-collapse justify-content-end" id="modelerNavbarToggle">
                        <div className="d-flex align-items-center py-3 py-lg-0">
                            <span>
                                {id && owner &&
                                    <button data-bs-toggle="modal" data-bs-target={`#${shareModalId}`} className="btn btn-light btn-sm order-last text-primary me-4" title="Compartilhar">
                                        Compartilhar <i className="bi bi-share-fill fs-7"></i>
                                    </button>
                                }
                            </span>
                            
                            <span>
                                <UserProfile textColor = "white"/>
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
