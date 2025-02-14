import { useState, useRef, useEffect } from "react";
import { Toast } from "../Toast";
import Spinner from "../Spinner";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from "../../services/api";
import { Modal } from "bootstrap";
import './style.scss';


function RemoveLoginModal({ id, onConfirmLoginRemoved }) {
    const [loading, setLoading] = useState(false);
    const modalRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
	  setShowPassword(!showPassword);
	};

    // Formulario com Formik
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

                Toast('error', error, "errorCircle");

            }
            setLoading(false);
            setSubmitting(false);
        },
    });

    // Fecha o Modal pegando a instancia dele
    const closeModal = () => {
        if (modalRef.current) {
            const modalInstance = Modal.getInstance(modalRef.current);
            modalInstance.hide();
        }
    };



    // Limpa a senha do Modal quando inicia
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (
        <div className="modal DeleteAccountModal" id={id} tabIndex="-1" aria-labelledby="RemoveLoginModal" ref={modalRef}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title h5" id="RemoveLoginModal">Excluir Perfil</h2>
                        <button type="button" className="btn-close p-0" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                type={showPassword ? "text" : "password"}
                                name="password"
                                autoComplete={!showPassword && "new-password webauthn"}
                                aria-label="campo de confirmação da senha para deletar a conta"
                            />
                            <div className="">
                                <i onClick={togglePasswordVisibility}
                                    className={`deyeicon bi bi-${showPassword ? 'eye-fill': 'eye-slash-fill'} ${formik.touched.password && formik.errors.password ? 'deyeicon-active': ''}`}
                                ></i>
                            </div>

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
