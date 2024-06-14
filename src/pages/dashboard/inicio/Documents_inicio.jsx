import { useState, useEffect } from "react";
import DiagramCard from "../../../components/DiagramCardInicio";
import Spinner from "../../../components/Spinner";
import { Toast } from "../../../components/Toast";
import api from "../../../services/api";
import { Modal } from "bootstrap";
import ShareDiagramModal from "../../../components/ShareDiagramModal";
import RemoveDiagramModal from "../../../components/RemoveDiagramModal";
import RenameDiagramModal from "../../../components/RenameDiagramModal";

function Documents_inicio() {

    let [diagrams, setDiagrams] = useState([]);
    let [loading, setLoading] = useState(true);

    const [selectedId, setSelectedId] = useState(null);
    
    async function getDiagrams() {
        setLoading(true);
        try{
            const res = await api.get('diagrams?limit=4');
            const sortedDiagrams = res.data.diagrams.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            setDiagrams(sortedDiagrams);
        } catch(error){
            Toast('error', error);
        }
        setLoading(false);
    }

    useEffect(()=>{
       getDiagrams();
    },[])

    function callShareDiagramModal(id) {
        setSelectedId(id)

        const modal = new Modal('#ShareDiagramModal')          
        modal.show();
    }

    function callRemoveDiagramModal(id) {
        setSelectedId(id)

        const modal = new Modal('#RemoveDiagramModal')          
        modal.show();
    }

    function callRenameDiagramModal(id) {
        setSelectedId(id)

        const modal = new Modal('#RenameDiagramModal')          
        modal.show();
    }
    
    // Variável com os quatro primeiros diagramas
    const resultcardRecentes = diagrams.length !== 0;

    const cardRecentes = (
        <div className="container-fluid px-4 ">
            <div className="row ">
                {
                    loading && (
                        <div className="col-12 d-flex mt-5 justify-content-center">
                            <Spinner className="spinner-border me-2" isLoading={loading} />
                        </div>
                    )
                }
                {
                    diagrams.length > 0 && !loading && (
                        diagrams.map((diagram) => (
                            <div key={diagram.id} className="col-12 col-md-4 col-lg-3 mb-3" style={{ minWidth: "245px" }}>
                                <DiagramCard
                                    id={diagram.id}
                                    name={diagram.name}
                                    lastModified={diagram.updatedAt}
                                    userId={diagram.user_id}
                                    thumbnail={diagram.diagram_svg}
                                    onShareDiagram={(id) => callShareDiagramModal(id)}
                                    onRemoveDiagram={(id) => callRemoveDiagramModal(id)}
                                    onRenameDiagram={(id) => callRenameDiagramModal(id)}
                                    favorited={diagram.favorite}
                                    onDiagramFavorited={() => { }}
                                />
                            </div>
                        ))
                    )
                }
                {
                    (<></>)
                }
            </div>
            <ShareDiagramModal id="ShareDiagramModal" diagram_id={selectedId} />
            <RemoveDiagramModal id="RemoveDiagramModal" diagram_id={selectedId} onDiagramRemoved={() => getDiagrams()} />
            <RenameDiagramModal id="RenameDiagramModal" diagram_id={selectedId} onDiagramRenamed={() => getDiagrams()} />
        </div>
    );

    // Retorne as variáveis result e card dentro de um objeto
    return { resultcardRecentes, cardRecentes };
}

export default Documents_inicio;
