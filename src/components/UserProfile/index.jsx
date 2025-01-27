import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { Toast } from "../Toast";
import './style.scss';
import {avatarOptions } from '../../Consts';
import { Modal } from "bootstrap";
import ConfirmRemoveLoginModal from "../ConfirmDeleteAccountModal";
import RemoveLoginModal from "../DeleteAccountModal";

function UserProfile(props) {

    const [user, setUser] = useState({name: ''});
    const navigate   = useNavigate();

    async function getUserData() {

        setUser(JSON.parse(localStorage.getItem('user')))

        // verificando usuário
        try {
            
            const response = await api.get('user');
	
			const {id, name, email, avatar} = response.data;

            localStorage.setItem('user', JSON.stringify({id, name, email, avatar}));
	
            setUser(JSON.parse(localStorage.getItem('user')))


        } catch (error) {
            
            Toast('error', error, "errorCircle");
            
        }
        
    }


    function callConfirmRemoveLoginModal() {
        const modal = new Modal('#ConfirmRemoveLoginModal')          
        modal.show();
    }
    function callRemoveLoginModal() {
        const modal = new Modal('#RemoveLoginModal')          
        modal.show();
    }

    function logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate(`/login`);
    }

    useEffect(()=>{
        getUserData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[])
    
    return (
            <div className={`dropdown d-flex ${props.textColor === "white" ? 'outline-white' : 'outline-black'}`}>

                <div id="profileImg" className="d-flex align-items-center"> <img className="img-fluid"src={avatarOptions[user.avatar-1]} alt=""></img> </div>
                
                <button className={`btn px-2 pe-0 dropdown-toggle d-flex align-items-center ${props.textColor === "white" && 'text-white'}`} id="dropdownMenuButton" type="button" data-bs-toggle="dropdown" aria-expanded="false">  
                    <b className="text-truncate d-inline-block">{user.name}</b>
                </button>  

            <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton">
                <li><Link className="dropdown-item d-flex align-items-center" to="/dashboard/atualizarperfil"> Atualizar Perfil </Link></li>
                <li><Link className="dropdown-item d-flex align-items-center" to="/dashboard/atualizarsenha"> Redefinir Senha </Link></li>
                <li><button className="dropdown-item" onClick={callRemoveLoginModal}> Excluir Perfil </button></li>
                <li><button className="dropdown-item" onClick={logout}> Sair </button> </li>
            </ul>

            <RemoveLoginModal id={"RemoveLoginModal"} onConfirmLoginRemoved={()=>{callConfirmRemoveLoginModal()}}/>
            <ConfirmRemoveLoginModal id={"ConfirmRemoveLoginModal"}/>
        
        </div>


    )

}

export default UserProfile;

