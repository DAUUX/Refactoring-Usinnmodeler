import "./style.scss"
import { useState,useEffect } from "react";
import { useRouteMatch, useHistory, Redirect, Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import UserProfile from "../../components/UserProfile";
import { useFormik } from "formik";
import * as Yup from 'yup';
import api from "../../services/api";
import { Toast } from '../../components/Toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

import PasswordConfirmation from "../../components/PasswordConfirmationModal";

function ChangePassword() {

    let match = useRouteMatch();
    const history = useHistory();

    const [loadingOverlay, setLoadingOverlay] = useState(false);
    const [confirmSaveModal, setConfirmPassModal] = useState(false);
    const [passwordValues, setPasswordValues] = useState(null);

    const username = JSON.parse(localStorage.getItem("user"))['name']

    const formik = useFormik({

		initialValues: {
			password: '',
            confirmPassword: ''
		},
   
		validationSchema: Yup.object({
			password: Yup.string().min(8, 'Senha deve ter no mínimo 8 caracteres').required('Senha é obrigatória'),
            confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'As senhas precisam ser iguais') // Garante que confirmPassword seja igual a password
            .required('Confirmação de senha é obrigatória'),
		}),
   
        onSubmit: async values => {
            // Define os valores do formulario(senha) e inicia o modal
            setPasswordValues(values);
            setConfirmPassModal(true);
        },
	});

    function logoutUser(){
        // Saí do WebApp
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        history.push('/login');
    }

    const handleConfirmPasswordChange = async () => { //faz o envio ao backEnd
        //Antes o envio ao backEnd ficava no formik.handleSubmit
        try {
            setLoadingOverlay(true);
            const response = await api.put('user/change-password', passwordValues); // Envio da solicitação com os valores do formulario de senha
            Toast('success', 'Os dados foram atualizados com sucesso!');
            logoutUser()
        } catch (error) {
            Toast('error', error);
        } finally {
            setLoadingOverlay(false); // Fecha a tela de carregamento
            setPasswordValues(null); // Limpa os valores para seguranca
            setConfirmPassModal(false); // Fecha o modal após a conclusão da solicitação
        }

    };

    return (
        <main id="changePassword" className={`flex-fill h-100`}>
            
            
            <nav className="navbar navbar-expand-lg bg-white p-3 justify-content-between w-100">{/* Perfil user */}
                        <div className="container-fluid">
                            <div className="mb-0 h4">
                                <b>Atualizar Senha</b>
                            </div>
                            <UserProfile/>
                        </div>
            </nav>

            <div className="container">
            
                <div id="content" className="row justify-content-center position-relative mt-5 mx-3">
					
					<div className="col-12 col-md-6 col-lg-5 mt-5">

						<form className="row" noValidate="" onSubmit={formik.handleSubmit}>{/* O formik.handleSubmit chama o modal */}
                            
                            <div className="text-center mb-3">
                                <FontAwesomeIcon icon={faKey} size="3x" color="#007BFF" />
                            </div>
        
                            <div className="col-12 mb-3">
                                <input 
                                    disabled={formik.isSubmitting}
                                    onChange={formik.handleChange}
                                    onInput={(e) => formik.setFieldTouched(e.target.name, true, false)}
                                    value={formik.values.password}
                                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : '' }`}
                                    type="password" 
                                    name="password" 
                                    placeholder="Senha*"
                                />
                                {formik.touched.password && formik.errors.password ? (<div className="invalid-feedback d-block"> {formik.errors.password}</div>) : null}
                            </div>

                            <div className="col-12 mb-3">
                                <input 
                                    disabled={formik.isSubmitting}
                                    onChange={formik.handleChange}
                                    onInput={(e) => formik.setFieldTouched(e.target.name, true, false)}
                                    value={formik.values.confirmPassword}
                                    className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : '' }`}
                                    type="password" 
                                    name="confirmPassword" 
                                    placeholder="Confirmar Senha*"
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (<div className="invalid-feedback d-block"> {formik.errors.confirmPassword}</div>) : null}
                            </div>


                            <div className="d-flex justify-content-between">
                                
                                <div className="text-center mt-2">
                                    <Link className="text-decoration-none btn text-primary fw-bold px-3" to="/dashboard" >Cancelar</Link>
                                </div>
                                
                                <div className="mt-2">
                                    <button className="btn btn-primary" type="submit">
                                        Confirmar
                                    </button>
                                </div>
                            </div>                    
                            
						</form>
					</div>
                    
                    

				</div>
                

            </div>
        
            <div id="loadingOverlay" className={`${loadingOverlay ? 'open':''}`} style={{zIndex: '9',    position: "fixed",top: "50%",left: "50%",transform: "translate(-50%, -50%)",}}> {/* Tela de carregamento */}
                <Spinner className="spinner-border spinner-border text-light" isLoading={loadingOverlay}  />
            </div>        

            {confirmSaveModal && (//Modal
                <PasswordConfirmation 
                    setConfirmPassModal={setConfirmPassModal} 
                    handleConfirmPasswordChange={handleConfirmPasswordChange} // Passa a função para confirmar a alteração de senha para o modal
                />
            )}
            
        </main>
    )

}

export default ChangePassword;