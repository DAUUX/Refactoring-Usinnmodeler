import { React, useState } from "react";
import { Toast } from "../Toast";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function ConfirmRemoveLoginModal({id}) {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const navigate               = useNavigate();

    async function removeLogin() {
        setLoading(true);

        try {
        
            await api.delete('user');
            Toast(t, 'success', "Perfil removido com sucesso!", "checkCircle");
            navigate(`/login`);
        
        } catch (error) {
        
            if(error === "TypeError: Cannot read properties of undefined (reading 'status')"){
                Toast(t, 'error', "Falha na conexão ao servidor", "errorServer");
            }
            else{
                Toast(t, 'error', error, "errorCircle");
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
                        <h4 className="mb-5">{t("Seu perfil será excluído !")}</h4>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-primary px-4 px-sm-5" disabled={loading} type="button" data-bs-dismiss="modal">{t("Cancelar")}</button>
                            <button className="btn btn-danger px-4 px-sm-5" disabled={loading} onClick={removeLogin} type="button" data-bs-dismiss="modal">{t("Confirmar")}</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRemoveLoginModal;