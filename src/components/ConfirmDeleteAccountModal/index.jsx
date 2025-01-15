import { React, useState } from "react";
import { Toast } from "../Toast";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function ConfirmRemoveLoginModal({id}) {

    const [loading, setLoading] = useState(false);
    const navigate               = useNavigate();

    async function removeLogin() {
        setLoading(true);

        try {
        
            await api.delete('user');
            Toast('success', "Perfil removido com sucesso!", "checkCircle");
            navigate(`/login`);
        
        } catch (error) {
        
            Toast('error', error, "errorCircle");
        
        }

        setLoading(false);
    }

    return (
        <div className="modal fade" id={id} tabIndex="-1">
            <div className="modal-dialog modal-md modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body text-center px-4 pb-4">
                        <i className="bi bi-exclamation-triangle-fill mb-5 mt-3" style={{'fontSize': '60px'}}></i>
                        <h4 className="mb-5">Seu perfil será excluído !</h4>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-primary px-4 px-sm-5" disabled={loading} type="button" data-bs-dismiss="modal">Cancelar</button>
                            <button className="btn btn-danger px-4 px-sm-5" disabled={loading} onClick={removeLogin} type="button" data-bs-dismiss="modal">Confirmar</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRemoveLoginModal;