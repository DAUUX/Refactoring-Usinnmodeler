import { useState, useRef } from "react";
import { Toast } from "../Toast";
import Spinner from "../Spinner";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from "../../services/api";

import { Modal } from "bootstrap";

function RemoveLoginModal({ id, onConfirmLoginRemoved }) {
    const [loading, setLoading] = useState(false);
    const modalRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validationSchema: Yup.object({
            password: Yup.string().min(8, 'Senha deve ter no mínimo 8 caracteres').required('Senha é obrigatória'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            setLoading(true);
            try {
                await api.post('user/check-password', values);
                Toast('success', 'Senha confirmada!', "checkCircle");
                onConfirmLoginRemoved();
                closeModal(); // Fechar o modal
            } catch (error) {
                if(error == "TypeError: Cannot read properties of undefined (reading 'status')"){
                    Toast('error', "Falha na conexão ao servidor", "errorServer");
                }
                else{
                    Toast('error', error, "errorCircle");
                }
            }
            setLoading(false);
            setSubmitting(false);
        },
    });

    const closeModal = () => {
        if (modalRef.current) {
            const modalInstance = Modal.getInstance(modalRef.current);
            modalInstance.hide();
        }
    };

    return (
        <div className="modal" id={id} tabIndex="-1" aria-labelledby="RemoveLoginModal" aria-hidden="true" ref={modalRef}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="RemoveLoginModal">Excluir Perfil</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form noValidate="" onSubmit={formik.handleSubmit}>
                        <div className="modal-body">
                            <input
                                id="password"
                                autoFocus
                                disabled={formik.isSubmitting}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                placeholder="Insira sua senha"
                                type="password"
                                name="password"
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="invalid-feedback d-block"> {formik.errors.password}</div>
                            ) : null}
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-danger" disabled={formik.isSubmitting}>
                                {loading && <Spinner className="spinner-border spinner-border-sm me-2" />} Excluir Perfil
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RemoveLoginModal;
