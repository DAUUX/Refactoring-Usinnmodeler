import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

const ConfirmarSaida = () => {
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            // Se o modal estiver aberto, não exibe a mensagem de confirmação ao sair da págin
                event.preventDefault();
                event.returnValue = ''; // Retorna uma string vazia para desativar a mensagem de confirmação
        };

        const confirmExit = () => {
            setShowModal(true);
            return false; // Retorna falso para permitir que a página seja desbloqueada quando o modal for exibido
        };
        const unblock = history.block(confirmExit);
        return () => {
            unblock();
        };
        
        window.addEventListener('beforeunload', handleBeforeUnload);

    }, [history]);

    const handleLeavePage = () => {
        setShowModal(false);
        const baseUrl = window.location.origin; // Obtém a URL base do site
        const targetUrl = `${baseUrl}/dashboard/documentos`; // Concatena a parte variável da URL
        window.location.href = targetUrl; // Redireciona o usuário para a URL construída
    };

    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
        zIndex: '9999',
    };

    return (
        <>
            {showModal && (
                <div style={modalStyle}>
                    <p>Tem certeza que deseja sair sem salvar?</p>
                    <div>
                        <button onClick={handleLeavePage}>Sim</button>
                        <button onClick={() => setShowModal(false)}>Cancelar</button>
                    </div>
                </div>
            )}

        </>
    );
};

export default ConfirmarSaida;
