import { Link, useNavigate } from 'react-router-dom';
import './style.scss';

import StarFill from "../../assets/icons/star-fill.svg";
import Star from "../../assets/icons/star.svg";

import api from '../../services/api';
import { Toast } from '../Toast';
import { useEffect, useState } from 'react';

function DiagramCard({id, name, oculto_data, favorited_data,  description, thumbnail, onRemoveDiagram, diagram_data = "",refresh}) {

    const navigate   = useNavigate();

    const [favorited, setFavorited] = useState(false);
    const [oculto, setOculto] = useState(oculto_data);

    useEffect(() => {
        const storedValue = JSON.parse(localStorage.getItem("favorited_data"));
        setFavorited(storedValue || favorited_data);
    }, [favorited_data]);
    
    
    const toggleFavorite = async () => {
        let newFavorite
        if(favorited==="true"){
            newFavorite = "false"
        }else{
            newFavorite = "true"
        }
    
        try {
            await api.post(`/user/preferences`, {
                dados: { [id]: { favorited: newFavorite==="true" ? "true" : "false", oculto: oculto==="true" ? "true" : "false" } }
            });
            if (newFavorite === "true"){
                Toast("success", "Diagrama adicionado aos meus favoritos", "checkCircle");
            }else{
                Toast("success", "Diagrama removido aos meus favoritos", "checkCircle");
            }
            setFavorited(newFavorite);
            refresh()
        } catch (error) {
            Toast('error', "Erro ao Favoritar");
            console.error("Erro ao atualizar favorito:", error);
        }
        
    };
    
    const SaveOcultar = async () => {
        refresh()
        setOculto(true)
        oculto_data = "true"
        try {
            // Envia a requisição para ocultar
            await api.post(`/user/preferences`, {
                dados: {
                    [id]: {
                        favorited: favorited_data==="true" ? "true" : "false",
                        oculto: "true"
                    }
                }
            });
    
            // Exibe a mensagem de sucesso após a atualização
            Toast("success", "Diagrama oculto.", "checkCircle");
        } catch (error) {
            Toast("error", "Erro ao ocultar.", "error");
        }
    };
    

    async function createNewDiagram() {
        const data = {name: name, diagram_data: diagram_data, diagram_svg: ""};
            try {
            const res = await api.post('diagrams', data);
            console.log(res)
            const {id} = res.data.message;
            navigate(`/modeler/${id}`);
            } catch (error) {
                console.log(error)
                Toast('error',error);
            }
    }
    
    return (
        <Link
            onClick={() => { createNewDiagram() }}
            className="card text-reset text-decoration-none mw-25 overflow-hidden"
            id="diagram-card"
        >
            <div className="card-header d-flex pe-0">
                <div className={`${description? "overflow-hidden d-flex flex-column align-items-start" : "overflow-hidden d-flex align-items-center cols"}`}>
                    <span className="fw-bold">{name}</span>
                    <span className="text-muted">{description}</span>
                </div>
    
                <div 
                    className="dropdown ms-auto d-flex ps-3 align-items-center"
                    onClick={(e) => e.stopPropagation()} // Impede que o clique no dropdown afete o Link
                >
                    <button className='reset bg-transparent border-0 d-flex justify-content-center align-items-center' 
                        onClick={(e)=>{                                        
                            e.stopPropagation(); 
                            e.preventDefault(); 
                            toggleFavorite()}}>

                        {favorited==="true" ? <img src={StarFill} alt="Filled Star" /> : <img src={Star} alt="Star" />}


                    </button>
    
                    <button 
                        className="btn px-2 pe-0 dropdown-toggle outline-white" 
                        type="button" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                        aria-label="abrir e fechar opções do template"
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
                    <img className="w-100" src={`${process.env.REACT_APP_API_URL}${thumbnail}`} alt={`Diagrama ${name}`} />
                ) : null}
            </div>
        </Link>
    );
    
}

export default DiagramCard;