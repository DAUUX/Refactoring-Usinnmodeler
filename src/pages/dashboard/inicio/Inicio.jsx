import UserProfile from "../../../components/UserProfile";
import Documents_inicio from './Documents_inicio'
import './style.scss'
import Notifications from "../../../components/Notifications"
import { useEffect } from "react";

function Inicio(){

    useEffect(() => {
        document.title = 'Início - USINN Modeler';
    },[]);

    const {resultcardModels, cardModels} = 0;
    const { resultcardRecentes, cardRecentes } = Documents_inicio();
    const Data = JSON.parse(localStorage.getItem('user'));

    return(        
    
    <div id="inicioPage" className="flex-fill ">
    
        <nav className="navbar navbar-expand-lg p-3 px-1 px-sm-3 justify-content-end">     
            <div className="container-fluid">
                <div className="d-flex align-items-center gap-2 ms-auto">
                    <Notifications/>
                    <UserProfile/>
                </div>
            </div>
        </nav>

  
        <nav className="container-fluid pt-0 pt-md-2">
            <div className="h4 text-center text-break">
                <b>Seja bem-vindo(a), {Data.name}!</b>
            </div>
            {resultcardModels && (
                <div className="px-md-5">
                    <h3 className="ps-4">Modelos de Diagramas</h3>
                    <div className="align-items-center">
                        {cardModels}
                    </div>
                </div>
            )}

            {resultcardRecentes && (
                <div className="px-md-0 mt-5">
                    <h3 className="ps-4">Documentos recentes</h3>
                    <div className="">
                        {cardRecentes}
                    </div>
                </div>
            )}
        </nav>



    </div>
    )
}

export default Inicio;
