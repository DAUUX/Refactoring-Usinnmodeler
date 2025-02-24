import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './style.scss';
import api from "../../services/api";
import FavoriteDiagram from "../../components/FavoriteDiagram";

function DiagramCard({id, name, lastModified, thumbnail, userId, onShareDiagram, onRemoveDiagram, onRenameDiagram, favorited, onDiagramFavorited}) {
    const [, setSvgContent] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        async function getThumbnail(filename) {
            try {
                const res = await api.get(`diagrams/thumbnail/${filename}`);
                const svg = res.data.svgContent;
                setSvgContent(svg);

                const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(svgBlob);
                setImgSrc(url);

            } catch (error) {
                console.log(error);
            }
        }

        if (thumbnail.includes('.svg')) {
            getThumbnail(thumbnail);
        }
    }, [thumbnail]);

    function elapsedTime (date) {
        let now = new Date();
        let difference = now - new Date(date);
        return Math.round(difference /(1000 * 60 * 60 * 24));
    }
    
    return (
        <Link to={`/modeler/${id}`} className="card text-reset text-decoration-none mw-25 overflow-hidden" id="diagram-card">
            <div className="card-header  d-flex pe-0">
                <div className='overflow-hidden'>
                    <span className="fw-bold">{name}</span><br />
                    <span>Modificado {elapsedTime(lastModified) > 0 ? `há ${elapsedTime(lastModified)} dias` : "hoje"}</span>
                </div>

                <div className="dropdown ms-auto d-flex ps-3 outline-white">  
                    <FavoriteDiagram diagram_id={id} favorited={favorited} onFavoritedClick={()=>{
                        onDiagramFavorited()
                    }}/>                            
                    
                    <button className="btn p-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="abrir e fechar opções do diagrama">
                        <i className="bi bi-three-dots-vertical mt-1"></i>
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
                    <img className='w-100' src={process.env.REACT_APP_API_URL === "http://localhost:8080/api/" ? `${process.env.REACT_APP_API_URL}${thumbnail}` : imgSrc} alt="Thumbnail do diagrama" /> : null
                }
            </div>
            

        </Link>
    )
}

export default DiagramCard;