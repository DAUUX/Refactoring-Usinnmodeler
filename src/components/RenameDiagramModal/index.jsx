import { useEffect, useRef } from "react";
import { Toast } from "../Toast";
import api from "../../services/api";
import Spinner from "../Spinner";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Modal } from "bootstrap";
import { useSocket } from "../../services/SocketContext";

function Rename({id, diagram_id, onDiagramRenamed}) {
    const socket = useSocket()

    useEffect(()=>{
        document.getElementById(id).addEventListener('show.bs.modal', event => {
            formik.resetForm()
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const modalRef = useRef(null); 

    const formik = useFormik({

		initialValues: {
			name: '',
		},
   
		validationSchema: Yup.object({
			name: Yup.string()
				.min(3, 'O nome deve ter no mínimo 3 caracteres')
				.max(100, 'O nome deve ter no máximo 100 caracteres')
				.required('Nome é obrigatório')
		}),
   
		onSubmit: async values => {
   
            try {

                const res = await api.get(`diagrams/${diagram_id}`);  
                const {user_id, name} = res.data
            
                await api.put(`diagrams/rename/${diagram_id}`, values);
                Toast('success', 'Diagrama renomeado com sucesso!', "checkCircle");
                
                document.getElementById(id).click();

                if(name !== formik.values.name){
                    const my_id = JSON.parse(localStorage.getItem('user')).id
                    const collaborator_name = JSON.parse(localStorage.getItem('user')).name;
                    const owner = my_id === user_id 

                    const res = await api.get(`collaboration/${diagram_id}`)
                    const user_ids = res.data.collaborators.map(collaborator => collaborator.collaborator_id);
                    user_ids.push(user_id);
                    const filtered_user_ids = user_ids.filter(id => id !== my_id);
                    
                    await api.post('notification', {user_id: filtered_user_ids, diagram_id: diagram_id, diagram_name: formik.values.name, type: 2, message: `"${collaborator_name}" alterou o nome do ${owner ? 'diagrama compartilhado com você' : 'seu diagrama'}: "${name}" para "${formik.values.name}"`})
                    await socket.emit('send_notification', filtered_user_ids);
                }
                
                if (modalRef.current) {
                    const modalInstance = Modal.getInstance(modalRef.current);
                    modalInstance.hide();
                }

                onDiagramRenamed()
            
            } catch (error) {

                Toast('error', error, "errorCircle");
            
            }
   
		},
   
	});
	
    return (
        <div className="modal" id={id} tabIndex="-1" aria-labelledby="RenameDiagramModalLabel" ref={modalRef}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="RenameDiagramModalLabel">Renomear diagrama</h5>
                        <button id="closeModal" type="button" className="btn-close p-0 " data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form noValidate="" onSubmit={formik.handleSubmit}>
                        <div className="modal-body">
                            <input 
                                autoFocus 
                                disabled={formik.isSubmitting}
								onChange={formik.handleChange}
								onInput={(e) => formik.setFieldTouched(e.target.name, true, false)}
								value={formik.values.name} 
                                className="form-control" 
                                type="text" 
                                name="name" 
                                placeholder="Novo nome"
                                autoComplete="name"
                                />

                            {formik.touched.name && formik.errors.name ? (<div className="invalid-feedback d-block"> {formik.errors.name}</div>) : null}
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                                <Spinner className="spinner-border spinner-border-sm me-2" isLoading={formik.isSubmitting}  /> Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Rename;