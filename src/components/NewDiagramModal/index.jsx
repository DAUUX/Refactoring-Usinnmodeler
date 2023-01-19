import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import 'simple-react-validator/dist/locale/pt';
import { Toast } from "../Toast";
import api from "../../services/api";
import Spinner from "../Spinner";
import { slugify } from "../../Helpers";

function NewDiagramModal(props) {

    const history   = useHistory();
    const validator = useRef(new SimpleReactValidator({locale: 'pt'}));

    const [loading, setLoading]   = useState(false);
    const [name, setName]         = useState('');
    const [, wasValidated]        = useState();

    useEffect(()=>{
        document.getElementById(props.id).addEventListener('show.bs.modal', event => {
            setName('')
        });
    },[])

    async function handleSave(e) {

        e.preventDefault();

        setLoading(true);
        const data = {name, diagram_data: props.diagram, diagram_svg: props.diagramSVG};

        if (validator.current.allValid()) {
        
            try {
            
                const res = await api.post('diagrams', data);
                Toast('success', 'Diagrama salvo com sucesso!');

                const {id, name} = res.data;

                document.getElementById('closeModal').click();
                history.push(`/modeler/${id}/${slugify(name)}`);
            
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
        <div className="modal fade" id={props.id} tabIndex="-1" aria-labelledby="newDiagramModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="newDiagramModalLabel">Novo diagrama</h5>
                        <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form noValidate="" onSubmit={handleSave}>
                        <div className="modal-body">
                            <input autoFocus className="form-control" disabled={loading} type="text" name="name" placeholder="Nome" value={name} onChange={e => setName(e.target.value)}/>
                            {validator.current.message("nome", name, "required|min:3|max:255", { className: 'invalid-feedback d-block ms-2' })}
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button> */}
                            <button className="btn btn-primary" disabled={loading} type="submit">
                                <Spinner className="spinner-border spinner-border-sm me-2" isLoading={loading}  /> Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewDiagramModal;