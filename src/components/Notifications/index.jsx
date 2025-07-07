import { useEffect, useRef, useState } from "react";
import api from '../../services/api';
import { Toast } from '../Toast';
import './style.scss';
import { useSocket } from '../../services/SocketContext';
import SoundNotification from '../../assets/sound/soundNotification.mp3';
import { Modal } from 'bootstrap';
import { useTranslation } from 'react-i18next';

function Notifications({ iconColor }) {
  const socket = useSocket();

  const { t } = useTranslation();

  const [notifications, setNotifications] = useState([]);
  const [countNotify, setCountNotific] = useState(0);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const audioRef = useRef(new Audio(SoundNotification));
  const [mouseHover, setMouseHover] = useState(false);

  useEffect(() => { getNotifications(); }, [])

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
      } catch (err) {
        console.error('Erro ao contar notificações:', err);
      }
    });

    return () => {
      socket.off('notification_refresh');
      socket.off('notification_received');
    };
  }, [socket]);

  async function getNotifications() {
    const user_id = JSON.parse(localStorage.getItem('user')).id;

    try {
      const res = await api.get(`notification/${user_id}`);
      const resCount = await api.get(`notification/count/${user_id}`)
      setCountNotific(resCount.data.count)
      setNotifications(res.data);
    } catch (error) {

      Toast(t, 'error', error, "errorCircle");

    }
  }

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

  const handleRead = async (e, id, reader) => {
    e.stopPropagation();

    try {
      const user_id = JSON.parse(localStorage.getItem('user')).id;
      const changeRead = reader === 1 ? 0 : 1;
      await api.put(`notification/${id}`, { read: changeRead });
      await socket.emit('update_notification', user_id);
    } catch (error) {

      Toast(t, 'error', error, "errorCircle");

    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    try {
      const user_id = JSON.parse(localStorage.getItem('user')).id;
      await api.delete(`notification/${id}`);
      await socket.emit('update_notification', user_id);

      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id)
      );

      Toast(t, 'success', "A notificação foi excluída com sucesso!", "delete");
    } catch (error) {

      Toast(t, 'error', "Ocorreu um erro ao deletar a notificação! Tente novamente", "errorCircle");

    }
  };

  const openDeleteModal = (id) => {
    setSelectedNotificationId(id);
    const modal = new Modal('#ConfirmRemoveNotificationModal')
    modal.show();
  };

  return (
    <div className={`dropdown ${iconColor === 'text-white' ? 'outline-white' : 'outline-black'}`} id="dropdown-notification" data-bs-auto-close="false">
      <button
        className="btn btn-default p-0 dropdown-toggle no-arrow"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        aria-label="exibir ou esconder as notificações"
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
          notifications.map((item) => (
            <div
              key={item.id}
              className={`btn btn-default px-3 d-flex align-items-center rounded-0 cursor-default ${item.read === 1 && 'reader'}`}
              tabIndex={0}
              onMouseEnter={() => setMouseHover(item.id)}
              onMouseLeave={() => setMouseHover(null)}
              onFocus={() => setMouseHover(item.id)}
              title={t(item.message_key, item.message_variables)}
              style={{ height: '50px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <span>
                {item.type === 1 && <i className="bi bi-share"></i>}
                {item.type === 2 && <i className="bi bi-pencil"></i>}
                {item.type === 3 && <i className="bi bi-trash"></i>}
                {item.type === 4 && <i className="bi bi-box-arrow-left"></i>}
              </span>
              <p className="w-100 text-start text-truncate m-0 ps-2 pe-3">
                {t(item.message_key, {
                  ...item.message_variables,
                  translated_permission:
                    item.message_variables?.permission
                      ? t(`notification.diagram.permission.labels.${item.message_variables.permission}`)
                      : '',
                })}
              </p>
              {mouseHover === item.id ? (
                <span className="d-flex fs-6">
                  <button
                    className="btn btn-default p-0 px-2 text-white"
                    onClick={(e) => handleRead(e, item.id, item.read)}
                    aria-label={
                      item.read === 0
                        ? t('botão para marcar a notificação como lida')
                        : t('botão para marcar a notificação como não lida')
                    }
                  >
                    <i className={`bi ${item.read === 0 ? 'bi-envelope-open' : 'bi bi-envelope'}`}></i>
                  </button>
                  <button
                    className="btn btn-default p-0 px-2 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteModal(item.id);
                    }}
                    aria-label="botão para deletar a notificação"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </span>
              ) : (
                <span className="ps-0 ps-sm-4">{calcTemp(item.created_at)}</span>
              )}
            </div>
          ))
        ) : (
          <p className="h5 p-5 text-nowrap">{t("Não há notificações")}</p>
        )}
      </div>
      <div className="modal fade show" id="ConfirmRemoveNotificationModal" tabIndex="-1" data-bs-backdrop="true" data-bs-keyboard="true">
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center px-4 pb-4">
              <i className="bi bi-exclamation-triangle-fill mb-5 mt-3 text-black" style={{ fontSize: "60px" }}></i>
              <h2 className="mb-5 h4 text-black">{t("A notificação selecionada será excluída!")}</h2>
              <div className="d-flex justify-content-around">
                <button
                  className="btn btn-light text-primary border border-black px-4 px-sm-5"
                  data-bs-dismiss="modal"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t("Cancelar")}
                </button>
                <button
                  className="btn btn-primary px-4 px-sm-5"
                  onClick={(e) => { e.stopPropagation(); handleDelete(e, selectedNotificationId) }}
                  data-bs-dismiss="modal"
                >
                  {t("Confirmar")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
