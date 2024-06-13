import UserProfile from "../../../components/UserProfile";
import Documents_inicio from './Documents_inicio'
import './style.scss'

function Inicio(){
    const {resultcardModels, cardModels} = 0;
    const { resultcardRecentes, cardRecentes } = Documents_inicio();
    const Data = JSON.parse(localStorage.getItem('user'));

    return(        
    
    <div id="inicioPage" className="flex-fill h-100">
    
        <nav className="navbar navbar-expand-lg p-3">
            <div className="container-fluid ">
                <div className="h4 mx-auto pt-3">
                    <b>Seja bem-vindo(a), {Data.name}!</b>
                </div>
                <UserProfile/>
            </div>
        </nav>

  
        <nav className="container-fluid pt-4">
            {resultcardModels && (
                <div className="px-md-5">
                    <h3 className="ps-4">Modelos de Diagramas</h3>
                    <div className="align-items-center">
                        {cardModels}
                    </div>
                </div>
            )}

            {resultcardRecentes && (
                <div className=" px-md-5 mt-5">
                    <h3 className="ps-4">Documentos recentes</h3>
                    <div className="align-items-center">
                        {cardRecentes}
                    </div>
                </div>
            )}
        </nav>



    </div>
    )
}

export default Inicio;
