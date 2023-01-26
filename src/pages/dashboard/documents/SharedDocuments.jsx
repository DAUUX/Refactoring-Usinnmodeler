import { useState, useEffect } from "react";
import DiagramCard from "../../../components/DiagramCard";
import Spinner from "../../../components/Spinner";
import { Toast } from "../../../components/Toast";
import api from "../../../services/api";

function SharedDocuments() {
    let [diagrams, setDiagrams] = useState([]);
    let [loading, setLoading] = useState(true);

    async function getDiagrams() {
        setLoading(true);
        try{
            const res = await api.get(`diagrams/shared`);
            setDiagrams(res.data.diagrams);
        } catch(error){
            Toast('error', error);
        }
        setLoading(false);
    }

    useEffect(()=>{
       getDiagrams();
    },[])    
    
    return (
        <div className="container-fluid px-4">            
            <div className="row">
                
                {
                    loading && (
                        <div className="col-12 d-flex mt-5 justify-content-center">
                            <Spinner className="spinner-border me-2" isLoading={loading}  />
                        </div>
                    )
                }
                
                {
                    diagrams.length >0 && !loading &&(
                        diagrams.map((diagram)=>{
                            return (
                            <div key={diagram.id} className="col-12 col-md-4 col-lg-3">
                                <DiagramCard name={diagram.name} lastModified={diagram.updatedAt}/>                        
                            </div>
                            )
                        })
                    )
                }

                {
                    diagrams.length ==0 && !loading &&(
                        <h4 className="text-center mt-5">Ainda não há diagramas compartilhados</h4>
                    )
                }
               
            </div>
        </div>
    )


}

export default SharedDocuments