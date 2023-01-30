import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import 'simple-react-validator/dist/locale/pt';
import { Toast } from "../Toast";
import api from "../../services/api";
import Spinner from "../Spinner";
import { Modal } from "bootstrap";

function Rename({id, diagram_id, onDiagramRenamed}) {

    const history   = useHistory();
    const validator = useRef(new SimpleReactValidator({locale: 'pt'}));

    const [loading, setLoading]   = useState(false);
    const [name, setName]         = useState('');
    const [, wasValidated]        = useState();

    useEffect(()=>{
        document.getElementById(id).addEventListener('show.bs.modal', event => {
            setName('')
        });
    },[])

    async function handleSave(e) {

        e.preventDefault();

        setLoading(true);
        const data = {name};

        if (validator.current.allValid()) {
        
            try {
            
                await api.put(`diagrams/rename/${diagram_id}`, data);
                Toast('success', 'Diagrama renomeado com sucesso!');
                
                document.getElementById('closeModal').click();

                onDiagramRenamed()
            
            } catch (error) {
            
                Toast('error', error);
            
            }
        
        } else {
            validator.current.showMessages(true);
            wasValidated(1);
        }

        setLoading(false);

    }

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="newDiagramModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="newDiagramModalLabel">Renomear diagrama</h5>
                        <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form noValidate="" onSubmit={handleSave}>
                        <div className="modal-body">
                            <input autoFocus className="form-control" disabled={loading} type="text" name="name" placeholder="Novo nome" value={name} onChange={e => setName(e.target.value)}/>
                            {validator.current.message("nome", name, "required|min:3|max:255", { className: 'invalid-feedback d-block ms-2' })}
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button> */}
                            <button className="btn btn-primary" disabled={loading}>
                                <Spinner className="spinner-border spinner-border-sm me-2" isLoading={loading}  /> Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Rename;