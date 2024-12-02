import { useState, useEffect } from "react";
import DiagramCard from "../../../components/DiagramCardModel";
import Spinner from "../../../components/Spinner";
import { Toast } from "../../../components/Toast";
import api from "../../../services/api";

function Modelos_documentos({ refresh }) {
  let [diagrams, setDiagrams] = useState([]);
  let [loading, setLoading] = useState(true);

  async function getDiagrams() {
    setLoading(true);
    try {
      const res = await api.get('/diagrams/diagramModels');
      const diagramsData = res.data.diagrams;
  
      const removedDiagrams = JSON.parse(localStorage.getItem("removedDiagrams")) || {};
  
      // Mapeia os diagramas, ajustando o campo 'favorite' com base no localStorage
      const diagramsList = Object.keys(diagramsData).map(key => ({
        id: key,
        name: diagramsData[key].titulo,
        updatedAt: diagramsData[key].updatedAt,
        user_id: diagramsData[key].user_id,
        diagram_svg: diagramsData[key].diagram_svg,
        favorite: diagramsData[key],
        diagram_data: diagramsData[key].diagram_data
      }));
  
      // Filtra diagramas que não estão marcados como removidos
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
                  diagram_data={diagram.diagram_data}
                  thumbnail={diagram.diagram_svg}
                  onRemoveDiagram={(id) => callRemoveDiagramModal(id)}
                  setDiagrams={setDiagrams}
                />
              </div>
            ))}
          </div>
        )}
        {diagrams.length === 0 && !loading && (
          <h4 className="text-center mt-5">Ainda não há diagramas</h4>
        )}
      </div>

    </div>
  );

  return { resultcardModels, cardModels };
}

export default Modelos_documentos;
