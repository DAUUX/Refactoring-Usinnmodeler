import { useState } from "react";
import UserProfile from "../../../components/UserProfile";
import Documents_inicio from './Documents_inicio'
import Modelos_documentos from './Modelos_documentos'
import './style.scss'

function Inicio(){
    const { resultcardRecentes, cardRecentes } = Documents_inicio();

    const [modalOptions, setModalOptions] = useState(false);
    const toggleModalOptions = () => setModalOptions(!modalOptions);

    const [refreshModels, setRefreshModels] = useState(false);
    function forceRefresh() {
        setRefreshModels(!refreshModels); 
    }

    const {resultcardModels, cardModels} = Modelos_documentos({ refresh: refreshModels });
    const Data = JSON.parse(localStorage.getItem('user'));

    function clearRemovedDiagrams() {
      localStorage.removeItem("removedDiagrams");
      forceRefresh(); 
    }


    return(        
    
    <div id="inicioPage" className="flex-fill ">
    
        <nav className="navbar navbar-expand-lg p-3 justify-content-end ">    
                
                <div className="h3 text-center pt-2 w-100">
                    <b>Seja bem-vindo(a), {Data.name}!</b>
                </div> 
                
                <div className="d-flex ">
                    <UserProfile />
                </div>
        </nav>

        <nav className="container-fluid pt-0 pt-md-2">
            {resultcardModels && (
                <div className="px-md-0 mt-5 resultcardModels">
                    <div className="d-flex justify-content-between">
                        <h3 className="ps-4">Modelos de Diagramas</h3>
                        <div className="pe-4">
                            <button className="options-dropdown pe-1" onMouseEnter={()=>setModalOptions(true)} onMouseLeave={()=>setModalOptions(false)}>
                                <i class="bi bi-three-dots fs-1"></i>
                                {modalOptions && (
                                <div className="d-flex dropdown-models">
                                    <span onClick={()=>clearRemovedDiagrams()+toggleModalOptions()} className="">
                                        Desfazer ocultação
                                    </span>
                                </div>
                            )}
                            </button>
                        </div>
                    </div>
                    <div className="">
                        {cardModels}
                    </div>
                </div>
            )}

            {resultcardRecentes && (
                <div className="px-md-0 mt-5 resultcardModels">
                    <div className="d-flex justify-content-between">
                        <h3 className="ps-4">Documentos recentes</h3>
                        {!resultcardModels && (                        <div className="pe-4">
                                <button className="options-dropdown pe-1" onMouseEnter={()=>setModalOptions(true)} onMouseLeave={()=>setModalOptions(false)}>
                                    <i class="bi bi-three-dots fs-1"></i>
                                    {modalOptions && (
                                    <div className="d-flex dropdown-models">
                                        <span onClick={()=>clearRemovedDiagrams()+toggleModalOptions()} className="">
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



    </div>
    )
}

export default Inicio;