import { Link } from 'react-router-dom';
import { slugify } from '../../Helpers';
import './style.scss';
import FavoriteDiagram from "../../components/FavoriteDiagram";

const link = process.env.REACT_APP_API_URL == "http://localhost:8080/api/" ? process.env.REACT_APP_API_URL : process.env.RAILWAY_VOLUME_MOUNT_PATH + '/'

function DiagramCard({id, name, lastModified, thumbnail, userId, onShareDiagram, onRemoveDiagram, onRenameDiagram, favorited, onDiagramFavorited}) {

    function elapsedTime (date) {
        let now = new Date();
        let difference = now - new Date(date);
        return Math.round(difference /(1000 * 60 * 60 * 24));
    }
    
    return (
        <Link to={`/modeler/${id}/${slugify(name)}`} className="card text-reset text-decoration-none mw-25 overflow-hidden" id="diagram-card">
            <div className="card-header  d-flex">
                <div className='overflow-hidden'>
                    <span className="fw-bold">{name}</span><br />
                    <span>Modificado {elapsedTime(lastModified) > 0 ? `há ${elapsedTime(lastModified)} dias` : "hoje"}</span>
                </div>

                <div className="dropdown ms-auto d-flex ps-3 outline-white">  
                    <FavoriteDiagram diagram_id={id} favorited={favorited} onFavoritedClick={()=>{
                        onDiagramFavorited()
                    }}/>                            
                    
                    <button className="btn px-2 pe-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-three-dots-vertical"></i>
                    </button>
                        
                    <ul className="dropdown-menu outline-black">
                        <li>
                            <button className="dropdown-item" onClick={(e)=> {e.stopPropagation(); e.preventDefault(); onRenameDiagram(id)}}> <i className="bi bi-pencil"></i> Renomear</button>
                        </li>

                        {
                            userId === JSON.parse(localStorage.getItem('user')).id && (
                                <li>
                                    <button className="dropdown-item" onClick={(e)=> {e.stopPropagation(); e.preventDefault(); onShareDiagram(id)}}> <i className="bi bi-share-fill"></i> Compartilhar</button>
                                </li>
                            )
                        }

                        <li>
                            <button className="dropdown-item" onClick={(e)=> {e.stopPropagation(); e.preventDefault(); onRemoveDiagram(id)}}> <i className="bi bi-trash3-fill"></i> Excluir</button>
                        </li>
                    </ul>

                </div>

            </div>
            <div className="card-body p-3">
                {   thumbnail.includes('.svg') ?
                    <img className='w-100' src={`${link}${thumbnail}`} alt="Thumbnail do diagrama" /> : null
                }
            </div>

        </Link>
    )
}

export default DiagramCard;