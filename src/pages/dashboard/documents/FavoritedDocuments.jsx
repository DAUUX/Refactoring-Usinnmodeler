import { useState, useEffect } from "react";
import DiagramCard from "../../../components/DiagramCard";
import Spinner from "../../../components/Spinner";
import { Toast } from "../../../components/Toast";
import api from "../../../services/api";
import { Modal } from "bootstrap";
import ShareDiagramModal from "../../../components/ShareDiagramModal";
import RemoveDiagramModal from "../../../components/RemoveDiagramModal";
import RenameDiagramModal from "../../../components/RenameDiagramModal";
import Modelos_documentos from "../inicio/Modelos_documentos";
import './style.scss'

function FavoritedDocuments() {

    useEffect(() => {
        document.title = 'Meus favoritos - USINN Modeler';
    },[]);

    let [diagrams, setDiagrams] = useState([]);
    let [loading, setLoading] = useState(true);

    const [selectedId, setSelectedId] = useState(null);

    const [refreshModels, setRefreshModels] = useState(false);
    function forceRefresh() {
        setRefreshModels(!refreshModels); 
    }
    
    const {resultcardModels, cardModels} = Modelos_documentos({ refresh: refreshModels, forceRefresh:forceRefresh, onlyFavorited:"true"});
    
    async function getDiagrams() {
        setLoading(true);
        try{
            const res = await api.get(`diagrams/favorited`);
            setDiagrams(res.data.diagrams);
        } catch(error){

            Toast('error', error, "aviso");
            
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
                                <div key={diagram.id} className="col-12 col-md-4 col-lg-3 mb-3">
                                    <DiagramCard 
                                        id={diagram.id} 
                                        name={diagram.name} 
                                        lastModified={diagram.updatedAt} 
                                        userId={diagram.user_id} 
                                        thumbnail={diagram.diagram_svg} 
                                        onShareDiagram={(id) => callShareDiagramModal(id)} 
                                        onRemoveDiagram={(id)=> callRemoveDiagramModal(id)} 
                                        onRenameDiagram={(id)=> callRenameDiagramModal(id)} 
                                        favorited={diagram.favorite} 
                                        onDiagramFavorited={()=>{getDiagrams()}}
                                    />                                                          
                                </div>
                            )
                        })
                    )                    
                }


                {resultcardModels && (
                    <div className="ps-0 pe-0 mt-5 mt-5">
                        <div className="d-flex justify-content-between">
                            <h3 className="ps-4">Modelos favoritados</h3>
                        </div>
                        <div className="ps-0">
                            {cardModels}
                        </div>
                    </div>
                )}
                

                {
                    diagrams.length === 0 && !loading && !resultcardModels &&(
                        <h4 className="text-center mt-5">Ainda não há diagramas favoritados</h4>
                    )
                }
                
            </div>

            <ShareDiagramModal id="ShareDiagramModal" diagram_id={selectedId} />
            <RemoveDiagramModal id="RemoveDiagramModal" diagram_id={selectedId} onDiagramRemoved={() => getDiagrams()} />
            <RenameDiagramModal id="RenameDiagramModal" diagram_id={selectedId} onDiagramRenamed={() => getDiagrams()} />

        </div>
    )


}

export default FavoritedDocuments