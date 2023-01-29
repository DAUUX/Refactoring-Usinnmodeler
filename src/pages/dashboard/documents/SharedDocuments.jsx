import { useState, useEffect } from "react";
import DiagramCard from "../../../components/DiagramCard";
import Spinner from "../../../components/Spinner";
import { Toast } from "../../../components/Toast";
import api from "../../../services/api";
import { Modal } from "bootstrap";
import ShareDiagramModal from "../../../components/ShareDiagramModal";
import RemoveDiagramModal from "../../../components/RemoveDiagramModal";
import RenameDiagramModal from "../../../components/RenameDiagramModal";

function SharedDocuments() {

    let [diagrams, setDiagrams] = useState([]);
    let [loading, setLoading] = useState(true);

    const [selectedId, setSelectedId] = useState(null);
    
    async function getDiagrams() {
        setLoading(true);
        try{
            const res = await api.get(`diagrams/shared`);
            setDiagrams(res.data.diagrams);
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
    
    return (
        <div className="container-fluid px-4">            
            <div className="row">
                
                {
                    loading && (
                        <div className="col-12 d-flex mt-5 justify-content-center">
                            <Spinner className="spinner-border me-2" isLoading={loading}  />
                        </div>
                    )
                }
                
                {
                    diagrams.length >0 && !loading &&(
                        diagrams.map((diagram)=>{
                            return (
                                <div key={diagram.id} className="col-12 col-md-4 col-lg-3">
                                    <DiagramCard id={diagram.id} name={diagram.name} lastModified={diagram.updatedAt} thumbnail={diagram.diagram_svg} onShareDiagram={(id) => callShareDiagramModal(id)} onRemoveDiagram={(id)=> callRemoveDiagramModal(id)} onRenameDiagram={(id)=> callRenameDiagramModal(id)} />                        
                                </div>
                            )
                        })
                    )

                    
                }

                {
                    diagrams.length ==0 && !loading &&(
                        <h4 className="text-center mt-5">Ainda não há diagramas</h4>
                    )
                }
               
            </div>

            <ShareDiagramModal id="ShareDiagramModal" diagram_id={selectedId} />
            <RemoveDiagramModal id="RemoveDiagramModal" diagram_id={selectedId} onDiagramRemoved={() => getDiagrams()} />
            <RenameDiagramModal id="RenameDiagramModal" diagram_id={selectedId} onDiagramRenamed={() => getDiagrams()} />

        </div>
    )


}

export default SharedDocuments