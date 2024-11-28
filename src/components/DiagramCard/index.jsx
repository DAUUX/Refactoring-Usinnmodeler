import { Link, useNavigate } from 'react-router-dom';
import { slugify } from '../../Helpers';
import './style.scss';
import FavoriteDiagram from "../../components/FavoriteDiagram";
import api from '../../services/api';
import { Toast } from '../Toast';

function DiagramCard({id, name, lastModified, thumbnail, userId, onShareDiagram, onRemoveDiagram, onRenameDiagram, favorited, onDiagramFavorited, isModel = false, diagram_data = ""}) {


    const navigate   = useNavigate();

    function elapsedTime (date) {
        let now = new Date();
        let difference = now - new Date(date);
        return Math.round(difference /(1000 * 60 * 60 * 24));
    }
    
    async function createNewDiagram() {

        const data = {name: 'Novo diagrama', diagram_data: diagram_data, diagram_svg: ""};
    
        try {
            const res = await api.post('diagrams', data);
            const {id, name} = res.data;
            navigate(`/modeler/${id}/${slugify(name)}`);
        } catch (error) {
            if(error === "TypeError: Cannot read properties of undefined (reading 'status')"){
                Toast('error', "Falha na conexão ao servidor", "errorServer");
            }
            else{
                Toast('error', error, "errorCircle");
            }
        }
    } 
    
    return (
        <Link
            to={isModel ? undefined : `/modeler/${id}/${slugify(name)}`}
            onClick={isModel ? () => { createNewDiagram() } : undefined}
            className="card text-reset text-decoration-none mw-25 overflow-hidden"
            id="diagram-card"
        >
            <div className="card-header d-flex">
                <div className={`overflow-hidden ${isModel ? 'd-flex align-items-center' : ''}`}>
                    <span className="fw-bold">{name}</span><br />
                    
                    {!isModel && (
                        <span>
                            Modificado {elapsedTime(lastModified) > 0 ? `há ${elapsedTime(lastModified)} dias` : "hoje"}
                        </span>
                    )}
                </div>
    
                <div 
                    className="dropdown ms-auto d-flex ps-3 align-items-center"
                    onClick={(e) => e.stopPropagation()} // Impede que o clique no dropdown afete o Link
                >
                    <div className='pb-1'>
                        <FavoriteDiagram 
                            diagram_id={id} 
                            favorited={favorited} 
                            onFavoritedClick={() => {
                                onDiagramFavorited();
                            }} 
                        />
                    </div>
    
                    <button 
                        className="btn px-2 pe-0 dropdown-toggle" 
                        type="button" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                    >
                        <i className="bi bi-three-dots-vertical"></i>
                    </button>
    
                    <ul className="dropdown-menu">
                        {!isModel && (
                            <li>
                                <button 
                                    className="dropdown-item" 
                                    onClick={(e) => { 
                                        e.stopPropagation(); 
                                        e.preventDefault(); 
                                        onRenameDiagram(id); 
                                    }}
                                >
                                    <i className="bi bi-pencil"></i> Renomear
                                </button>
                            </li>
                        )}
    
                        {(userId === JSON.parse(localStorage.getItem('user')).id && !isModel) && (
                            <li>
                                <button 
                                    className="dropdown-item" 
                                    onClick={(e) => { 
                                        e.stopPropagation(); 
                                        e.preventDefault(); 
                                        onShareDiagram(id); 
                                    }}
                                >
                                    <i className="bi bi-share-fill"></i> Compartilhar
                                </button>
                            </li>
                        )}
    
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    e.preventDefault(); 
                                    onRemoveDiagram(id); 
                                }}
                            >
                                <i className="bi bi-trash3-fill"></i> Excluir
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
    
            <div className="card-body p-3">
                {thumbnail.includes('.svg') ? (
                    <img className="w-100" src={`${process.env.REACT_APP_API_URL}${thumbnail}`} alt="Thumbnail do diagrama" />
                ) : null}
            </div>
        </Link>
    );
    
}

export default DiagramCard;