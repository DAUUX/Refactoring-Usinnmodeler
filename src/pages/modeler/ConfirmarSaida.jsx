import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import VectorImage from "./Vector.png"; // Importe a imagem corretamente

const ConfirmarSaida = () => {
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
    //gastei um tempão tentando chamar a function salvar porem não é tão simples assim, por isso que fiz essa gamb
    const saveButton = document.getElementById("save"); //pega o botão save
    saveButton.click(); //clica nela

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

  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.5)",
    zIndex: "9999",
    maxWidth: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const overlayStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "9998",
  };

  const imageStyle = {
    display: "block",
    margin: "0 auto 40px",
    width: "50px",
    height: "auto",
  };

  const pStyle = {
    alignItems: "center",
    fontSize: "20px", // 60% do tamanho original (25px)
    marginBottom: "40px", // 60% do tamanho original (60px)
    marginTop: "0",
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center", // Centralizar o texto
  };
  
  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const buttonStyle = {
    fontSize: "16px",
    padding: "15px 30px",
    margin: "0 10px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    border: "none",
    outline: "none",
  };

  const saveButtonStyle = {
    ...buttonStyle,
    width: "200px",
    backgroundColor: "#007bff",
    color: "#ffffff",
  };

  const leaveButtonStyle = {
    ...buttonStyle,
    width: "200px",
    backgroundColor: "#f0f0f0",
    color: "#000000",
  };

  // Substituir o comportamento padrão do navegador
  window.onbeforeunload = () => {};

  return (
    <>
      {showModal && (
        <>
          <div style={overlayStyle}></div>
          <div style={modalStyle}>
            <img src={VectorImage} alt="Imagem do Modal" style={imageStyle} />{" "}
            {/* Utilize VectorImagem aqui */}
            <p style={pStyle}>Você tem alterações não salvas.<br/> Deseja salvar antes de sair?</p>
            <div style={buttonContainerStyle}>
              <button style={leaveButtonStyle} onClick={() => LeavePage()}>
                Sair
              </button>
              <button style={saveButtonStyle} onClick={() => handleLeavePage()}>
                Salvar e Sair
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ConfirmarSaida;
