import { useState, useEffect } from "react";
import DiagramCard from "../../../components/DiagramCard";
import Spinner from "../../../components/Spinner";
import { Toast } from "../../../components/Toast";
import api from "../../../services/api";
import { Modal } from "bootstrap";
import { slugify } from '../../../Helpers';
import RemoveDiagramModal from "../../../components/RemoveDiagramModal";

function Modelos_documentos() {

    let [diagrams, setDiagrams] = useState([]);
    let [loading, setLoading] = useState(true);

    const [selectedId, setSelectedId] = useState(null);
    

    async function getDiagrams() {

        setLoading(true);
        try{
            const res = await api.get('/diagrams/diagramModels');
            const diagramsData = res.data.diagrams; // Obtem o objeto `diagrams`
        
            // Converte o objeto em uma lista de diagramas para renderização
            const diagramsList = Object.keys(diagramsData).map(key => ({
                id: key,               // Chave como ID
                name: diagramsData[key].titulo, // Título do modelo
                updatedAt: diagramsData[key].updatedAt, // Data de modificação
                user_id: diagramsData[key].user_id, // ID do usuário
                diagram_svg: diagramsData[key].diagram_svg, // Caminho do thumbnail
                favorite: diagramsData[key].favorite, // Se favoritado
                diagram_data: diagramsData[key].diagram_data // Informacoes
            }));
            setDiagrams(diagramsList);

        } catch(error){
            Toast('error', error);
        }
        setLoading(false);
    }

    useEffect(()=>{
        getDiagrams();
    },[])


    function callRemoveDiagramModal(id) {
      
    }


    const resultcardModels = diagrams.length !== 0;

    const cardModels = (
      <div className="container-fluid px-4">
        <div className="row">
          {loading && (
            <div className="col-12 d-flex mt-5 justify-content-center">
              <Spinner className="spinner-border me-2" isLoading={loading} />
            </div>
          )}

          {diagrams.length > 0 && !loading && (
                  <div className="row">
                    {diagrams.slice(0, 4).map((diagram) => (
                      <div key={diagram.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                        <DiagramCard
                          id={diagram.id}
                          name={diagram.name}
                          userId={diagram.user_id}
                          isModel={true}
                          diagram_data={diagram.diagram_data}
                          thumbnail={diagram.diagram_svg}
                          onRemoveDiagram={(id) => callRemoveDiagramModal(id)}
                          favorited={diagram.favorite}
                          onDiagramFavorited={() => {}}
                        />
                      </div>
                    ))}
                  </div>
          )}
        </div>
        
        <RemoveDiagramModal id="RemoveDiagramModal" diagram_id={selectedId} onDiagramRemoved={() => getDiagrams()} />
      </div>
    );


    return { resultcardModels, cardModels };
}

export default Modelos_documentos;
