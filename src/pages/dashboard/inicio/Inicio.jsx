import UserProfile from "../../../components/UserProfile";
import Documents_inicio from './Documents_inicio'
import Modelos_documentos from './Modelos_documentos'
import './style.scss'

function Inicio(){
    const { resultcardRecentes, cardRecentes } = Documents_inicio();

    const {resultcardModels, cardModels} = Modelos_documentos();
    const Data = JSON.parse(localStorage.getItem('user'));

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
                <div className="px-md-0 mt-5">
                    <h3 className="ps-4">Modelos de Diagramas</h3>
                    <div className="">
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

export default Inicio;