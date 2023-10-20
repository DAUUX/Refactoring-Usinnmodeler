import { useState } from "react";
import { Toast } from "../Toast";
import Spinner from "../Spinner";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from "../../services/api";

function RemoveLoginModal({id, onConfirmLoginRemoved}) {

    const [loading, setLoading]   = useState(false);

    
	const formik = useFormik({
        
        initialValues: {
            password: ''
		},
   
		validationSchema: Yup.object({
			password: Yup.string().min(8, 'Senha deve ter no mínimo 8 caracteres').required('Senha é obrigatória'),
		}),
   
		onSubmit: async values => {
            setLoading(true);
			try {

                await api.post('user/check-password', values);
				Toast('success', 'Senha confirmada!');
                onConfirmLoginRemoved();

			} catch (error) {
	
				Toast('error', error);
				
			}
            formik.resetForm();
            setLoading(false);
		},
	});
    
    return (
        <div className="modal" id={id} tabIndex="-1" aria-labelledby="RemoveLoginModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="RemoveLoginModal">Excluir Perfil</h5>
                        <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form noValidate="" onSubmit={formik.handleSubmit}>
                        <div className="modal-body">
                            <input 
                                id="password"
                                autoFocus 
                                disabled={formik.isSubmitting}
                                onChange={formik.handleChange}
                                onInput={(e) => formik.setFieldTouched(e.target.password, true, false)}
                                value={formik.values.password} 
                                className="form-control"
                                placeholder="Insira sua senha" 
                                type="password" 
                                password="password" 
                               />

                            {formik.touched.password && formik.errors.password ? (<div className="invalid-feedback d-block"> {formik.errors.password}</div>) : null}
                        </div>
                        <div className="modal-footer">

                            <button type="submit" className="btn btn-danger" disabled={formik.isSubmitting} data-bs-dismiss={ formik.values.password.length > 0 ? "modal" :""} >
                                <Spinner className="spinner-border spinner-border-sm me-2" isLoading={loading}  /> Excluir Perfil
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
     )
}
export default RemoveLoginModal;