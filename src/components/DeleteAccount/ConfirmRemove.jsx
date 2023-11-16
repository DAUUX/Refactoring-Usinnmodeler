import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import 'simple-react-validator/dist/locale/pt';
import { Toast } from "../Toast";
import api from "../../services/api";

function RemoveLoginModal({email, onLoginRemoved}) {

    const [email, setEmail]       = useState('');


    async function removeLogin() {
        setLoading(true);

        try {
        
            await api.delete(`email/${setEmail}`);

            Toast('success', "Perfil removido com sucesso!");

            onLoginRemoved();
        
        } catch (error) {
        
            Toast('error', error);
        
        }

        setLoading(false);
    }

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-md modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body text-center px-4 pb-4">
                        <i className="bi bi-exclamation-triangle-fill mb-5 mt-3" style={{'fontSize': '60px'}}></i>
                        <h4 className="mb-5">Seu perfil será excluído !</h4>
                        <button className="btn btn-secondary me-3" disabled={loading} type="button" data-bs-dismiss="modal">Cancelar</button>
                        <button className="btn btn-primary" disabled={loading} onClick={removeLogin} type="button" data-bs-dismiss="modal">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemoveLoginModal;