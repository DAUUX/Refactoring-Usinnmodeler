import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import VectorImage from "../../assets/icons/Vector.png";
import "./style.scss";

const ConfirmExitModal = () => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const confirmExit = () => {
      setShowModal(true);
      return false; // Retorna falso para permitir que a página seja desbloqueada quando o modal for exibido
    };
    const unblock = history.block(confirmExit);
    return () => {
      unblock();
    };
  }, [history]);

  const handleLeavePage = () => {
    setShowModal(false);
    const baseUrl = window.location.origin; // Obtém a URL base do site
    const targetUrl = `${baseUrl}/dashboard`; // Concatena a parte variável da URL
    window.location.href = targetUrl; // Redireciona o usuário para a URL construída
  };

  const LeavePage = () => {
    setShowModal(false);
    const baseUrl = window.location.origin; // Obtém a URL base do site
    const targetUrl = `${baseUrl}/dashboard`; // Concatena a parte variável da URL
    window.location.href = targetUrl; // Redireciona o usuário para a URL construída
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <>
          <div className="overlay"></div>
          <div className="confirm-exit-modal">
            <div className="close-button" onClick={closeModal}>
              <i className="bi bi-x-lg"></i>
            </div>
            <img src={VectorImage} alt="Imagem do Modal" className="image" />
            <p className="message">
              Você tem alterações não salvas.<br /> Deseja salvar antes de
              sair?
            </p>
            <div className="button-container">
              <button className="button leave-button" onClick={LeavePage}>
                Não
              </button>
              <button className="button save-button" onClick={handleLeavePage}>
                Sim
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ConfirmExitModal;

