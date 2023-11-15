import "./style.scss"
import { useState,useEffect } from "react";
import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import UserProfile from "../../components/UserProfile";
import { useFormik } from "formik";
import * as Yup from 'yup';
import api from "../../services/api";
import InputMask from 'react-input-mask';
import { Toast } from '../../components/Toast';
import moment from "moment";

function ChangePassword() {

    let match = useRouteMatch();

    const [menuOpen, setMenuOpen]             = useState(false);
    const [loadingOverlay, setLoadingOverlay] = useState(false);

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
			try {	

				const response = await api.put('user');
			

				Toast('success', 'Os dados foram atualizados com sucesso!');
				
				
			} catch (error) {
				
				Toast('error', error);
				
			}
   
		},
   
	});

    async function getUser() {
        setLoadingOverlay(true);
        try{
            const res = await api.get(`user`);
            const { password,confirmPassword } = res.data;
            formik.setFieldValue('password',password);
            formik.setFieldValue('password',confirmPassword);
        } catch(error){
            Toast('error', error);
        }
        setLoadingOverlay(false);
    }

    useEffect(()=>{
        getUser();
     },[]) 

    


    return (
        <main id="changePassword" className={`flex-fill h-100`}>
            
            
            <nav className="navbar navbar-expand-lg bg-white p-3 justify-content-between w-100">
                        <div className="container-fluid">
                            <div className="mb-0 h4">
                                <b>Atualizar Senha</b>
                            </div>
                            <UserProfile/>
                        </div>
            </nav>

            <div className="container">
            
                <div id="content" className="row justify-content-between position-relative mt-5 mx-3">
					
					<div className="order-2 order-md-1 col-12 col-md-6 col-lg-4">

						<form className="row" noValidate="" onSubmit={formik.handleSubmit}>
        
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
                                    value={formik.values.password}
                                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : '' }`}
                                    type="password" 
                                    name="confirmPassword" 
                                    placeholder="Confirmar Senha*"
                                />
                                {formik.touched.password && formik.errors.password ? (<div className="invalid-feedback d-block"> {formik.errors.password}</div>) : null}
                            </div>


                            <div className="d-flex justify-content-between">
                                
                                <div className="text-center mt-2">
                                    <Link className="text-decoration-none btn text-primary fw-bold" to="/dashboard" >Cancelar</Link>
                                </div>
                                
                                <div className="mt-2">
                                    <button className="btn btn-primary" type="submit">
                                        <Spinner className="spinner-border spinner-border-sm me-2" isLoading={formik.isSubmitting}  /> Confirmar
                                    </button>
                                </div>
                            </div>                    
                            
						</form>
					</div>
                    
                    

				</div>
                

            </div>
        
            <div id="loadingOverlay" className={`${loadingOverlay ? 'open':''}`}>
                <Spinner className="spinner-border spinner-border text-light" isLoading={loadingOverlay}  />
            </div>        

            
        </main>
    )

}


export default ChangePassword;