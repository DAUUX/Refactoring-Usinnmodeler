import "./style.scss";
import { useEffect, useState } from "react";
import { Toast } from "../Toast";
import api from "../../services/api";
import AddUsersToInvite from "../AddUsersToInvite";
import { avatarOptions } from '../../Consts';

function ShareDiagramModal(props) {

    const [loading, setLoading]         = useState(false);
    const [readerLink, setReaderLink]   = useState('');
    const [editorLink, setEditorLink]   = useState('');
    const [open, setOpen]               = useState(false);
    const [copied, setCopied]           = useState(false);
    const [users, setUsers]             = useState([]); 
    const [quantidades, setQuantidades] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const [wasInvited, setWasInvited]       = useState(false);

    const adicionarComponente = () => {
        setQuantidades(prevQuantidades => [...prevQuantidades, 1]);        
    };    

    const addUser = (id, email, permission) => {    
        if (users.some(user => user.id === id)) {
            users[id] = {id, email, permission};
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
            setQuantidades([]);
        });
        
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
        
    },[open]); 

    async function inviteLink() {
        const usersInvited = users.filter(item => item.email.trim() !== '');
        if(usersInvited.length <= 0){
            return Toast('error', "Preencha o campo email")
        }
        setLoading(true);
        const link = {
            reader: readerLink,
            editor: editorLink
        }
        try {            
            await api.post(`share/${props.diagram_id}/inviteLink`, {link, usersInvited});  
            
            Toast('success', 'Diagrama compartilhado com sucesso!');
            setUsers([]);
            setQuantidades([]);
            setWasInvited(!wasInvited);
        } catch (error) {
        
            Toast('error', error);        
        }
                
        setLoading(false);
    }
    
    async function getShareLink(permission=1) {
        setLoading(true);

        try {
            const res = await api.post(`share/${props.diagram_id}`, {permission});

            const {token} = res.data;

            if(permission == 1){
                setReaderLink(`${window.location.origin}/shared/${token}`);
            } else {
                setEditorLink(`${window.location.origin}/shared/${token}`);
            }
            
        
        } catch (error) {
        
            Toast('error', error);
        
        }

        setLoading(false);
    }

    async function getAllCollaborations() {        
        try{
            const res = await api.get(`/collaboration/${props.diagram_id}/getAllCollaborationWithName`);
            setCollaborators(res.data.usersInviteds); 
        } catch(error) {
            Toast('error', error);
        }
    }

    async function updatePermission(user_id, updation) {
        try{
            if(updation == "StopShare"){
                await api.delete(`/collaboration/${props.diagram_id}/${user_id}`);   
                getAllCollaborations();                
            } else {
                await  api.put(`/collaboration/${props.diagram_id}/${user_id}`, {updation});
            }         
        } catch(error) {
            Toast('error', error);
        }
    }

    async function stopSharingForAll() {

        setLoading(true);
        
        try {
            
            setReaderLink('');
            setEditorLink('');
            await api.delete(`share/${props.diagram_id}`);
            
        } catch (error) {
            
            Toast('error', error);
            
        }

        setLoading(false);

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
        <div className="modal fade" id={props.id} tabIndex="-1" aria-labelledby="ShareDiagramModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="ShareDiagramModalLabel">Compartilhar diagrama</h4>
                        <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input type="hidden" id="link" className="form-control px-2" disabled value={!loading ? readerLink : 'Carregando...'} />    
                        <span>
                            {<AddUsersToInvite addUser={addUser} id={0} wasInvited={wasInvited} />}
                            {quantidades.map((_, index) => (
                                <span key={index}>
                                    <AddUsersToInvite addUser={addUser} id={quantidades.length} />
                                </span>
                            ))}
                        </span>
                        <div className="text-end">
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
                                            {collaborator.permission === 1 ? 
                                                <option value={1}>Leitor</option> : 
                                                <option value={2}>Editor</option>
                                            }
                                            {collaborator.permission === 1 ? 
                                                <option value={2}>Editor</option> : 
                                                <option value={1}>Leitor</option>
                                            }
                                            <option value={"StopShare"}>Parar compartilhamento</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>}
                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <button title="Copiar link" disabled={loading} className="btn text-primary" type="button" onClick={copy}> {!copied? 'Copiar link' : 'Copiado'}  </button>
                        <button title="Enviar" disabled={loading} className="btn bg-primary text-white" type="button" onClick={inviteLink}> Enviar </button>                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShareDiagramModal;