import "./style.scss";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NewDiagramModal from "../../components/NewDiagramModal";
import { Modal } from "bootstrap";
import api from "../../services/api";
import { Toast } from "../../components/Toast";

function Modeler(props) {

    const [diagram, setDiagram] = useState('');
    const [name, setName]       = useState('');
    const [created, setCreated] = useState(false);
    const [modalId]             = useState('newDiagramModal');

    const history = useHistory();

    async function createDiagramEditor() {

        if (!created) {
            window.createEditor(`${process.env.PUBLIC_URL}/config/usinnComponents.xml`);
            setCreated(true);
        }

        if (props.match.params.id) {
            
            try {

                const res = await api.get(`diagrams/${props.match.params.id}`);
                
                const {diagram_data, name} = res.data;
                setName(name);

                const event = new CustomEvent('openDiagram', { detail: diagram_data });
                window.dispatchEvent(event);

            } catch (error) {

                Toast('error', error);
                history.push('/modeler');
                
            }
        }        
    }

    async function updateDiagram() {
        
        try {
            
            const data = {name, diagram_data: diagram};
            
            await api.put(`diagrams/${props.match.params.id}`, data);
            Toast('success', 'Diagrama salvo com sucesso!');
        
        } catch (error) {
        
            Toast('error', error);
        
        }
    }

    useEffect(()=>{
        createDiagramEditor();

        const saveDiagram = (event) => {
            setDiagram(event.detail);
        }

        window.addEventListener('saveDiagram', saveDiagram);

        return () => { 
            window.removeEventListener('saveDiagram', saveDiagram);
        };
        
    },[props.match.params.id])
    
    useEffect(()=>{
        if (diagram) {
            if (!props.match.params.id) {
                new Modal(`#${modalId}`).show();
            } else {
                updateDiagram();
            }
        }
    }, [diagram])

    return (
        <main className="container-fluid px-0 flex-fill d-flex flex-column">

            {/* <span hidden="hidden"> <input id="source" type="checkbox"/> Source </span>
            <textarea id="xml" hidden="hidden"></textarea> */}

            <nav id="actionsMenu" className="nav navbar-light shadow-sm py-3 px-5">
                <div id="mainActions"> </div>
                {/* <div id="selectActions" hidden="hidden"> </div> */}
            </nav>

            <section role="main" className="row flex-fill g-0">
                {/* Menu lateral */}
                <div className="col-2">
                    <center> <div id="toolbar" className="px-3" ></div> </center>
                </div>

                {/* Editor */}
                <div id="graph" className="col-10 bg-white">
                    <center id="splash"> <img src="/images/loading.gif"/> </center>
                </div>

                <div id="outlineContainer"></div>

                <div id="zoomActions" hidden="hidden"></div>
                <div id="footer" hidden="hidden">
                    <p id="status"> Carregando... </p>
                </div>
            </section>

            <NewDiagramModal id={modalId} diagram={diagram} />

        </main>
    )
}

export default Modeler;
