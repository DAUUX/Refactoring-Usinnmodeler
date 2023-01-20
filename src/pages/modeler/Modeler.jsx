import "./style.scss";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NewDiagramModal from "../../components/NewDiagramModal";
import { Modal } from "bootstrap";
import api from "../../services/api";
import { Toast } from "../../components/Toast";
import ShareDiagramModal from "../../components/ShareDiagramModal";
import { slugify } from "../../Helpers";
import logo from "../../assets/icons/logo-min-blue.png";

function Modeler(props) {

    const [diagram, setDiagram]       = useState('');
    const [diagramSVG, setDiagramSVG] = useState('');
    const [name, setName]             = useState('');
    const [owner, setOwner]           = useState(false);
    const [created, setCreated]       = useState(false);
    const [modalId]                   = useState('newDiagramModal');
    const [shareModalId]              = useState('ShareDiagramModal');

    const history = useHistory();

    async function createDiagramEditor() {

        if (!created) {
            window.createEditor(`${process.env.PUBLIC_URL}/config/usinnComponents.xml`);
            setCreated(true);
        }

        if (!props.match.params.id)
            return;

        try {

            const res = await api.get(`diagrams/${props.match.params.id}`);
            
            const {diagram_data, name, user_id} = res.data;
            setName(name);

            if (!props.match.params.slug)
                window.history.replaceState(null, name, `${slugify(name)}`);

            setOwner(user_id == JSON.parse(localStorage.getItem('user')).id ? true : false);

            const event = new CustomEvent('openDiagram', { detail: diagram_data });
            window.dispatchEvent(event);

        } catch (error) {

            Toast('error', error);
            history.push('/modeler');
            
        }
    }

    async function updateDiagram() {
        
        try {
            
            const data = {name, diagram_data: diagram, diagram_svg: diagramSVG};
            
            await api.put(`diagrams/${props.match.params.id}`, data);
            Toast('success', 'Diagrama salvo com sucesso!');
        
        } catch (error) {
        
            Toast('error', error);
        
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
        
    },[props.match.params.id])
    
    useEffect(()=>{
        if (diagram && diagramSVG) {
            if (!props.match.params.id) {
                new Modal(`#${modalId}`).show();
            } else {
                updateDiagram();
            }
        }
    }, [diagram, diagramSVG])

    return (
        <main id="modelerPage" className="container-fluid px-0 flex-fill d-flex flex-column bg-white">

            <nav id="modelerNavbar" className="navbar navbar-expand-lg">
                <div className="container-fluid px-5">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#modelerNavbarToggle" aria-controls="modelerNavbarToggle" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <form className="d-flex me-auto" role="search">
						<img src={logo} className="me-4" alt="logo USINN" />
                        <input value={name} className="form-control py-0 px-2" type="text" id="nameInput" />
                    </form>
                    <div className="collapse navbar-collapse" id="modelerNavbarToggle">
                        <a className="navbar-brand ms-auto" href="#">Hidden brand</a>
                    </div>
                </div>
            </nav>

            <div id="actionsMenu" className="d-flex bg-light py-2 px-5">
                {/* mxGraph actions added here */}
                {props.match.params.id && owner &&
                    <button data-bs-toggle="modal" data-bs-target={`#${shareModalId}`} className="btn btn-light btn-sm shadow-sm order-last"> <i className="bi bi-share-fill"></i> </button>
                }
            </div>

            <section role="main" className="row flex-fill position-relative overflow-hidden g-0">
                {/* Menu lateral */}
                <div id="modelerToolbar" className="position-absolute pb-4 bg-light ms-3 mt-3">
                    <center> <div id="toolbar" className="px-3" ></div> </center>
                </div>

                {/* Editor */}
                <div id="graph" className="col-12 bg-white">
                    <center id="splash"> <img src="/images/loading.gif"/> </center>
                </div>

                <div id="outlineContainer"></div>

                <div id="zoomActions" hidden="hidden"></div>
                <div id="footer" hidden="hidden">
                    <p id="status"> Carregando... </p>
                </div>
            </section>

            <NewDiagramModal id={modalId} diagram={diagram} diagramSVG={diagramSVG}/>
            <ShareDiagramModal id={shareModalId} diagram_id={props.match.params.id} />

        </main>
    )
}

export default Modeler;
