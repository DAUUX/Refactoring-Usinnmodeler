import { useEffect, useRef, useState } from "react";
import UserProfile from "../../../components/UserProfile";
import { useSocket } from '../../../services/SocketContext'
import SoundNotification from '../../../assets/sound/soundNotification.mp3'
import api from "../../../services/api";
import { Toast } from "../../../components/Toast";
import './style.scss'
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";

const NotificationItem = ({ item, onUpdate, notifications }) => {
  const [isHovered, setIsHovered] = useState(false);
  const socket = useSocket();
  const navigate = useNavigate()

  const calcTemp = (date) => {
    const adjustedDate = new Date(new Date(date).getTime() - 3 * 60 * 60 * 1000);
    
    const diffInMilliseconds = new Date().getTime() - adjustedDate.getTime();
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInYears >= 1) {
      return `${diffInYears}a`;
    } else if (diffInMonths >= 1) {
      return `${diffInMonths}M`;
    } else if (diffInDays >= 1) {
      return `${diffInDays}d`;
    } else if (diffInHours >= 1) {
      return `${diffInHours}h`;
    } else if (diffInMinutes >= 1) {
      return `${diffInMinutes}m`;
    } else {
      return `agora`;
    }
  };

  const handleRead = async (id, reader) => {
    try {
      const user_id = JSON.parse(localStorage.getItem('user')).id
      const changeRead = reader === 1 ? 0 : 1
      await api.put(`notification/${id}`, { read: changeRead })
      await socket.emit('update_notification', user_id);
      onUpdate();
    } catch (error) {
      if(error === "TypeError: Cannot read properties of undefined (reading 'status')"){
        Toast('error', "Falha na conexão ao servidor", "errorServer");
      }
      else{
        Toast('error', error, "errorCircle");
      }
    }
  }

  const handleDelete = async (id) => {
    try {
      const user_id = JSON.parse(localStorage.getItem('user')).id
      await api.delete(`notification/${id}`)
      await socket.emit('update_notification', user_id);

      if(notifications.length <= 1){
        navigate("/dashboard/notification")
      }

      onUpdate();
    } catch (error) {
      if(error === "TypeError: Cannot read properties of undefined (reading 'status')"){
        Toast('error', "Falha na conexão ao servidor", "errorServer");
      }
      else{
        Toast('error', error, "errorCircle");
      }
    }
  }

  return (
    <div className={`fs-5 btn btn-default px-3 d-flex align-items-center rounded-0 border-0 border-bottom border-black cursor-default ${item.read === 1 && 'reader'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      tabIndex={0}
    >
      <span>
        {item.type === 1 && <i className="bi bi-share"></i>}
        {item.type === 2 && <i className="bi bi-pencil"></i>}
        {item.type === 3 && <i className="bi bi-trash"></i>}
      </span>
      <span className="w-100 text-start text-truncate ps-2 pe-3">{item.message}</span>
      {isHovered && (
        <span className="d-flex gap-3">
          <button className="btn btn-default p-0 px-3 text-white" onClick={() => handleRead(item.id, item.read)}>
            <i className={`bi ${item.read === 0 ? 'bi-envelope-open' : 'bi bi-envelope'}`}></i>
          </button>
          <button className="btn btn-default p-0 px-3 text-white" onClick={() => handleDelete(item.id)}><i className="bi bi-trash"></i></button>
        </span>
      )}
      {!isHovered && <span>{calcTemp(item.created_at)}</span>}
    </div>
  );
};

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();
  const audioRef = useRef(new Audio(SoundNotification));
  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    if (!socket) return;

    const user_id = JSON.parse(localStorage.getItem('user')).id

    socket.on('notification_received', async (data) => {
      if (data.user_id === user_id) {
        try {
          setUpdateTrigger(prev => !prev)
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          await audioRef.current.play();
        } catch (err) {
          console.error('Erro ao reproduzir o áudio:', err);
        }
      }
    });

    socket.on('notification_refresh', async (data) => {
      if(data.user_id === user_id){
        try {
          setUpdateTrigger(prev => !prev)
        } catch (error) {
          console.log('Erro na ação com a notificação')
        }
      }
    })

    return () => {
      socket.off('notification_received');
      socket.off('notification_refresh');
    };
  }, [socket]);

  useEffect(() => {
    getNotifications();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTrigger]);

  const getNotifications = async () => {
    setLoading(true)
    const user_id = JSON.parse(localStorage.getItem('user')).id;

    try {
      const res = await api.get(`notification/notificationDiagram/${user_id}/${id}`)
      setNotifications(res.data);
    } catch (error) {
      if (error === "TypeError: Cannot read properties of undefined (reading 'status')") {
        Toast('error', "Falha na conexão ao servidor", "errorServer");
      }else if(error === "Nenhuma notificação encontrada"){
        Toast('error', error, "errorCircle");
        navigate('/dashboard/notification')
      }else {
        Toast('error', error, "errorCircle");
      }
    }

    setLoading(false)
  };

  const handleUpdate = () => {
    setUpdateTrigger(prev => !prev);
  };

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
        {notifications.length > 0 ? (
          notifications.map((item) => (
            <NotificationItem key={item.id} item={item} notifications={notifications} onUpdate={handleUpdate} />
          ))
        ) : (
          loading && 
            <div className="col-12 d-flex mt-5 justify-content-center spinner">
              <Spinner className="spinner-border me-2" isLoading={loading}  />
            </div> 
        )}
      </div>
    </div>
  );
}
