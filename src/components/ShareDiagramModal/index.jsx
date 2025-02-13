import "./style.scss";
import { useEffect, useState } from "react";
import { Toast } from "../Toast";
import api from "../../services/api";
import AddUsersToInvite from "../AddUsersToInvite";
import { avatarOptions } from '../../Consts';
import { useSocket } from "../../services/SocketContext";

function ShareDiagramModal(props) {
    const socket = useSocket()

    const [loading, setLoading]         = useState(false);
    const [readerLink, setReaderLink]   = useState('');
    const [editorLink, setEditorLink]   = useState('');
    const [open, setOpen]               = useState(false);
    const [copied, setCopied]           = useState(false);
    const [users, setUsers]             = useState([]); 
    const [componentes, setComponentes] = useState([0]);
    const [collaborators, setCollaborators] = useState([]);
    const [wasInvited, setWasInvited]       = useState(false);    
    const [compID, setCompID] = useState(1)

    useEffect(() => {
        if (!socket) return;
    
        socket.on('component_refresh', async (data) => {
          try {
            await getAllCollaborations(data.diagram_id);
          } catch (error) {
            console.log('Erro ao atualizar componente')
          }
        })
    
        return () => {
          socket.off('component_refresh');
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    const adicionarComponente = () => {
        setComponentes([...componentes, compID]);        
        setCompID(compID + 1) 
    };

    const removerComponente = (id) => {
        setComponentes(componentes.filter((removeID) => removeID !== id));
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    };

    const addUser = (id, email, permission) => {    
        const existingUser = users.find(user => user.id === id);
        if (existingUser) {
            const updatedUsers = users.map(user =>
                user.id === id ? { ...user, email, permission } : user
            );
        setUsers(updatedUsers);
        } else{
            if(email !=  null && email !== ''){
                setUsers(prevUsers => [...prevUsers, {id: id, email: email, permission: permission }]);
            }   
        }                   
    };
    
    useEffect(()=>{

        document.getElementById(props.id).addEventListener('show.bs.modal', event => {
            setOpen(true);
        });

        document.getElementById(props.id).addEventListener('hidden.bs.modal', event => {
            setOpen(false);
            setUsers([]);
            setComponentes([0]);
        });
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{

        if (open) {
            getShareLink();
            getShareLink(2);
            getAllCollaborations();
        } else {
            setReaderLink('');
            setEditorLink('');
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[open]); 

    async function inviteLink() {        
        let usersInvited = users.filter(item => item.email.trim() !== '');
        if(usersInvited.length <= 0){
            return Toast('error', "Preencha o campo email", "errorCircle")
        }
        setLoading(true);
        const link = {
            reader: readerLink,
            editor: editorLink
        }
        try {            
            const collaborator_id = JSON.parse(localStorage.getItem('user')).id
            const collaborator_name = JSON.parse(localStorage.getItem('user')).name

            const res = await api.get(`diagrams/${props.diagram_id}`);
            const {name} = res.data

            const params = new URLSearchParams();
            params.append('emails', usersInvited.map(user => user.email));     
            const response = await api.get(`user/idForEmail?${params.toString()}`);
            let user_ids = response.data.filter(id => id !== collaborator_id);
            
            await api.post(`share/${props.diagram_id}/inviteLink`, {link, usersInvited});
            
            const collaborators = await api.get(`collaboration/${props.diagram_id}`)
            const existing_collaborators = collaborators.data.collaborators.map(collaborator => collaborator.collaborator_id);
            user_ids = user_ids.filter(id => !existing_collaborators.includes(id));

            await api.post('notification', {user_id: user_ids, diagram_id: props.diagram_id, diagram_name: name, type: 1, message: `"${collaborator_name}" compartilhou o diagrama: "${name}". Cheque seu e-mail!`})
            await socket.emit('send_notification', user_ids);
            
            Toast('success', 'Diagrama compartilhado com sucesso!', "share");
            setUsers([]);
            setComponentes([0]);
            setWasInvited(!wasInvited);
        } catch (error) {

            Toast('error', error, "aviso");
      
        }
                
        setLoading(false);
    }
    
    async function getShareLink(permission=1) {
        setLoading(true);

        try {
            const res = await api.post(`share/${props.diagram_id}`, {permission});

            const {token} = res.data;

            if(permission === 1){
                setReaderLink(`${window.location.origin}/shared/${token}`);
            } else {
                setEditorLink(`${window.location.origin}/shared/${token}`);
            }
            
        
        } catch (error) {

            Toast('error', error, "errorCircle");

        }

        setLoading(false);
    }

    async function getAllCollaborations(diagram_id) {   
        
        diagram_id = diagram_id === undefined ? props.diagram_id : diagram_id 
        
        try{
            const res = await api.get(`/collaboration/${diagram_id}/getAllCollaborationWithName`);
            setCollaborators(res.data.usersInviteds); 
        } catch(error) {
            Toast('error', error, "errorCircle");      
        }
    }

    async function updatePermission(user_id, updation) {
        try{
            const collaborator_name = JSON.parse(localStorage.getItem('user')).name
            const res = await api.get(`diagrams/${props.diagram_id}`);
            const {name} = res.data

            if(updation === "StopShare"){
                await api.delete(`/collaboration/${props.diagram_id}/${user_id}`);
                await api.post('notification', {user_id: user_id, diagram_id: props.diagram_id, diagram_name: name, type: 1, message: `"${collaborator_name}" parou de compartilhar o diagrama: "${name}"`})     
                await socket.emit('send_notification', user_id);    
                getAllCollaborations();                
            } else {
                await api.put(`/collaboration/${props.diagram_id}/${user_id}`, {updation});
                await api.post('notification', {user_id: user_id, diagram_id: props.diagram_id, diagram_name: name, type: 1, message: `"${collaborator_name}" deu permissão de ${updation === '1' ? 'leitor' : 'editor'} no: "${name}"`})   
                await socket.emit('send_notification', user_id);
            }       
            getAllCollaborations();  
        } catch(error) {

            Toast('error', error, "errorCircle");
            
        }
    }

    function copy() {

        /* Get the text field */
        let readerLink = document.getElementById("link").value;
        let listener = function(ev) {
            ev.clipboardData.setData("text/plain", readerLink);
            ev.preventDefault();
        };
        document.addEventListener("copy", listener);
        document.execCommand("copy");
        document.removeEventListener("copy", listener);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, "2000");

    }

    return (
        <div className="modal fade" id={props.id} tabIndex="-1" aria-labelledby="ShareDiagramModalLabel">
            <div className="modal-dialog modal-lg modal-dialog-centered text-dark">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="ShareDiagramModalLabel">Compartilhar diagrama</h4>
                        <button id="closeModal" type="button" className="btn-close p-0" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-2 p-sm-4" id="modal-compartilhar">
                        <input type="hidden" id="link" className="form-control px-2" disabled value={!loading ? readerLink : 'Carregando...'} />    
                        
                        {componentes.map((id) => (
                            <AddUsersToInvite key={id} addUser={addUser} id={id} visibleButton={componentes.length > 1} onDelete={removerComponente} wasInvited={wasInvited}/> 
                        ))}
                        
                        <div className="text-end outline-black">
                            <button title="Adicionar E-mail" disabled={loading} className="btn text-primary border border-primary py-2 px-3" type="button" onClick={adicionarComponente}> + </button>  
                        </div>
                        {(collaborators.length > 0) && 
                        <div >
                            <h5>Compartilhado com</h5>
                            <br/>
                            {collaborators.map((collaborator, index) => (                                
                                <div className="row mb-3" key={index}>  
                                    <div className="col-9">
                                        <div className="">
                                            <img id="img-perfil" src={avatarOptions[collaborator.avatar-1]} alt="Imagem de perfil"/>
                                            <span className="ps-2">{collaborator.email}</span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <select className="form-select" onChange={(e)=>{updatePermission(collaborator.id, e.target.value)}}>
                                                <option value="" hidden>
                                                    {collaborator.permission === 1 ? 
                                                        <option value={1}>Leitor</option> : 
                                                        <option value={2}>Editor</option>
                                                    }
                                                </option>
                                                <option value={2}>Editor</option>  
                                                <option value={1}>Leitor</option>
                                            <option value={"StopShare"}>Parar compartilhamento</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>}
                    </div>
                    <div className="modal-footer d-flex justify-content-between outline-black">
                        <button title="Copiar link" disabled={loading} className="btn text-primary border-dark px-4" type="button" onClick={copy}> {!copied? 'Copiar link' : 'Copiado'}  </button>
                        <button title="Enviar" disabled={loading} className="btn bg-primary text-white px-4 px-sm-5" type="button" onClick={inviteLink}> Enviar </button>                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShareDiagramModal;