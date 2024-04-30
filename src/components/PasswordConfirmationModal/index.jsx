import React from 'react';
import "./style.scss";

function PasswordConfirmation({ setConfirmPassModal, handleConfirmPasswordChange }) {

    return(
        <>
          <div className="overlay"></div>{/* fundo */}

          <div className="confirm-exit-modal">

            <i className="bi bi-exclamation-triangle-fill tamanho" ></i>
            
            <p className="message">
            Sua senha será redefinida
            </p>
            <div className="button-container">
              <button className="button leave-button  text-primary" onClick={() => setConfirmPassModal(false)}>
               Cancelar
              </button>
              <button className="button save-button" onClick={() => (handleConfirmPasswordChange(), setConfirmPassModal(false))}>
               Confirmar
              </button>
            </div>
          </div>
        </>
    );
}

export default PasswordConfirmation;
