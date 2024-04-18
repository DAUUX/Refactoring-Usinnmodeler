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
      //Se o usuário sair para "/"
      if (nextLocation.pathname === "/") { //Redireciona para a home, o usuário quer sair
        setRedirect("/")
        setShowModal(true);
        return false; // Retorna falso para bloquear a navegação
      }else{
        setRedirect(nextLocation.pathname)
        //Qualquer saída
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
    if(redirect === "/"){ //Estava indo para /
      const saveButton = document.getElementById("save"); //pega o botão save
      saveButton.click(); //clica nela
      setShowModal(false);
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      const baseUrl = window.location.origin; // Obtém a URL base do site
      const targetUrl = `${baseUrl}/`; // Concatena a parte variável da URL
      window.location.href = targetUrl; // Redireciona o usuário para a URL construída
    }else{ //saída padrão
      const saveButton = document.getElementById("save"); //pega o botão save
      saveButton.click(); //clica nela
      setShowModal(false);
      const baseUrl = window.location.origin; // Obtém a URL base do site
      const targetUrl = `${baseUrl}${redirect}`; // Concatena a parte variável da URL
      window.location.href = targetUrl; // Redireciona o usuário para a URL construída
    }
  };

  const LeavePage = () => {
    if(redirect === "/"){ //Estava indo para /
      setShowModal(false);
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      const baseUrl = window.location.origin; // Obtém a URL base do site
      const targetUrl = `${baseUrl}/`; // Concatena a parte variável da URL
      window.location.href = targetUrl; // Redireciona o usuário para a URL construída
    }else{ //Saida padrão
      setShowModal(false);
      const baseUrl = window.location.origin; // Obtém a URL base do site
      const targetUrl = `${baseUrl}${redirect}`; // Concatena a parte variável da URL
      window.location.href = targetUrl; // Redireciona o usuário para a URL construída
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Substituir o comportamento padrão do navegador
  window.onbeforeunload = () => {};

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

