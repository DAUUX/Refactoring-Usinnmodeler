import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { slugify } from "../../Helpers";
import api from "../../services/api";
import { Toast } from "../Toast";
import { useSocket } from "../../services/SocketContext";

const ShareRoute = (props) => {
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
                await api.post('notification', {user_id: diagram.user_id, diagram_id: diagram.id, diagram_name: diagram.name, type: 1, message: `"${name}" se tornou um colaborado do diagrama: "${diagram.name}"`})

                if (socket?.connected) {
                    await socket.emit('send_notification', diagram.user_id);
                } else {
                    socket.once('connect', () => {
                        socket.emit('send_notification', diagram.user_id);
                    });
                }
            }        

        } catch (error) {
        
            if(error === "TypeError: Cannot read properties of undefined (reading 'status')"){
                Toast('error', "Falha na conexão ao servidor", "errorServer");
            }
            else{
                Toast('error', error, "errorCircle");
            }
        
        }

        navigate(`/modeler${diagram.id ? '/'+diagram.id+'/'+slugify(diagram.name) : ''}`);

    }

    useEffect(() => {
        if (socket) {
            if (socket.connected) {
                setIsSocketReady(true);
            } else {
                socket.once('connect', () => {
                    setIsSocketReady(true);
                });
            }
        }
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