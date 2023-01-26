import DiagramCard from "../../../components/DiagramCard";
import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import MyDocuments  from "./MyDocuments";
import SharedDocuments from "./SharedDocuments";

function Documents() {
    let match = useRouteMatch();
    return (
        <div className="flex-fill h-100">
            {/* NavBar aqui */}
            <nav class="navbar navbar-expand-lg bg-white p-3 justify-content-between">
                <div class="container-fluid">
                    <div class="mb-0 h4">
                        <b>Documentos</b>
                    </div>
                    <div class="dropdown d-flex ">
                        
                        <img class="rounded-circle" src="https://www.shopveterinario.com.br/blog/wp-content/uploads/2019/02/urol%C3%ADtiase-em-c%C3%A3es-artigo.jpg"
                                alt="Perfil" width="40px" height="40px"/>
                        <button class="btn px-2 pe-0 dropdown-toggle" id="dropdownMenuButton" type="button" data-bs-toggle="dropdown" aria-expanded="false">  
                                <b> Perfil de Usuário</b>
                        </button>

                        <ul class="dropdown-menu " aria-labelledby="dropdownMenuButton">
                            <li><a class="dropdown-item" href="#">  Atualizar Perfil</a></li>
                            <li><a class="dropdown-item" href="#">  Sair</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            
            <div>
                <ul class="nav nav-tabs h5 bold pt-3">
                    <li class="nav-item">
                        <b><u>
                            <Link to={`${match.url}`} className="text-dark d-block fs-5 text-decoration-none px-4 py-4">
                                Meus documentos
                            </Link> 
                        </u></b>
                    </li>
                    <li class="nav-item">
                        <Link to={`${match.url}/compartilhados`} className="text-dark d-block fs-5 text-decoration-none px-4 py-4">
                            Compartilhados comigo
                        </Link> 

                    </li>
                </ul>
            </div>
            <br/>

            {/* Tabs aqui, dentro das tabs o container */}
            
            <Switch>
                <Route path={`${match.path}/compartilhados`}>
                    <SharedDocuments/>
                </Route>
                <Route path={match.path}>
                    <MyDocuments/>
                </Route>
            </Switch>
           

                
        </div>
    )
}

export default Documents;