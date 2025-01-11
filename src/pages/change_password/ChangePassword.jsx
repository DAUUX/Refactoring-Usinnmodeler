import "./style.scss"
import { useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import UserProfile from "../../components/UserProfile";
import { useFormik } from "formik";
import * as Yup from 'yup';
import api from "../../services/api";
import { Toast } from '../../components/Toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import PasswordConfirmation from "../../components/PasswordConfirmationModal";

function ChangePassword() {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = 'Atualizar Senha - USINN Modeler';
    },[]);

    const navigate = useNavigate();

    const [loadingOverlay, setLoadingOverlay] = useState(false);
    const [confirmSaveModal, setConfirmPassModal] = useState(false);
    const [passwordValues, setPasswordValues] = useState(null);

    const [showPassword1, setShowPassword1] = useState(false);

    const [showPassword2, setShowPassword2] = useState(false);

    const formik = useFormik({

		initialValues: {
			password: '',
            confirmPassword: ''
		},
   
		validationSchema: Yup.object({
			password: Yup.string().min(8, t("A senha deve ter pelo menos 8 caracteres")).required(t("Nova senha é obrigatória")),
            confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], t("As senhas devem coincidir")) // Garante que confirmPassword seja igual a password
            .required(t("Confirmação de senha é obrigatória")),
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
        navigate('/login');
    }

    const handleConfirmPasswordChange = async () => { //faz o envio ao backEnd
        //Antes o envio ao backEnd ficava no formik.handleSubmit
        try {
            setLoadingOverlay(true);
            await api.put('user/change-password', passwordValues); // Envio da solicitação com os valores do formulario de senha
            Toast('success', 'Os dados foram atualizados com sucesso!', "key");
            logoutUser()
        } catch (error) {
            if(error === "TypeError: Cannot read properties of undefined (reading 'status')"){
                Toast('error', "Falha na conexão ao servidor", "errorServer");
            }
            else{
                Toast('error', error, "aviso");
            }
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
                                <b>{t("Atualizar Senha")}</b>
                            </div>
                            <UserProfile/>
                        </div>
            </nav>

            <div className="container p-0">
            
                <div className="row justify-content-center m-0">
					
					<div className="col-12 col-md-6 col-lg-5 mt-5">

						<form className="row" noValidate="" onSubmit={formik.handleSubmit}>{/* O formik.handleSubmit chama o modal */}
                            
                            <div className="text-center mb-3">
                                <FontAwesomeIcon icon={faKey} size="3x" color="#007BFF" />
                            </div>
        
                            <div className="col-12 mb-3" style={{ position: 'relative' }}>
                                <input 
                                    disabled={formik.isSubmitting}
                                    onChange={formik.handleChange}
                                    onInput={(e) => formik.setFieldTouched(e.target.name, true, false)}
                                    value={formik.values.password}
                                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : '' }`}
                                    type={showPassword1 ? "text" : "password"}
                                    name="password" 
                                    placeholder={t("Senha")+'*'}
                                />

                                <i onClick={() => setShowPassword1(!showPassword1)} className={`bi bi-${showPassword1 ? 'eye-fill': 'eye-slash-fill'} icon ${formik.touched.password && formik.errors.password ? 'icon-active': ''}`}/>

                                {formik.touched.password && formik.errors.password ? (<div className="invalid-feedback d-block"> {formik.errors.password}</div>) : null}
                            </div>

                            <div className="col-12 mb-3" style={{ position: 'relative' }}>
                                <input 
                                    disabled={formik.isSubmitting}
                                    onChange={formik.handleChange}
                                    onInput={(e) => formik.setFieldTouched(e.target.name, true, false)}
                                    value={formik.values.confirmPassword}
                                    className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : '' }`}
                                    type={showPassword2 ? "text" : "password"}
                                    name="confirmPassword" 
                                    placeholder={t("Confirmar Senha")+'*'}
                                />
                                <i onClick={() => setShowPassword2(!showPassword2)} className={`bi bi-${showPassword2 ? 'eye-fill': 'eye-slash-fill'} icon ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'icon-active': ''}`}/>
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (<div className="invalid-feedback d-block"> {formik.errors.confirmPassword}</div>) : null}
                            </div>


                            <div className="d-flex justify-content-center gap-5">
                                
                                <div className="text-center mt-2">
                                    <Link className="text-decoration-none btn text-primary fw-bold px-4 px-sm-5 border-dark" to="/dashboard" >{t("Cancelar")}</Link>
                                </div>
                                
                                <div className="mt-2">
                                    <button className="btn btn-primary px-4 px-sm-5" type="submit">
                                    {t("Confirmar")}
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