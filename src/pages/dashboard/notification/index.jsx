import { useEffect, useRef, useState } from "react";
import UserProfile from "../../../components/UserProfile";
import { useSocket } from '../../../services/SocketContext'
import SoundNotification from '../../../assets/sound/soundNotification.mp3'
import api from "../../../services/api";
import { Toast } from "../../../components/Toast";
import './style.scss'
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner";

export default function Notification() {

  useEffect(() => {
    document.title = 'Notificações - USINN Modeler';
  },[]);

  const [nameDiagrams, setNameDiagrams] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();
  const audioRef = useRef(new Audio(SoundNotification));

  useEffect(() => {
    if (!socket) return;

    socket.on('notification_received', async (data) => {
      try {
        setUpdateTrigger(prev => !prev)
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      } catch (err) {
        console.error('Erro ao reproduzir o áudio:', err);
      }
    });

    socket.on('notification_refresh', async (data) => {
      try {
        setUpdateTrigger(prev => !prev)
      } catch (error) {
        console.log('Erro na ação com a notificação')
      }
    })

    return () => {
      socket.off('notification_received');
      socket.off('notification_refresh');
    };
  }, [socket]);

  const getNotifications = async () => {
    setLoading(true)
    const user_id = JSON.parse(localStorage.getItem('user')).id;
    
    try {
      const res = await api.get(`notification/diagrams/${user_id}`)
      console.log(res.data)
      setNameDiagrams(res.data);
    } catch (error) {
      if (error === "TypeError: Cannot read properties of undefined (reading 'status')") {
        Toast('error', "Falha na conexão ao servidor", "errorServer");
      } else {
        Toast('error', error, "errorCircle");
      }
    }
    setLoading(false)
  };
  
  useEffect(() => {
    getNotifications();
  }, [updateTrigger]);

  return (
    <div id="documentsPage" className="flex-fill h-100">
      <nav className="navbar navbar-expand-lg bg-white p-3 pe-1 justify-content-between">
        <div className="container-fluid">
          <div className="mb-0 h4">
            <b>Notificações</b>
          </div>
          <div className="d-flex align-items-center">
            <UserProfile />
          </div>
        </div>
      </nav>
      <div id="notification" aria-live="polite">
        {nameDiagrams.length > 0 ? (
          nameDiagrams.map((item) => (
            <Link key={item.diagram_id} to={`${item.diagram_id}`} className="btn btn-default text-start w-100 d-flex align-items-center rounded-0">
              <span className="fs-3 me-2"><i className="bi bi-diagram-2"></i></span>
              <span>{item.diagram_name}</span>     
            </Link>
          ))
        ) : (
          loading ? 
            <div className="col-12 d-flex mt-5 justify-content-center spinner">
              <Spinner className="spinner-border me-2" isLoading={loading}  />
            </div> 
            :
            <p className="h4 text-center mt-5">Não há notificações</p>
        )}
      </div>
    </div>
  );
}
