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
  const [loading, setLoading] = useState(true);
  const socket = useSocket();
  const audioRef = useRef(new Audio(SoundNotification));

  useEffect(() => {getNotifications();},[])

  useEffect(() => {
    if (!socket) return;

    socket.on('notification_received', async (data) => {
      try {
        getNotifications()
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      } catch (err) {
        console.error('Erro ao reproduzir o áudio:', err);
      }
    });

    socket.on('notification_refresh', async (data) => {
      try {
        getNotifications()
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
      setNameDiagrams(res.data);
    } catch (error) {

      Toast('error', error, "errorCircle");
      
    }
    setLoading(false)
  };

  return (
    <div id="documentsPage" className="flex-fill h-100">
      <nav className="navbar navbar-expand-lg bg-white p-3 px-1 px-sm-3 justify-content-between">
        <div className="container-fluid">
          <div className="mb-0 h4">
            <b>Notificações</b>
          </div>
          <div className="d-flex align-items-center">
            <UserProfile />
          </div>
        </div>
      </nav>
      <div id="notification" aria-live="polite" className="pb-5">
        {nameDiagrams.length > 0 ? (
          nameDiagrams.map((item) => (
            <Link key={item.diagram_id} to={`${item.diagram_id}`} className="btn btn-default text-start w-100 d-flex align-items-center rounded-0">
              {item.unread_count > 0 && (
                <span className="bg-danger text-white p-1 px-2 rounded-2 fs-6">
                  {item.unread_count > 99 ? '99+' : item.unread_count}
                </span>
              )}
              <span className="d-flex align-items-center position-absolute ms-5" style={{"maxWidth":"65%"}}>
                <span className="fs-3 me-2"><i className="bi bi-diagram-2"></i></span>
                <span className="text-truncate">{item.diagram_name}</span>     
              </span>    
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
