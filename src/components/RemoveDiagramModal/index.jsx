import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import 'simple-react-validator/dist/locale/pt';
import { Toast } from "../Toast";
import api from "../../services/api";

function RemoveDiagramModal({id, diagram_id, onDiagramRemoved}) {

    const [loading, setLoading]   = useState(false);

    async function removeDiagram() {
        setLoading(true);

        try {
        
            await api.delete(`diagrams/${diagram_id}`);

            Toast('success', "Diagrama removido com sucesso!");

            onDiagramRemoved();
        
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
                        <i class="bi bi-exclamation-triangle-fill mb-5 mt-3" style={{'font-size': '60px'}}></i>
                        <h4 className="mb-5">Seu diagrama será excluído e você não terá mais acesso a ele!</h4>
                        <button className="btn btn-secondary me-3" disabled={loading} type="button" data-bs-dismiss="modal">Cancelar</button>
                        <button className="btn btn-primary" disabled={loading} onClick={removeDiagram} type="button" data-bs-dismiss="modal">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemoveDiagramModal;