import React, { useEffect } from 'react';

import "./style.scss";

function PasswordConfirmation({ setConfirmPassModal, handleConfirmPasswordChange }) {

    useEffect(() => {
        // Add a classe "modal-open" 
        document.body.classList.add('modal-open');

        return () => {// Remove a classe "modal-open"
            document.body.classList.remove('modal-open');
        };
    }, []); // [] = executado uma vez


    return(
        <div className='modal-open'>
          <div className="overlay"></div>{/* fundo */}

          <div className="confirm-exit-modal">

            <i className="bi bi-exclamation-triangle-fill tamanho" ></i>
            
            <p className="message">
            Sua senha será redefinida
            </p>

            <div className="button-container gap-3 gap-sm-5">
              <button type="button" className="btn py-3 px-4 px-sm-5 btn-light  text-primary border-dark" onClick={() => setConfirmPassModal(false)}>
               Cancelar
              </button>
              <button type="button" className="btn py-3 px-4 px-sm-5 btn-primary save-button " onClick={() => { handleConfirmPasswordChange(); setConfirmPassModal(false)}}>
               Confirmar
              </button>
            </div>
          </div>
        </div>
    );
}

export default PasswordConfirmation;
