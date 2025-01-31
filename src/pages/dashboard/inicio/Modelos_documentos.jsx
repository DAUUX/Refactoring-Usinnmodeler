import { useState, useEffect } from "react";
import DiagramCard from "../../../components/DiagramCardModel";
import Spinner from "../../../components/Spinner";
import { Toast } from "../../../components/Toast";
import api from "../../../services/api";

function Modelos_documentos({ refresh, forceRefresh, onlyFavorited="false" }) {
  let [diagrams, setDiagrams] = useState([]);

  async function getDiagrams() {
  try {
    // Faz a requisição para obter os diagramas
    const res = await api.get('/diagrams/diagramModels');
    const diagramsData = res.data.diagrams;

    // Envia a requisição para obter as preferências do usuário
    const diagramUser = await api.get(`/user/preferences`);

    // Obtém os diagramas removidos do localStorage
    const removedDiagrams = JSON.parse(localStorage.getItem("removedDiagrams")) || {};

    // Mapeia os diagramas, ajustando o campo 'favorite' e 'favorited' com base nas preferências do usuário
    let diagramsList = Object.keys(diagramsData)
      .filter(key => {
        const userPreferences = diagramUser.data || {};
        const ocultoStatus = userPreferences[key]?.oculto || "false";
        return ocultoStatus !== "true"; // Filtra os diagramas que NÃO são ocultos
      })
      .map(key => {
        const diagram = diagramsData[key];
        const userPreferences = diagramUser.data || {};
        const favoriteStatus = userPreferences[key]?.favorited || "false"; // Garante que sempre será "true" ou "false"

        return {
          id: key,
          name: diagram.titulo,
          updatedAt: diagram.updatedAt,
          user_id: diagram.user_id,
          diagram_svg: diagram.diagram_svg,
          favorite: favoriteStatus,
          diagram_data: diagram.diagram_data,
          oculto_data: userPreferences[key]?.oculto || "false",
        };
      });

    // Aplica o filtro de favoritos se onlyFavorited for true
    if (onlyFavorited==="true") {
      diagramsList = diagramsList.filter(diagram => diagram.favorite === "true");
    }

    // Ordena os favoritos primeiro
    diagramsList.sort((a, b) => (b.favorite === "true" ? 1 : 0) - (a.favorite === "true" ? 1 : 0));

    // Filtra os diagramas removidos (eles não devem aparecer na lista)
    const filteredDiagrams = diagramsList.filter(diagram => !removedDiagrams[diagram.id]);

    // Atualiza o estado com os diagramas filtrados
    setDiagrams(filteredDiagrams);
  } catch (error) {
    // Exibe uma mensagem de erro
    Toast('error', error);
  }
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
    <div className="container-fluid">
      <div className="row">

        {diagrams.length > 0  && (
          <div
            className="cols-diagram"
            style={{
              minWidth: "100%"
            }}
          >
            {diagrams.slice(0, 4).map((diagram) => (
              <>
              {!(diagram.oculto_data === "true") &&
                (
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
                  refresh={forceRefresh}
                />

              </div>
              )}
              </>
            ))}
          </div>
        )}
        {diagrams.length === 0 && (
          <h4 className="text-center mt-5">Ainda não há diagramas</h4>
        )}
      </div>

    </div>
  );

  return { resultcardModels, cardModels };
}

export default Modelos_documentos;
