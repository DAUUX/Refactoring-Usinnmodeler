import { useState, useEffect } from "react";
import DiagramCard from "../../../components/DiagramCardModel";
import Spinner from "../../../components/Spinner";
import { Toast } from "../../../components/Toast";
import api from "../../../services/api";
import { Modal } from "bootstrap";
import { slugify } from '../../../Helpers';
import RemoveDiagramModal from "../../../components/RemoveDiagramModal";

function Modelos_documentos({ refresh }) {
  let [diagrams, setDiagrams] = useState([]);
  let [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  // Função para alternar o estado de "favorito"
  function callFavoritedDiagram(id) {
    // Recupera os diagramas do estado
    setDiagrams(prevDiagrams => {
      const updatedDiagrams = prevDiagrams.map(diagram => {
        // Atualiza o campo "favorite" para o diagrama com o id correspondente
        if (diagram.id === id) {
          const updatedFavorite = !diagram.favorite;
          // Salva o novo valor de "favorite" no localStorage
          const favoriteDiagrams = JSON.parse(localStorage.getItem("favoriteDiagrams")) || {};
          favoriteDiagrams[diagram.id] = updatedFavorite;
          localStorage.setItem("favoriteDiagrams", JSON.stringify(favoriteDiagrams));
          
          return { ...diagram, favorite: updatedFavorite };
        }
        return diagram;
      });

      // Retorna o estado atualizado
      return updatedDiagrams;
    });
  }

  async function getDiagrams() {
    setLoading(true);
    try {
      const res = await api.get('/diagrams/diagramModels');
      const diagramsData = res.data.diagrams;

      const diagramsList = Object.keys(diagramsData).map(key => ({
        id: key,
        name: diagramsData[key].titulo,
        updatedAt: diagramsData[key].updatedAt,
        user_id: diagramsData[key].user_id,
        diagram_svg: diagramsData[key].diagram_svg,
        favorite: diagramsData[key].favorite,
        diagram_data: diagramsData[key].diagram_data
      }));

      const removedDiagrams = JSON.parse(localStorage.getItem("removedDiagrams")) || {};

      const filteredDiagrams = diagramsList.filter(diagram => removedDiagrams[diagram.id] !== false);

      setDiagrams(filteredDiagrams);
    } catch (error) {
      Toast('error', error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getDiagrams();
  }, [refresh]);

  function callRemoveDiagramModal(id) {
    const removedDiagrams = JSON.parse(localStorage.getItem("removedDiagrams")) || {};
    removedDiagrams[id] = false;
    localStorage.setItem("removedDiagrams", JSON.stringify(removedDiagrams));
    setDiagrams(prevDiagrams => prevDiagrams.filter(diagram => diagram.id !== id));
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
          <div
            className="cols-diagram"
            style={{
              minWidth: "100%"
            }}
          >
            {diagrams.slice(0, 4).map((diagram) => (
              <div
                key={diagram.id}
                className="col-12 col-md-4 col-lg-3 mb-3 row-components"
                style={{
                  minWidth: "25.5%"
                }}
              >
                <DiagramCard
                  id={diagram.id}
                  name={diagram.name}
                  userId={diagram.user_id}
                  isModel={true}
                  diagram_data={diagram.diagram_data}
                  thumbnail={diagram.diagram_svg}
                  onRemoveDiagram={(id) => callRemoveDiagramModal(id)}
                  favorited={diagram.favorite}
                  onDiagramFavorited={() => callFavoritedDiagram(diagram.id)} // Chama a função de favoritar
                />
              </div>
            ))}
          </div>
        )}
        {diagrams.length === 0 && !loading && (
          <h4 className="text-center mt-5">Ainda não há diagramas</h4>
        )}
      </div>

      <RemoveDiagramModal id="RemoveDiagramModal" diagram_id={selectedId} onDiagramRemoved={() => getDiagrams()} />
    </div>
  );

  return { resultcardModels, cardModels };
}

export default Modelos_documentos;
