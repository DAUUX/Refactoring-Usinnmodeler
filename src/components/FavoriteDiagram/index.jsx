import Star from "../../assets/icons/star.svg";
import StarFill from "../../assets/icons/star-fill.svg";
import { useState } from "react";
import { Toast } from "../Toast";
import api from "../../services/api";
import Spinner from "../Spinner";
import { useTranslation } from 'react-i18next';

function FavoriteDiagram ({favorited, diagram_id, onFavoritedClick}){
    const { t } = useTranslation();
    const [favorite, setFavorite] = useState(favorited);
    const [loading, setLoading] = useState(false);
    
    async function handleFavoriteClick(e) {   
        e.stopPropagation();
        e.preventDefault();
        setLoading(true);
        try {
            if(!favorite){
                await api.post(`favorite/${diagram_id}`);
                Toast(t, "success", "Diagrama adicionado aos meus favoritos", "checkCircle");

                setFavorite(!favorite);

            } else{
                await api.delete(`/favorite/${diagram_id}`);
                Toast(t, "success","Diagrama removido dos meus favoritos", "checkCircle");

                setFavorite(!favorite);

            }            
            
            onFavoritedClick();       
        } catch (error) {
            if(error === "TypeError: Cannot read properties of undefined (reading 'status')"){
                Toast(t, 'error', "Falha na conexão ao servidor", "errorServer");
            }
            else{
                Toast(t, 'error', error, "errorCircle");
            }       
            
        }      
        setLoading(false);  
    }

    return (
        <button className={`btn p-0`} onClick={handleFavoriteClick} disabled={loading}>
            {loading ? <Spinner className="spinner-border spinner-border-sm " isLoading={loading}/> : (favorite ? <img src={StarFill} alt="Filled Star" /> : <img src={Star} alt="Star" />)}
        </button>
    );
}

export default FavoriteDiagram;