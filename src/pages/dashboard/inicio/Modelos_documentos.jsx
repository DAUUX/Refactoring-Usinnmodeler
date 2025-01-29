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
        // Faz a requisição para obter os diagramas
        const res = await api.get('/diagrams/diagramModels');
        const diagramsData = res.data.diagrams;

        // Envia a requisição para obter as preferências do usuário
        const diagramUser = await api.get(`/user/preferences`);

        // Obtém os diagramas removidos do localStorage
        const removedDiagrams = JSON.parse(localStorage.getItem("removedDiagrams")) || {};

        // Mapeia os diagramas, ajustando o campo 'favorite' e 'favorited' com base nas preferências do usuário
        const diagramsList = Object.keys(diagramsData).map(key => {
            const diagram = diagramsData[key];

            // Verifica se o diagrama tem uma preferência de 'favorited' ou 'oculto' do usuário
            const userPreferences = diagramUser.data || {};
            let favoriteStatus = userPreferences[key] ? userPreferences[key].favorited : false;
            const ocultoStatus = userPreferences[key] ? userPreferences[key].oculto : false;

            return {
                id: key,
                name: diagram.titulo,
                updatedAt: diagram.updatedAt,
                user_id: diagram.user_id,
                diagram_svg: diagram.diagram_svg,
                favorite: favoriteStatus, // Ajusta com base na preferência 'favorited'
                diagram_data: diagram.diagram_data,
                oculto_data: ocultoStatus, // Ajusta com base na preferência 'oculto'
            };
        });
  
        // Filtra os diagramas removidos (eles não devem aparecer na lista)
        const filteredDiagrams = diagramsList.filter(diagram => !removedDiagrams[diagram.id]);
  
        // Atualiza o estado com os diagramas filtrados
        setDiagrams(filteredDiagrams);
    } catch (error) {
        // Exibe uma mensagem de erro
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
                  favorited_data={diagram.favorite}
                  oculto_data={diagram.oculto_data}
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
