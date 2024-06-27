import React, { useState, useRef, useEffect } from "react";
import { Toast } from "../Toast";
import Spinner from "../Spinner";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from "../../services/api";
import { Modal } from "bootstrap";
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import "./style.scss";

function RemoveLoginModal({ id, onConfirmLoginRemoved }) {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar visibilidade da senha
    const modalRef = useRef(null);

    // Formulário com Formik
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
                closeModal(); // Fechar Modal
            } catch (error) {
                if (error === "TypeError: Cannot read properties of undefined (reading 'status')") {
                    Toast('error', "Falha na conexão ao servidor", "errorServer");
                } else {
                    Toast('error', error, "errorCircle");
                }
            }
            setLoading(false);
            setSubmitting(false);
        },
    });

    // Função para alternar visibilidade da senha
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Fechar o Modal
    const closeModal = () => {
        if (modalRef.current) {
            const modalInstance = Modal.getInstance(modalRef.current);
            modalInstance.hide();
        }
    };

    // Limpar o formulário quando o Modal é mostrado
    useEffect(() => {
        const handleShown = () => {
            formik.resetForm();
        };
        const modalElement = modalRef.current;
        const modalInstance = new Modal(modalElement);
        modalElement.addEventListener('shown.bs.modal', handleShown);

        return () => {
            modalElement.removeEventListener('shown.bs.modal', handleShown);
            modalInstance.dispose();
        };
    }, [formik]);

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
                            <div className="input-group">
                                <input
                                    id="password"
                                    autoFocus
                                    disabled={formik.isSubmitting}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                    placeholder="Insira sua senha"
                                    type={showPassword ? 'text' : 'password'} // Mostra como texto se showPassword for true
                                    name="password"
                                />
                                <span className="input-group-text password-toggle-icon" style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility}>
                                    {showPassword ? <IoEyeOffOutline className="icon-eye" /> : <IoEyeOutline className="icon-eye" />}
                                </span>
                            </div>
                            {formik.touched.password && formik.errors.password ? (
                                <div className="invalid-feedback d-block">{formik.errors.password}</div>
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
    );
}

export default RemoveLoginModal;
