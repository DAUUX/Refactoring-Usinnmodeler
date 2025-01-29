import { Link, useNavigate } from 'react-router-dom';
import { slugify } from '../../Helpers';
import './style.scss';

import StarFill from "../../assets/icons/star-fill.svg";
import Star from "../../assets/icons/star.svg";

import api from '../../services/api';
import { Toast } from '../Toast';
import { useEffect, useState } from 'react';

function DiagramCard({id, name, oculto_data, favorited_data,  description, thumbnail, onRemoveDiagram, diagram_data = ""}) {

    const navigate   = useNavigate();

    const [favorited, setFavorited] = useState(false);
    const [oculto, setOculto] = useState(oculto_data);

    useEffect(() => {
        const storedValue = JSON.parse(localStorage.getItem("favorited_data"));
        setFavorited(storedValue || favorited_data);
    }, [favorited_data]);
    
    
    


    const toggleFavorite = async () => {
        const newFavorite = !favorited;
        let response = "";
    
        try {
            response = await api.post(`/user/preferences`, {
                dados: { [id]: { favorited: newFavorite ? "true" : "false", oculto: oculto ? "true" : "false" } }
            });
            console.log("API Response:", response.data);
            setFavorited(newFavorite);
        } catch (error) {
            console.error("Erro ao atualizar favorito:", error);
        }
        
    };
    
    const SaveOcultar = async () => {
        setOculto(true)
        let response = "";
    
        try {
            // Envia a requisição para ocultar
            response = await api.post(`/user/preferences`, {
                dados: {
                    [id]: {
                        favorited: favorited ? "true" : "false",
                        oculto: "true"
                    }
                }
            });
    
            // Exibe a mensagem de sucesso após a atualização
            Toast("success", response.data, "checkCircle");
        } catch (error) {
            console.error("Erro ao ocultar:", error);
            Toast("error", "Erro ao ocultar.", "error");
        }
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
                                    SaveOcultar() 
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