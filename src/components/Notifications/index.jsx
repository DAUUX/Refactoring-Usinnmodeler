import { useEffect, useRef, useState } from "react";
import api from '../../services/api'
import { Toast } from '../Toast'
import './style.scss'
import { useSocket } from '../../services/SocketContext'
import SoundNotification from '../../assets/sound/soundNotification.mp3'

function Notifications({iconColor}) {
  const socket = useSocket();

  const [notifications, setNotifications] = useState([])
  const [countNotify, setCountNotify] = useState(0)
  const [updateTrigger, setUpdateTrigger] = useState(false)
  const audioRef = useRef(new Audio(SoundNotification));

  useEffect(() => {
    if (!socket) return;

    const user_id = JSON.parse(localStorage.getItem('user')).id

    socket.on('notification_update', async (data) => {
      if (data.user_id === user_id) {
        setUpdateTrigger(prev => !prev);
        try {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          await audioRef.current.play();
        } catch (err) {
          console.error('Erro ao reproduzir o áudio:', err);
        }
      }
    });

    return () => {
      socket.off('notification_update');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

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

  async function getNotifications() {
    const user_id = JSON.parse(localStorage.getItem('user')).id

    try{
        const res = await api.get(`notification/${user_id}`);
        setNotifications(res.data);
    } catch(error){
      if(error === "TypeError: Cannot read properties of undefined (reading 'status')"){
        Toast('error', "Falha na conexão ao servidor", "errorServer");
      }
      else{
        Toast('error', error, "errorCircle");
      }
    }
  }

  async function handleDeleteNotific(e, id){
    e.stopPropagation()

    try {
      await api.delete(`notification/${id}`)
      setUpdateTrigger(prev => !prev);
    } catch (error) {
      if(error === "TypeError: Cannot read properties of undefined (reading 'status')"){
        Toast('error', "Falha na conexão ao servidor", "errorServer");
      }
      else{
        Toast('error', error, "errorCircle");
      }
    }
  }

  useEffect(()=>{
    getNotifications();
  },[updateTrigger])

  useEffect(() => {
    setCountNotify(notifications.length)
  },[notifications])

  return (
    <div className={`dropdown mt-1 ${iconColor === 'text-white' ? 'outline-white' : 'outline-black'}`} id="droptdown-notification">
      <button
        className="btn btn-default p-0 dropdown-toggle no-arrow"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className={`bi bi-bell fs-3 ${iconColor}`}></i>

        {countNotify > 0 &&
          <span id="countNotific" className="bg-danger text-white rounded-circle d-flex justify-content-center align-items-center">
            {countNotify > 99 ? '99' : countNotify}
          </span>
        }     
      </button>
      
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      {notifications.length > 0 ? (
          notifications.map((item) => {
            return (
              <button key={item.id} className="btn btn-default px-3 w-100 d-flex align-items-center rounded-0" tabIndex={0} onClick={(e) => handleDeleteNotific(e, item.id)} title={item.message}>
                <span>
                  {item.type === 1 && <i className="bi bi-share"></i>}
                  {item.type === 2 && <i className="bi bi-pencil"></i>}
                </span>
                <span className="w-100 text-start text-truncate ps-2 pe-3">{item.message}</span>
                <span>{calcTemp(item.created_at)}</span>
              </button>
            );
          })
        ) : (
          <p className="h5 p-5 text-nowrap">Não há notificações</p>
        )}
      </div>
    </div>
  );
}

export default Notifications;
