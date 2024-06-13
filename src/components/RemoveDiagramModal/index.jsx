import { useState } from "react";
import { Toast } from "../Toast";
import api from "../../services/api";

function RemoveDiagramModal({id, diagram_id, onDiagramRemoved}) {

    const [loading, setLoading]   = useState(false);

    async function removeDiagram() {
        setLoading(true);

        try {
        
            await api.delete(`diagrams/${diagram_id}`);

            Toast('success', "O Diagrama foi excluído com sucesso", "delete");

            onDiagramRemoved();
        
        } catch (error) {
        
            if(error === "TypeError: Cannot read properties of undefined (reading 'status')"){
                Toast('error', "Falha na conexão ao servidor", "errorServer");
            }
            else{
                Toast('error', error, "aviso");
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
                        <h4 className="mb-5">Seu diagrama será excluído e você não terá mais acesso a ele!</h4>
                        <button className="btn btn-light text-primary border-dark me-3" disabled={loading} type="button" data-bs-dismiss="modal">Cancelar</button>
                        <button className="btn btn-primary" disabled={loading} onClick={removeDiagram} type="button" data-bs-dismiss="modal">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemoveDiagramModal;