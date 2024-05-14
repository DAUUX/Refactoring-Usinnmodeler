import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import VectorImage from "../../assets/icons/Vector.png";
import "./style.scss";

const ConfirmExitModal = () => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const [redirect, setRedirect] = useState("standard");

  useEffect(() => {
    const confirmExit = (nextLocation) => {
      if (nextLocation.pathname === "/") {
        setRedirect("/");
        setShowModal(true);
        return false;
      } else {
        setRedirect(nextLocation.pathname);
        setShowModal(true);
        return false;
      }
    };

    const unblock = history.block(confirmExit);
    return () => {
      unblock();
    };
  }, [history]);

  const logoutLeavePage = () => {
    const saveButton = document.getElementById("save");
    saveButton.click();
    setShowModal(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    const baseUrl = window.location.origin;
    const targetUrl = redirect === "/" ? `${baseUrl}/` : `${baseUrl}${redirect}`;
    window.location.href = targetUrl;
  };

  const LeavePage = () => {
    setShowModal(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    const baseUrl = window.location.origin;
    const targetUrl = redirect === "/" ? `${baseUrl}/` : `${baseUrl}${redirect}`;
    window.location.href = targetUrl;
  };

  const closeModal = () => {
    setShowModal(false);
  };

  window.onbeforeunload = () => {};

  return (
    <>
      {showModal && (
        <>
          <div className="overlay"></div>
          <div className="confirm-exit-modal">
            <div className="close-button" onClick={closeModal}>
              <i className="bi bi-x-lg" style={{marginBottom: '1vw'}}></i> {/* Adicionei estilo inline para ajustar a margem inferior do ícone */}
            </div>
            <img src={VectorImage} alt="Imagem do Modal" className="image" />
            <p className="message" style={{marginTop: '1vw'}}> {/* Adicionei estilo inline para ajustar a margem superior do texto */}
              Você tem alterações não salvas.<br /> Deseja salvar antes de
              sair?
            </p>
            <div className="button-container">
              <button className="button leave-button" onClick={LeavePage}>
                Não
              </button>
              <button className="button save-button" onClick={logoutLeavePage}>
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