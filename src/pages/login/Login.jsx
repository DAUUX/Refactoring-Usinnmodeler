import usinnModeler from "../../assets/icons/usinn-logo-horiz.png";
import { Link, useHistory } from "react-router-dom";
import { Toast } from "../../components/Toast";
import api from "../../services/api";
import Spinner from "../../components/Spinner";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from "react";

export default function Login() {

	useEffect(() => {
    document.title = 'Login / USINN Modeler';
  },[]);

	const history = useHistory();

	const formik = useFormik({

		initialValues: {
 			email: '',
			password: ''
		},
   
		validationSchema: Yup.object({
			email: Yup.string().email('Endereço de e-mail inválido').required('E-mail é obrigatório'),
			password: Yup.string().min(8, 'Senha deve ter no mínimo 8 caracteres').required('Senha é obrigatória'),
		}),
   
		onSubmit: async values => {
   
			try {

				const response = await api.post('signin', values);
	
				const {token, id, name, email} = response.data;
	
				api.defaults.headers.common['x-access-token'] = token;
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify({id, name, email}));
	
				Toast('success', 'Login realizado com sucesso!', "checkCircle");

				history.push('/dashboard');
	
			} catch (error) {
	
				if(error == "TypeError: Cannot read properties of undefined (reading 'status')"){
					Toast('error', "Falha na conexão ao servidor", "errorServer");
				}
				else{
					Toast('error', error, "aviso");
				}
				
			}
		},
	});
	
	return (
		<main className="flex-fill d-flex align-items-center" aria-label="formulário de login">
			<div className="container">

				<div className="py-3 d-flex justify-content-center align-items-center" aria-hidden="true">
					<img src={usinnModeler} alt="" />
					<span className="text-primary fs-3 fw-light ms-2">Modeler</span>
				</div>

				<form className="row m-auto mt-5 col-12 col-md-8 col-lg-4" onSubmit={formik.handleSubmit}>

					<div className="mb-3 p-0">
						<input
							autoFocus
							disabled={formik.isSubmitting}
							onChange={formik.handleChange}
							onInput={(e) => formik.setFieldTouched(e.target.name, true, false)}
							value={formik.values.email}
							className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : '' }`}
							type="email"
							name="email"
							placeholder="E-mail*"
						/>
						{formik.touched.email && formik.errors.email ? (<strong className="invalid-feedback m-0 p-0 pt-1"> {formik.errors.email}</strong>) : null}
					</div>

					<div className="mb-3 p-0">
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
						{formik.touched.password && formik.errors.password ? (<strong className="invalid-feedback m-0 p-0 pt-1"> {formik.errors.password}</strong>) : null}
						
						<Link className="mt-2 text-decoration-none float-end" to="/request-change">Esqueceu sua senha?</Link>
					</div> 

					<button className="btn btn-primary btn-lg mt-2" type="submit">
						<Spinner className="spinner-border spinner-border-sm me-2" isLoading={formik.isSubmitting}  /> ACESSAR
					</button>

					<div className="col-12 text-center mt-5">
						<p> Não tem conta ainda? <Link className="fw-bold text-decoration-none" to="/cadastro">Registre-se</Link> </p>
					</div>

				</form>
			</div>
		</main>
	);
}
