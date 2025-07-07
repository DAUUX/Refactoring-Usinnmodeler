import { useState } from "react";
import { Toast } from "../Toast";
import api from "../../services/api";
import { useTranslation } from 'react-i18next';
import { useSocket } from "../../services/SocketContext";

function RemoveDiagramModal({id, diagram_id, onDiagramRemoved}) {
    const socket = useSocket();
    const { t } = useTranslation();

    const [loading, setLoading]   = useState(false);

    async function removeDiagram() {
        setLoading(true);

        try {
            
            const resDiagram = await api.get(`diagrams/${diagram_id}`)
            const id_owner = resDiagram.data.user_id
            const owner = id_owner === JSON.parse(localStorage.getItem('user')).id

            await api.delete(`diagrams/${diagram_id}`)

            const name_user = JSON.parse(localStorage.getItem('user')).name
            const name_diagram = resDiagram.data.name
            const resCollaborator = await api.get(`collaboration/${diagram_id}`)
            const user_ids = resCollaborator.data.collaborators.map(collaborator => collaborator.collaborator_id)

           if (owner) {
                await api.post('notification', {
                    user_id: user_ids,
                    diagram_id: diagram_id,
                    diagram_name: name_diagram,
                    type: 3,
                    message_key: 'notification.diagram.deleted.shared',
                    message_variables: {
                        name_user,
                        name_diagram
                    }
                });
                await socket.emit('send_notification', user_ids);
            
            }else{
                await api.post('notification', {
                    user_id: id_owner,
                    diagram_id: diagram_id,
                    diagram_name: name_diagram,
                    type: 4,
                    message_key: 'notification.diagram.removed.collaboration',
                    message_variables: {
                        name_user,
                        name_diagram
                    }
                });
                await socket.emit('send_notification', id_owner);

            }  
    
            Toast(t, 'success', "O Diagrama foi excluído com sucesso", "delete");

            onDiagramRemoved();
        
        } catch (error) {
        
            if(error === "TypeError: Cannot read properties of undefined (reading 'status')"){
                Toast(t, 'error', "Falha na conexão ao servidor", "errorServer");
            }
            else{
                Toast(t, 'error', error, "aviso");
            }
        
        }

        setLoading(false);
    }

    return (
        <div className="modal fade" id={id} tabIndex="-1">
            <div className="modal-dialog modal-md modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body text-center px-4 pb-4">
                        <i className="bi bi-exclamation-triangle-fill mb-5 mt-3" style={{'fontSize': '60px'}}></i>
                        <h4 className="mb-5">{t("Seu diagrama será excluído e você não terá mais acesso a ele!")}</h4>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-light text-primary border-dark px-4 px-sm-5" disabled={loading} type="button" data-bs-dismiss="modal">{t("Cancelar")}</button>
                            <button className="btn btn-primary px-4 px-sm-5" disabled={loading} onClick={removeDiagram} type="button" data-bs-dismiss="modal">{t("Confirmar")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemoveDiagramModal;