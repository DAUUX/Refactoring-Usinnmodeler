import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { Toast } from "../Toast";
import { useTranslation } from 'react-i18next'
import { useSocket } from "../../services/SocketContext";

const ShareRoute = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { token } = useParams();
    const socket = useSocket()
    const [isSocketReady, setIsSocketReady] = useState(false);

    async function getSharedDiagram() {

        let diagram = null;

        try {
        
            const res = await api.post(`collaboration/${token}`);

            diagram = res.data.diagram ? res.data.diagram : res.data;

            if(res.data.existingCollaboration === null){
                const name = JSON.parse(localStorage.getItem('user')).name
                await api.post('notification', {
                        user_id: diagram.user_id,
                        diagram_id: diagram.id,
                        diagram_name: diagram.name,
                        type: 1,
                        message_key: 'notification.diagram.collaboration',
                        message_variables: {
                            collaborator_name: name,
                            diagram_name: diagram.name,
                        }
                    });
                if (socket?.connected) {
                    await socket.emit('send_notification', diagram.user_id, diagram.id);
                } else {
                    socket.once('connect', async () => {
                        await socket.emit('send_notification', diagram.user_id, diagram.id);
                    });
                }
            }        

        } catch (error) {
        
            if(error === "TypeError: Cannot read properties of undefined (reading 'status')"){
                Toast(t, 'error', "Falha na conexão ao servidor", "errorServer");
            }
            else{
                Toast(t, 'error', error, "errorCircle");
            }
        
        }

        navigate(`/modeler${diagram.id ? '/'+diagram.id : ''}`);

    }

    useEffect(() => {
        if (socket) {
            if (socket.connected) {
                setIsSocketReady(true);
            } else {
                const timeout = setTimeout(() => {
                    if (!socket.connected) {
                        Toast(t,'error', 'Falha na conexão ou servidor!', "errorWifi");
                        navigate('/login')
                    }
                }, 2000);
                socket.once('connect', () => {
                    clearTimeout(timeout);
                    setIsSocketReady(true);
                });
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    useEffect(() => {
        if (isSocketReady) {
            getSharedDiagram();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSocketReady]);

    return null;

};

export default ShareRoute;