import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { Toast } from "../Toast";
import './style.scss';
import { Modal } from "bootstrap";
import ConfirmRemoveLoginModal from "../ConfirmRemoveLoginModal";
import RemoveLoginModal from "../RemoveLoginModal";

function UserProfile() {

    const [user, setUser] = useState({name: ''});
    const history   = useHistory();

    function getUserData() {

        setUser(JSON.parse(localStorage.getItem('user')))

        // verificando usuário
        try {
            
            api.get('user');

        } catch (error) {
            Toast('error', error);
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
        <>
            <div className="dropdown d-flex">

                <div id="profileImg" className="text-uppercase"> <span>{user.name.substring(0,1)}</span> </div>
                
                <button className="btn px-2 pe-0 dropdown-toggle" id="dropdownMenuButton" type="button" data-bs-toggle="dropdown" aria-expanded="false">  
                    <b> {user.name} </b>
                </button>

                <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton">
                    <li><button className="dropdown-item disabled"> Atualizar Perfil </button></li>
                    <li><button className="dropdown-item" onClick={callRemoveLoginModal}> Excluir Perfil </button></li>
                    <li><button className="dropdown-item" onClick={logout}> Sair </button> </li>
                </ul>
            </div>

            <RemoveLoginModal id={"RemoveLoginModal"} onConfirmLoginRemoved={()=>{callConfirmRemoveLoginModal()}}/>
            <ConfirmRemoveLoginModal id={"ConfirmRemoveLoginModal"}/>
        </>
    )
    
}

export default UserProfile;