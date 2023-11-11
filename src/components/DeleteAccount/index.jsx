import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import 'simple-react-validator/dist/locale/pt';
import { Toast } from "../Toast";
import api from "../../services/api";

function RemoveLoginModal({email, password, onLoginRemoved}) {

    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');

    async function removeLogin() {
        setLoading(true);

        try {
        
            await api.delete(`email/${setEmail}`);
            await api.delete(`password/${setPassword}`)

            Toast('success', "Perfil removido com sucesso!");

            onLoginRemoved();
        
        } catch (error) {
        
            Toast('error', error);
        
        }

        setLoading(false);
    }

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
                                autoFocus 
                                disabled={formik.isSubmitting}
                                onChange={formik.handleChange}
                                onInput={(e) => formik.setFieldTouched(e.target.name, true, false)}
                                value={formik.values.name} 
                                className="form-control" 
                                type="text" 
                                password="password" 
                               />

                            {formik.touched.name && formik.errors.name ? (<div className="invalid-feedback d-block"> {formik.errors.name}</div>) : null}
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                                <Spinner className="spinner-border spinner-border-sm me-2" isLoading={formik.isSubmitting}  /> Excluir Perfil
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
     )

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-md modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body text-center px-4 pb-4">
                        <i className="bi bi-exclamation-triangle-fill mb-5 mt-3" style={{'fontSize': '60px'}}></i>
                        <h4 className="mb-5">Seu perfil será excluído e você não terá mais acesso aos seus diagramas</h4>
                        <button className="btn btn-secondary me-3" disabled={loading} type="button" data-bs-dismiss="modal">Cancelar</button>
                        <button className="btn btn-primary" disabled={loading} onClick={removeLogin} type="button" data-bs-dismiss="modal">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemoveLoginModal;