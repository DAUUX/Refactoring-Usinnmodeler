import UserProfile from "../../../components/UserProfile";
import Documents_inicio from './Documents_inicio'
import './style.scss'

function Inicio(){
    const { result, card } = Documents_inicio();
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

        { result &&( 
        <nav className="container-fluid  px-5">
                <div className="px-4">
                    <h3 className="ps-4">Documentos recentes</h3>
                    <div className="align-items-center">
                        {card}
                    </div>
                </div>
            <div className="container text-start px-5">
                <div class="row">
                    <div className="col">
                        <h3 >Notificações</h3>
                        <div className="container">
                        
                        </div>
                    </div>

                    <div className="col">
                        <h3>Documentação da Notação</h3>
                        <div className="container">
                        
                        </div>
                    </div>
                    </div>
            </div>
        </nav>
        )}

    </div>
    )
}

export default Inicio;
