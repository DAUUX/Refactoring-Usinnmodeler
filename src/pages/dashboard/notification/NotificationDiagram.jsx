import { useEffect, useRef, useState } from "react";
import UserProfile from "../../../components/UserProfile";
import { useSocket } from '../../../services/SocketContext'
import SoundNotification from '../../../assets/sound/soundNotification.mp3'
import api from "../../../services/api";
import { Toast } from "../../../components/Toast";
import './style.scss'
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { Modal } from 'bootstrap';

const NotificationItem = ({ item, onDelete, onModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const socket = useSocket();
  const containerRef = useRef(null);

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
    } catch (error) {

      Toast('error', error, "errorCircle");
      
    }
  }

  const handleBlur = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.relatedTarget)) {
      setIsHovered(false);
    }
  };

  return (
    <div className={`not-item fs-5 bg-white fw-bold btn-default px-3 d-flex align-items-center rounded-0 border-bottom border-black cursor-default position-relative ${item.read === 1 && 'reader'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={handleBlur}
      tabIndex={0}
      ref={containerRef}
    >
      <span>
        {item.type === 1 && <i className="bi bi-share"></i>}
        {item.type === 2 && <i className="bi bi-pencil"></i>}
        {item.type === 3 && <i className="bi bi-trash"></i>}
        {item.type === 4 && <i className="bi bi-box-arrow-left"></i>}
      </span>

      <p className="w-100 text-break m-0 ps-2 pe-3">{item.message}</p>

      <div className={`d-flex ${isHovered ? 'visible' : 'invisible'}`}>
        <button className="btn btn-default p-0 text-white" onClick={() => handleRead(item.id, item.read)} aria-label={item.read === 0 ? 'botão para marcar a notificação como lida' : 'botão para marcar a notificação como não lida'}>
          <i className={`bi ${item.read === 0 ? 'bi-envelope-open' : 'bi bi-envelope'}`}></i>
        </button>
        <button
          className="btn btn-default p-0 text-white" onClick={() => {onDelete(); onModal();}} aria-label="botão para excluir a notificação">
          <i className="bi bi-trash"></i>
        </button>
      </div>

      <span className={`position-absolute ${isHovered ? 'd-none' : 'd-block'}`} style={{"right": "15px" }}>
        {calcTemp(item.created_at)}
      </span>
    </div>
  );
};

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);

  const socket = useSocket();
  const audioRef = useRef(new Audio(SoundNotification));
  const navigate = useNavigate()

  const { id } = useParams()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {getNotifications();},[])

  const handleDelete = async (id) => {
    try {
      const user_id = JSON.parse(localStorage.getItem('user')).id;
      await api.delete(`notification/${id}`);
      await socket.emit('update_notification', user_id);
      
      if (notifications.length <= 1) {
        navigate("/dashboard/notification");
      }

      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id)
      );

      Toast('success', "A notificação foi excluída com sucesso!", "delete");

    } catch (error) {

      Toast('error', "Ocorreu um erro ao deletar a notificação! Tente novamente", "errorCircle");
      
    }
  };

  const openDeleteModal = (id) => {
    setSelectedNotificationId(id);
  };

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const getNotifications = async () => {
    setLoading(true)
    const user_id = JSON.parse(localStorage.getItem('user')).id;

    try {
      const res = await api.get(`notification/notificationDiagram/${user_id}/${id}`)
      setNotifications(res.data);
    } catch (error) {
      if(error === "Nenhuma notificação encontrada"){
        navigate('/dashboard/notification')
      }else {
        Toast('error', error, "errorCircle");
      }
    }
    setLoading(false)
  };  

  const filteredNotifications = notifications.filter((item) => {
    if (filter === "read") return item.read === 1;
    if (filter === "unread") return item.read === 0;
    return true;
  });

  function callRemoveNotificationModal() {
    const modal = new Modal('#ConfirmRemoveNotificationModal')          
    modal.show();
  }

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
      <div id="notification" className="px-2 px-sm-4 my-4" aria-live="polite">

        <div className="btn-group rounded-0 rounded-top rounded-lg overflow-hidden" role="group">
          <button className={`btn teste fs-6 px-2 rounded-0 ${filter === 'all' && 'bg-primary text-white active'}`} onClick={() => setFilter("all")}>Todas as notificações</button>
          <button className={`btn teste fs-6 px-2 rounded-0 ${filter === 'read' && 'bg-primary text-white active'}`} onClick={() => setFilter("read")}>Notificações lidas</button>
          <button className={`btn teste fs-6 px-2 rounded-0 ${filter === 'unread' && 'bg-primary text-white active'}`} onClick={() => setFilter("unread")}>Notificações não lidas</button>
        </div>

        {filteredNotifications.length > 0 ? (
          <div id="notificationList" className="border border-black rounded-bottom rounded-end rounded-lg overflow-hidden">
            {filteredNotifications.map((item) => (
              <NotificationItem
                key={item.id}
                item={item}
                notifications={notifications}
                onDelete={() => openDeleteModal(item.id)}
                onModal={callRemoveNotificationModal}
              />
            ))}
            <div className="modal fade show" id="ConfirmRemoveNotificationModal" tabIndex="-1" data-bs-backdrop="true" data-bs-keyboard="true">
              <div className="modal-dialog modal-md modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body text-center px-4 pb-4">
                    <i className="bi bi-exclamation-triangle-fill mb-5 mt-3" style={{ fontSize: "60px" }}></i>
                    <h4 className="mb-5">A notificação selecionada será excluída!</h4>
                    <div className="d-flex justify-content-around">
                      <button className="btn btn-light text-primary border border-black px-4 px-sm-5" disabled={loading} data-bs-dismiss="modal">Cancelar</button>
                      <button
                        className="btn btn-primary px-4 px-sm-5"
                        onClick={() => handleDelete(selectedNotificationId)}
                        disabled={loading}
                        data-bs-dismiss="modal"
                      >
                        Confirmar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          loading ? (
            <div className="col-12 d-flex mt-5 justify-content-center spinner">
              <Spinner className="spinner-border me-2" isLoading={loading}  />
            </div>
          ) : (
            <h1 className="h3 border border-black text-center py-5 bg-white rounded-bottom rounded-end rounded-lg">
              {filter === 'read' ? 'Não há notificações lidas' : 'Todas as notificações foram lidas'}
            </h1>
          )
        )}
      </div>
    </div>
  );
}
