
import { useState } from "react";
import UserProfile from "../../../components/UserProfile";
import Documents_inicio from './Documents_inicio'
import Modelos_documentos from './Modelos_documentos'
import { Toast } from "../../../components/Toast";
import api from "../../../services/api";
import './style.scss'
import Notifications from "../../../components/Notifications"
import { useEffect } from "react";

function Inicio(){

    useEffect(() => {
        document.title = 'Início - USINN Modeler';
    },[]);

    const { resultcardRecentes, cardRecentes } = Documents_inicio();

    const [modalOptions, setModalOptions] = useState(false);
    const toggleModalOptions = () => setModalOptions(!modalOptions);

    const [refreshModels, setRefreshModels] = useState(false);
    function forceRefresh() {
        setRefreshModels(!refreshModels); 
    }

    const {resultcardModels, cardModels} = Modelos_documentos({ refresh: refreshModels, forceRefresh:forceRefresh });
    
    const Data = JSON.parse(localStorage.getItem('user'));
    async function clearRemovedDiagrams() {
        await api.delete("/user/preferences")
        Toast("success", "Diagramas Recuperados com sucesso.", "checkCircle");
        forceRefresh(); 
    }


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
                <div className="px-md-0 mt-5 resultcardModels">
                    <div className="d-flex justify-content-between">
                        <h3 className="ps-4">Modelos de Diagrama</h3>
                        <div className="pe-4">
                            <button className="options-dropdown pe-1" onClick={()=>toggleModalOptions()}>
                                <i class="bi bi-three-dots fs-1"></i>
                                {modalOptions && (
                                <div className="d-flex dropdown-models">
                                    <span onClick={()=>clearRemovedDiagrams()+toggleModalOptions()} onMouseLeave={()=>toggleModalOptions()}  className="">
                                        Desfazer ocultação
                                    </span>
                                </div>
                            )}
                            </button>
                        </div>
                    </div>
                    <div className=" resultcardModels-cards">
                        {cardModels}
                    </div>
                </div>
            )}

            {resultcardRecentes && (
                <div className="px-md-0 mt-5 resultcardModels">
                    <div className="d-flex justify-content-between">
                        <h3 className="ps-4">Documentos recentes</h3>
                        {!resultcardModels && (                        <div className="pe-4">
                                <button className="options-dropdown pe-1" onClick={()=>toggleModalOptions()}>
                                    <i class="bi bi-three-dots fs-1"></i>
                                    {modalOptions && (
                                    <div className="d-flex dropdown-models">
                                        <span onClick={()=>clearRemovedDiagrams()+toggleModalOptions()} onMouseLeave={()=>toggleModalOptions()}  className="">
                                            Desfazer ocultação
                                        </span>
                                    </div>
                                )}
                                </button>
                            </div>)}
                    </div>
                    
                    <div className="">
                        {cardRecentes}
                    </div>
                </div>
            )}
        </nav>

        {!resultcardModels && !resultcardRecentes &&(
            <div className="px-md-3 mt-5 resultcardModels">
                    <div className="d-flex justify-content-between">
                    <h3 className="ps-4">Modelos de Diagrama</h3>
                    <div className="pe-4">
                        <button className="options-dropdown pe-1" onClick={()=>toggleModalOptions()}>
                            <i class="bi bi-three-dots fs-1"></i>
                            {modalOptions && (
                            <div className="d-flex dropdown-models">
                                <span onClick={()=>clearRemovedDiagrams()+toggleModalOptions()} onMouseLeave={()=>toggleModalOptions()}  className="">
                                    Desfazer ocultação
                                </span>
                            </div>
                        )}
                        </button>
                    </div>
                </div>
                </div>
            )}



    </div>
    )
}

export default Inicio;

