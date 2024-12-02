import { Link, useNavigate } from 'react-router-dom';
import { slugify } from '../../Helpers';
import './style.scss';

import StarFill from "../../assets/icons/star-fill.svg";
import Star from "../../assets/icons/star.svg";

import api from '../../services/api';
import { Toast } from '../Toast';
import { useEffect, useState } from 'react';

function DiagramCard({id, name, description, thumbnail, onRemoveDiagram, diagram_data = ""}) {

    const navigate   = useNavigate();
    const [favorited, setFavorited] = useState(false);


    useEffect(() => {
        const favoriteDiagrams = JSON.parse(localStorage.getItem("favoriteDiagrams")) || {};
        setFavorited(favoriteDiagrams[id] || false); // Define com base no localStorage
    }, [id]);


    const toggleFavorite = () => {
        const newFavorite = !favorited;
        setFavorited(newFavorite);

        const favoriteDiagrams = JSON.parse(localStorage.getItem("favoriteDiagrams")) || {};
        favoriteDiagrams[id] = newFavorite; 
        localStorage.setItem("favoriteDiagrams", JSON.stringify(favoriteDiagrams));
        // eslint-disable-next-line no-lone-blocks
        {!favorited ? 
            Toast("success", "Diagrama adicionado aos meus favoritos", "checkCircle"):
            Toast("success","Diagrama removido dos meus favoritos", "checkCircle")}
    };

    async function createNewDiagram() {
        const data = {name: name, diagram_data: diagram_data, diagram_svg: ""};
            try {
            const res = await api.post('diagrams', data);
            const {id, name} = res.data;
            navigate(`/modeler/${id}/${slugify(name)}`);
            } catch (error) {
                Toast('error',error);
            }
    }
    
    return (
        <Link
            onClick={() => { createNewDiagram() }}
            className="card text-reset text-decoration-none mw-25 overflow-hidden"
            id="diagram-card"
        >
            <div className="card-header d-flex">
                <div className={`${description? "overflow-hidden d-flex flex-column align-items-start" : "overflow-hidden d-flex align-items-center cols"}`}>
                    <span className="fw-bold">{name}</span>
                    <span className="text-muted">{description}</span>
                </div>
    
                <div 
                    className="dropdown ms-auto d-flex ps-3 align-items-center"
                    onClick={(e) => e.stopPropagation()} // Impede que o clique no dropdown afete o Link
                >
                    <Link className='pb-1' 
                        onClick={(e)=>{                                        
                            e.stopPropagation(); 
                            e.preventDefault(); 
                            toggleFavorite()}}>

                        {favorited ? <img src={StarFill} alt="Filled Star" /> : <img src={Star} alt="Star" />}

                    </Link>
    
                    <button 
                        className="btn px-2 pe-0 dropdown-toggle" 
                        type="button" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                    >
                        <i className="bi bi-three-dots-vertical"></i>
                    </button>
    
                    <ul className="dropdown-menu">


                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    e.preventDefault(); 
                                    onRemoveDiagram(id); 
                                }}
                            >
                                Ocultar Template
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