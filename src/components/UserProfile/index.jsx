import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import api from "../../services/api";
import { Toast } from "../Toast";
import './style.scss';
import {avatarOptions } from '../../Consts';
import { Modal } from "bootstrap";
import ConfirmRemoveLoginModal from "../ConfirmRemoveLoginModal";
import RemoveLoginModal from "../RemoveLoginModal";

function UserProfile(props) {

    const [user, setUser] = useState({name: ''});
    const history   = useHistory();

    async function getUserData() {

        setUser(JSON.parse(localStorage.getItem('user')))

        // verificando usuário
        try {
            
            const response = await api.get('user');
	
			const {id, name, email, avatar} = response.data;

            localStorage.setItem('user', JSON.stringify({id, name, email, avatar}));
	
            setUser(JSON.parse(localStorage.getItem('user')))


        } catch (error) {
            if(error == "TypeError: Cannot read properties of undefined (reading 'status')"){
                Toast('error', "Falha na conexão ao servidor", "errorServer");
            }
            else{
                Toast('error', error, "errorCircle");
            }
            localStorage.removeItem('user');
            localStorage.removeItem('token');
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
        history.push(`/`);
    }

    useEffect(()=>{
        getUserData();
     },[])
    
    return (
            <div className="dropdown d-flex">

                <div id="profileImg" className="text-uppercase"> <img className="mb-4 img-fluid"src={avatarOptions[user.avatar-1]}></img> </div>
                
                {props.textColor === "white" ? 
                    <button className="btn px-2 pe-0 dropdown-toggle text-white" id="dropdownMenuButton" type="button" data-bs-toggle="dropdown" aria-expanded="false">  
                        <b> {user.name} </b> 
                    </button>
                : 
                    <button className="btn px-2 pe-0 dropdown-toggle" id="dropdownMenuButton" type="button" data-bs-toggle="dropdown" aria-expanded="false">  
                        <b> {user.name} </b> 
                    </button>
                }

            <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton">
                <li><Link className="dropdown-item" to="/dashboard/atualizarperfil"> Atualizar Perfil </Link></li>
                <li><Link className="dropdown-item" to="/dashboard/atualizarsenha"> Redefinir Senha </Link></li>
                <li><button className="dropdown-item" onClick={callRemoveLoginModal}> Excluir Perfil </button></li>
                <li><button className="dropdown-item" onClick={logout}> Sair </button> </li>
            </ul>

            <RemoveLoginModal id={"RemoveLoginModal"} onConfirmLoginRemoved={()=>{callConfirmRemoveLoginModal()}}/>
            <ConfirmRemoveLoginModal id={"ConfirmRemoveLoginModal"}/>
        </div>


    )
    
}

export default UserProfile;
