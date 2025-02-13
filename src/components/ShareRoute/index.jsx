import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { slugify } from "../../Helpers";
import api from "../../services/api";
import { Toast } from "../Toast";

const ShareRoute = (props) => {
    const navigate = useNavigate();
    const { token } = useParams();

    async function getSharedDiagram() {

        let diagram = null;

        try {
        
            const res = await api.post(`collaboration/${token}`);

            diagram = res.data.diagram ? res.data.diagram : res.data;
        
        } catch (error) {
        
            if(error === "TypeError: Cannot read properties of undefined (reading 'status')"){
                Toast('error', "Falha na conexão ao servidor", "errorServer");
            }
            else{
                Toast('error', error, "errorCircle");
            }
        
        }

        navigate(`/modeler${diagram.id ? '/'+diagram.id : ''}`);

    }

    useEffect(()=>{
        getSharedDiagram();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return null;

};

export default ShareRoute;