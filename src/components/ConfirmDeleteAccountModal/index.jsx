import { React, useState } from "react";
import { Toast } from "../Toast";
import api from "../../services/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ConfirmRemoveLoginModal({id}) {

    const [loading, setLoading] = useState(false);
    const history               = useHistory();

    async function removeLogin() {
        setLoading(true);

        try {
        
            await api.delete('user');
            Toast('success', "Perfil removido com sucesso!", "checkCircle");
            history.push(`/login`);
        
        } catch (error) {
        
            if(error === "TypeError: Cannot read properties of undefined (reading 'status')"){
                Toast('error', "Falha na conexão ao servidor", "errorServer");
            }
            else{
                Toast('error', error, "errorCircle");
            }
        
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
                        <div className="d-flex justify-content-center gap-sm-1 gap-md-2 gap-lg-3">
                            <button className="btn btn-primary" disabled={loading} type="button" data-bs-dismiss="modal">Cancelar</button>
                            <button className="btn btn-danger" disabled={loading} onClick={removeLogin} type="button" data-bs-dismiss="modal">Confirmar</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRemoveLoginModal;