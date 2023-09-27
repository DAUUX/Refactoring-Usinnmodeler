import "./style.scss"
import { useState,useEffect } from "react";
import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import UserProfile from "../../components/UserProfile";
import { roleOptions, genderOptions, avatarOptions } from '../../Consts';
import { useFormik } from "formik";
import * as Yup from 'yup';
import api from "../../services/api";
import InputMask from 'react-input-mask';
import { Toast } from '../../components/Toast';
import moment from "moment";

function UpdateProfile() {

    let match = useRouteMatch();

    const [menuOpen, setMenuOpen]             = useState(false);
    const [loadingOverlay, setLoadingOverlay] = useState(false);

    const [imgAvatar, setImgAvatar] = useState(0);

    const username = JSON.parse(localStorage.getItem("user"))['name']

    const formik = useFormik({

		initialValues: {
			name: '',
 			email: '',
			birthday: '',
			gender: '',
			password: '',
			company: '',
			role: ''
		},
   
		validationSchema: Yup.object({
			name: Yup.string()
				.matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, {message: 'O nome só deve conter caracteres'})
				.min(3, 'O nome deve ter no mínimo 3 caracteres')
				.max(100, 'O nome deve ter no máximo 100 caracteres')
				.required('Nome é obrigatório'),
			email: Yup.string().email('Endereço de e-mail inválido').max(100, 'O email deve ter no máximo 100 caracteres').required('E-mail é obrigatório'),
			password: Yup.string().min(8, 'Senha deve ter no mínimo 8 caracteres').required('Senha é obrigatória'),
			birthday: Yup.date()
				.transform((value, currentValue) => { return moment(currentValue, 'DD/MM/YYYY', true).toDate() })
				.typeError('Data é inválida')
				.max(new Date(), 'Data de nascimento inválida')
				.required('Data de nascimento é obrigatória'),
			gender: Yup.number().integer('Valor é inválido').min(1, 'Valor é inválido').max(3, 'Valor é inválido').required('Gênero é obrigatório'),
			role: Yup.number().integer('Valor é inválido'),
			company: Yup.string().max(100, 'A organização deve ter no máximo 100 caracteres')
		}),
   
		onSubmit: async values => {
            console.log('hello');
			try {	

				const response = await api.put('user', {...values, birthday: moment(values.birthday, 'DD/MM/YYYY', true).format('YYYY-MM-DD'),avatar: imgAvatar+1});
			

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
            const { name, email, password, birthday, gender, company, role, avatar } = res.data;
            formik.setFieldValue('name',name);
            formik.setFieldValue('email',email);
            formik.setFieldValue('password',password);
            formik.setFieldValue('birthday', moment(birthday, 'YYYY-MM-DD').format('DD/MM/YYYY'));
            formik.setFieldValue('gender',gender);
            formik.setFieldValue('company',company);
            formik.setFieldValue('role',role);
            setImgAvatar(avatar-1);
        } catch(error){
            Toast('error', error);
        }
        setLoadingOverlay(false);
    }

    useEffect(()=>{
        getUser();
     },[]) 

    


    return (
        <main id="update" className={`flex-fill h-100`}>
            
            
            <nav className="navbar navbar-expand-lg bg-white p-3 justify-content-between w-100">
                        <div className="container-fluid">
                            <div className="mb-0 h4">
                                <b>Atualizar Perfil</b>
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
                                    autoFocus 
                                    disabled={formik.isSubmitting}
                                    onChange={formik.handleChange}
                                    onInput={(e) => formik.setFieldTouched(e.target.name, true, false)}
                                    value={formik.values.name}
                                    className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : '' }`}
                                    type="text" 
                                    name="name" 
                                    placeholder="Nome completo*"
                                />
                                {formik.touched.name && formik.errors.name ? (<div className="invalid-feedback d-block"> {formik.errors.name}</div>) : null}
                            </div>

                            <div className="col-12 mb-3">
                                <input 
                                    disabled={formik.isSubmitting}
                                    onChange={formik.handleChange}
                                    onInput={(e) => formik.setFieldTouched(e.target.name, true, false)}
                                    value={formik.values.email}
                                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : '' }`}
                                    type="email" 
                                    name="email" 
                                    placeholder="E-mail*"
                                />
                                {formik.touched.email && formik.errors.email ? (<div className="invalid-feedback d-block"> {formik.errors.email}</div>) : null}
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

                            <div className="col-12 col-lg-6 mb-3">
                                <InputMask 
                                    disabled={formik.isSubmitting}
                                    onChange={formik.handleChange}
                                    onInput={(e) => formik.setFieldTouched(e.target.name, true, false)}
                                    value={formik.values.birthday}
                                    className={`form-control ${formik.touched.birthday && formik.errors.birthday ? 'is-invalid' : '' }`}
                                    type="text" 
                                    name="birthday" 
                                    mask='99/99/9999'
                                    placeholder="Data de nascimento*" 
                                />
                                {formik.touched.birthday && formik.errors.birthday ? (<div className="invalid-feedback d-block"> {formik.errors.birthday}</div>) : null}
                            </div>

                            <div className="col-12 col-lg-6 mb-3">
                                <select 
                                    disabled={formik.isSubmitting}
                                    onChange={(e) => {formik.handleChange(e); formik.setFieldTouched(e.target.name, true, false)}}
                                    value={formik.values.gender}
                                    className={`form-select ${formik.touched.gender && formik.errors.gender ? 'is-invalid' : '' }${formik.values.gender == '' ? ' is-empty': ''}`} 
                                    name="gender" 
                                    placeholder="Gênero*"
                                >
                                    <option value="" disabled hidden> Gênero* </option>

                                    { genderOptions.map((item, index) => 
                                        <option value={index+1} key={index} > {item} </option>
                                    )}

                                </select>
                                {formik.touched.gender && formik.errors.gender ? (<div className="invalid-feedback d-block"> {formik.errors.gender}</div>) : null}
                            </div>

                            <div id="gray-area" className="my-lg-2">
                                <div className="row h-100 align-items-center">
                                    <div className="col-12 col-lg-6 mb-3">
                                        <select
                                            disabled={formik.isSubmitting}
                                            onChange={(e) => {formik.handleChange(e); formik.setFieldTouched(e.target.name, true, false)}}
                                            value={formik.values.role}
                                            className={`form-select ${formik.touched.role && formik.errors.role ? 'is-invalid' : ''}${formik.values.role == '' ? ' is-empty': ''}`}
                                            name="role"
                                            placeholder="Perfil"
                                        >
                                            <option value="" disabled hidden> Perfil </option>
                                            { roleOptions.map((item, index) => 
                                                <option value={index+1} key={index} > {item} </option>
                                            )}
                                        </select>
                                        {formik.touched.role && formik.errors.role ? (<div className="invalid-feedback d-block"> {formik.errors.role}</div>) : null}
                                    </div>

                                    <div className="col-12 col-lg-6 mb-3">
                                        <input 
                                            disabled={formik.isSubmitting}
                                            onChange={formik.handleChange}
                                            onInput={(e) => formik.setFieldTouched(e.target.name, true, false)}
                                            value={formik.values.company}
                                            className={`form-control ${formik.touched.company && formik.errors.company ? 'is-invalid' : '' }`}
                                            type="text" 
                                            name="company"
                                            placeholder="Organização"
                                        />
                                        {formik.touched.company && formik.errors.company ? (<div className="invalid-feedback d-block"> {formik.errors.company}</div>) : null}
                                    </div>
                                </div>
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
                    
                    <div className="order-1 order-md-2 col-12 col-md-6 col-lg-8 px-5 d-flex justify-content-center pb-4">
                    
                        <div className="d-flex flex-column align-items-center">
                            <img className="mb-4 img-fluid"src={avatarOptions[imgAvatar]}></img>
                            <div className="d-flex justify-content-between mx-lg-5">
                                {avatarOptions.map((item, index) => 
                                    <button onClick={(e)=> {setImgAvatar(index)}} className="btn rounded-circle p-0 mx-1 mx-lg-3" ><img className="img-fluid" src={item} key={index}/></button>
                                )}
                            </div>
                        </div>

                    </div>
                    

				</div>
                

            </div>
        
            <div id="loadingOverlay" className={`${loadingOverlay ? 'open':''}`}>
                <Spinner className="spinner-border spinner-border text-light" isLoading={loadingOverlay}  />
            </div>        

            
        </main>
    )

}


export default UpdateProfile;