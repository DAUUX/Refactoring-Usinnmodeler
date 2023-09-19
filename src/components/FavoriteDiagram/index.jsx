import Star from "../../assets/icons/star.svg";
import StarFill from "../../assets/icons/star-fill.svg";
import { useState } from "react";
import { Toast } from "../Toast";
import api from "../../services/api";
import Spinner from "../Spinner";

function FavoriteDiagram ({favorited, diagram_id, onFavoritedClick}){
    const [favorite, setFavorite] = useState(favorited);
    const [loading, setLoading] = useState(false);
    
    async function handleFavoriteClick(e) {   
        e.stopPropagation();
        e.preventDefault();
        setLoading(true);
        onFavoritedClick();
        try {
            if(!favorite){
                const res = await api.post(`favorite/${diagram_id}`);
                Toast("success", "Diagrama favoritado com sucesso!");

                setFavorite(!favorite);

            } else{
                const res = await api.delete(`/favorite/${diagram_id}`);
                Toast("success","Diagrama desfavoritado com sucesso!");

                setFavorite(!favorite);

            }                   
        } catch (error) {
            Toast('error', error);        
            
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