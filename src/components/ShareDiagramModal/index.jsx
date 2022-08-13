import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import 'simple-react-validator/dist/locale/pt';
import { Toast } from "../Toast";
import api from "../../services/api";

function ShareDiagramModal(props) {

    const history   = useHistory();

    const [loading, setLoading]   = useState(false);
    const [link, setLink]         = useState('');
    const [open, setOpen]         = useState(false);
    const [copied, setCopied]     = useState(false);

    useEffect(()=>{

        document.getElementById(props.id).addEventListener('show.bs.modal', event => {
            setOpen(true);
        });

        document.getElementById(props.id).addEventListener('hidden.bs.modal', event => {
            setOpen(false);
        });
        
    },[]);

    useEffect(()=>{

        if (open) {
            getShareLink();
        } else {
            setLink('');
        }
        
    },[open]);

    async function getShareLink() {
        setLoading(true);

        try {
        
            const res = await api.post(`share/${props.diagram_id}`);

            const {token} = res.data;

            setLink(`${window.location.origin}/shared/${token}`);
        
        } catch (error) {
        
            Toast('error', error);
        
        }

        setLoading(false);
    }

    async function stopSharing() {

        setLoading(true);
        
        try {
            
            setLink('');
            await api.delete(`share/${props.diagram_id}`);
            
        } catch (error) {
            
            Toast('error', error);
            
        }

        setLoading(false);

    }

    function copy() {

        /* Get the text field */
        var copyText = document.getElementById("link");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText.value);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, "2000");

    }

    return (
        <div className="modal fade" id={props.id} tabIndex="-1" aria-labelledby="ShareDiagramModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="ShareDiagramModalLabel">Compartilhar diagrama</h5>
                        <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <label className="mb-1">Link</label>
                        <div className="input-group mb-3">
                            <input type="text" id="link" className="form-control" disabled value={!loading ? link : 'Carregando...'} />
                            <button disabled={loading} className="btn btn-outline-primary" type="button" onClick={copy}> <i className={`bi bi-${!copied? 'clipboard' : 'check'}`} ></i> </button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-danger" disabled={loading} type="button" data-bs-dismiss="modal" onClick={stopSharing}>Parar compartilhamento</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShareDiagramModal;