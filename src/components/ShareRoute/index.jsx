import { useEffect, useState } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { slugify } from "../../Helpers";
import api from "../../services/api";
import { Toast } from "../Toast";

const ShareRoute = (props) => {
    const history = useHistory();

    async function getSharedDiagram() {

        let diagram = null;

        try {
        
            const res = await api.post(`collaboration/${props.computedMatch.params.token}`);

            diagram = res.data.diagram ? res.data.diagram : res.data;
        
        } catch (error) {
        
            if(error == "TypeError: Cannot read properties of undefined (reading 'status')"){
                Toast('error', "Falha na conexão ao servidor", "errorServer");
            }
            else{
                Toast('error', error, "errorCircle");
            }
        
        }

        history.push(`/modeler${diagram.id ? '/'+diagram.id+'/'+slugify(diagram.name) : ''}`);

    }

    useEffect(()=>{
        getSharedDiagram();
    },[])

    return null;

};

export default ShareRoute;