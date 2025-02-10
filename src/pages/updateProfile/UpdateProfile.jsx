import "./style.scss"
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import UserProfile from "../../components/UserProfile";
import { roleOptions, genderOptions, avatarOptions } from '../../Consts';
import { useFormik } from "formik";
import * as Yup from 'yup';
import api from "../../services/api";
import { Toast } from '../../components/Toast';
import moment from "moment";
import Notifications from "../../components/Notifications";
import punycode from 'punycode';

function UpdateProfile() {

    let DateTenYears = new Date();
	DateTenYears.setFullYear((new Date()).getFullYear() - 10);

    useEffect(() => {
        document.title = 'Editar Perfil - USINN Modeler';
    },[]);

    const [loadingOverlay, setLoadingOverlay] = useState(false);

    const [imgAvatar, setImgAvatar] = useState(0);

    const formik = useFormik({

		initialValues: {
			name: '',
 			email: '',
			birthday: '',
			gender: '',
			company: '',
			role: ''
		},
   
		validationSchema: Yup.object({
			name: Yup.string()
				.matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, {message: 'O nome só deve conter caracteres'})
				.min(3, 'O nome deve ter no mínimo 3 caracteres')
				.max(100, 'O nome deve ter no máximo 100 caracteres')
				.required('Nome é obrigatório'),
			email: Yup.string().email('Endereço de e-mail inválido').max(255, 'O email deve ter no máximo 255 caracteres').required('E-mail é obrigatório').test(
				'is-valid-domain',
				'O domínio do e-mail é inválido',
                async (value) => {
                    if (!value) return false;
                    const domain = value.split('@')[1];
                    if (!domain) return false;

                    const decodedDomain = punycode.toUnicode(domain);
                    const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
                    if (!domainPattern.test(decodedDomain) || decodedDomain.includes('..')) return false;

                    try {
                        const response = await fetch(`https://dns.google/resolve?name=${decodedDomain}&type=MX`);
                        if (!response.ok) return false;

                        const data = await response.json();
                        if (data.Status !== 0 || !data.Answer || data.Answer.length === 0) return false
                        return true
                    } catch (error) {
                        return false;
                    }
                }
			),
			birthday: Yup.date()
				.transform((value, currentValue) => { return moment(currentValue, 'DD/MM/YYYY', true).toDate() })
				.typeError('Data é inválida')
				.min(new Date(0, 0, 1), 'Data de nascimento inválida')
				.max(DateTenYears, 'Data de nascimento inválida')
				.required('Data de nascimento é obrigatória'),
			gender: Yup.number().integer('Valor é inválido').min(1, 'Valor é inválido').max(3, 'Valor é inválido').required('Gênero é obrigatório'),
			role: Yup.number().integer('Valor é inválido'),
			company: Yup.string().max(100, 'A organização deve ter no máximo 100 caracteres')
		}),
   
		onSubmit: async values => {
			try {	

				await api.put('user', {...values, birthday: moment(values.birthday, 'DD/MM/YYYY', true).format('YYYY-MM-DD'),avatar: imgAvatar+1});
			

				Toast('success', 'Os dados foram atualizados com sucesso!', "user");
				
				
			} catch (error) {
				
                Toast('error', error, "aviso");
				
			}
   
		},
   
	});

    async function getUser() {
        setLoadingOverlay(true);
        try{
            const res = await api.get(`user`);
            const { name, email, birthday, gender, company, role, avatar } = res.data;
            formik.setFieldValue('name',name);
            formik.setFieldValue('email',email);
            formik.setFieldValue('birthday', moment(birthday, 'YYYY-MM-DD').format('DD/MM/YYYY'));
            formik.setFieldValue('gender',gender);
            formik.setFieldValue('company',company);
            formik.setFieldValue('role',role);
            setImgAvatar(avatar-1);
        } catch(error){

            Toast('error', error, "errorCircle");
            
        }
        setLoadingOverlay(false);
    }

    useEffect(()=>{
        getUser();
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[]) 

    
     const maskBirth = (e) => {
        const input = e.target.value;
        const formatted = input
            .replace(/\D/g, '') // Remove caracteres não numéricos
            .replace(/^(\d{2})(\d)/, '$1/$2') // Adiciona a barra após os 2 primeiros dígitos
            .replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3') // Adiciona a barra após os próximos 2 dígitos
            .replace(/(\d{2})\/(\d{2})\/(\d{4}).*/, '$1/$2/$3'); // Limita o campo a 10 caracteres (DD/MM/AAAA)

        // Atualiza o valor no formulário
        formik.setFieldValue('birthday', formatted);
    };

    return (
        <main id="update" className={`flex-fill h-100 pb-5`}>
            
            
            <nav className="navbar navbar-expand-lg bg-white p-3 px-1 px-sm-3 justify-content-between w-100">
                <div className="container-fluid">
                    <div className="mb-0 h4">
                        <b>Atualizar Perfil</b>
                    </div>
                    <div className="d-flex align-items-center gap-2 ms-auto">
                        <Notifications/>
                        <UserProfile/>
                    </div>
                </div>
            </nav>

            <div className="container px-0 px-sm-0">
            
                <div id="content" className="row justify-content-between position-relative mt-5 mx-3">
					
					<div className="order-2 order-lg-1 col-12 col-md-6 col-lg-4 m-auto">

						<form className="row px-0 px-sm-3" noValidate="" onSubmit={formik.handleSubmit}>
        
								
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
                                    autoComplete="name"
                                    aria-label="campo do nome"
                                />
                                {formik.touched.name && formik.errors.name ? (<div className="invalid-feedback d-block"> {formik.errors.name}</div>) : null}
                            </div>

                            <div className="col-12 mb-3">
                                <input 
                                    disabled={formik.isSubmitting}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    onInput={(e) => formik.setFieldTouched(e.target.name, true, false)}
                                    value={formik.values.email}
                                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : '' }`}
                                    type="email" 
                                    name="email" 
                                    placeholder="E-mail*"
                                    autoComplete="email"
                                    aria-label="campo dp e-mail"
                                />
                                {formik.touched.email && formik.errors.email ? (<div className="invalid-feedback d-block"> {formik.errors.email}</div>) : null}
                            </div>

                            <div className="col-12 col-lg-6 mb-3">
                                <input 
                                    disabled={formik.isSubmitting}
                                    onChange={(e) => {formik.handleChange(e); maskBirth(e)}}
                                    onInput={(e) => formik.setFieldTouched(e.target.name, true, false)}
                                    value={formik.values.birthday}
                                    className={`form-control ${formik.touched.birthday && formik.errors.birthday ? 'is-invalid' : '' }`}
                                    type="text" 
                                    name="birthday" 
                                    placeholder="Data de nascimento*"
                                    aria-label="campo da data de nascimento"
                                />
                                {formik.touched.birthday && formik.errors.birthday ? (<div className="invalid-feedback d-block"> {formik.errors.birthday}</div>) : null}
                            </div>

                            <div className="col-12 col-lg-6 mb-3">
                                <select 
                                    disabled={formik.isSubmitting}
                                    onChange={(e) => {formik.handleChange(e); formik.setFieldTouched(e.target.name, true, false)}}
                                    value={formik.values.gender}
                                    className={`form-select ${formik.touched.gender && formik.errors.gender ? 'is-invalid' : '' }${formik.values.gender === '' ? ' is-empty': ''}`} 
                                    name="gender" 
                                    placeholder="Gênero*"
                                    aria-label="selecione seu gênero"
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
                                            className={`form-select ${formik.touched.role && formik.errors.role ? 'is-invalid' : ''}${formik.values.role === '' ? ' is-empty': ''}`}
                                            name="role"
                                            placeholder="Perfil"
                                            aria-label="selecione seu perfil"
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
                                            autoComplete="organization"
                                            aria-label="campo da organização"
                                        />
                                        {formik.touched.company && formik.errors.company ? (<div className="invalid-feedback d-block"> {formik.errors.company}</div>) : null}
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center px-0 gap-4">
                                
                                <div className="text-center mt-2 outline-black">
                                    <Link className="text-decoration-none btn text-primary fw-bold px-4 px-sm-5 border-dark" to="/dashboard" >Cancelar</Link>
                                </div>
                                
                                <div className="mt-2">
                                    <button className="btn btn-primary px-4 px-sm-5" type="submit">
                                        <Spinner className="spinner-border spinner-border-sm me-2" isLoading={formik.isSubmitting}  /> Confirmar
                                    </button>
                                </div>
    
                            </div>                    
                            
						</form>
					</div>
                    
                    <div className="order-1 order-lg-2 col-12 col-lg-6 px-0 d-flex justify-content-center pb-5 pb-lg-0" id="avatares">
                    
                        <div className="d-flex flex-column align-items-center">
                            <img className="mb-4 img-fluid"src={avatarOptions[imgAvatar]} alt=""></img>
                            <div className="d-flex justify-content-between outline-black">
                                {avatarOptions.map((item, index) => 
                                    <button key={index} onClick={(e)=> {setImgAvatar(index)}} className="btn rounded-circle p-0 mx-1 mx-lg-3" aria-label={`Escolher o avatar ${index + 1}`} ><img className="img-fluid" src={item} alt=""/></button>
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