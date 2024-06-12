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
        try {
            if(!favorite){
                await api.post(`favorite/${diagram_id}`);
                Toast("success", "Diagrama adicionado aos meus favoritos", "checkCircle");

                setFavorite(!favorite);

            } else{
                await api.delete(`/favorite/${diagram_id}`);
                Toast("success","Diagrama removido dos meus favoritos", "checkCircle");

                setFavorite(!favorite);

            }            
            
            onFavoritedClick();       
        } catch (error) {
            if(error === "TypeError: Cannot read properties of undefined (reading 'status')"){
                Toast('error', "Falha na conexão ao servidor", "errorServer");
            }
            else{
                Toast('error', error, "errorCircle");
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