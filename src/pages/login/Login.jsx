import usinnModeler from "../../assets/icons/usinn-logo-horiz.png";
import { Link, useHistory } from "react-router-dom";
import { Toast } from "../../components/Toast";
import api from "../../services/api";
import Spinner from "../../components/Spinner";
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login() {
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
	
				Toast('error', error, "errorCircle");
				
			}
   
		},
   
	});
	
	return (
		<main className="flex-fill d-flex align-items-center">

			<div className="container">

				<div className="row pb-3">
					<div className="col-12 d-flex justify-content-center align-items-center">
						<img src={usinnModeler} alt="logo USINN" />
						<span className="text-primary fs-3 fw-light ms-2">Modeler</span>
					</div>
				</div>

				<div className="row justify-content-center mt-5">

					<div className="col-12 col-md-8 col-lg-4">

						<form className={`row justify-content-center`} onSubmit={formik.handleSubmit}>
							<div className="col-12 mb-3">
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
								{formik.touched.email && formik.errors.email ? (<div className="invalid-feedback d-block"> {formik.errors.email}</div>) : null}
							</div>

							<div className="col-12 mb-3 d-flex flex-column">
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
								
								<Link className="text-decoration-none mt-2 ms-auto" to="/request-change">Esqueceu sua senha?</Link> 
							</div>

							<div className="col-12 d-grid gap-2 mt-2">
								<button className="btn btn-primary btn-lg" type="submit">
									<Spinner className="spinner-border spinner-border-sm me-2" isLoading={formik.isSubmitting}  /> ACESSAR
								</button>
							</div>

							<div className="col-12 text-center mt-5">
								<p> Não tem conta ainda? <Link className="fw-bold text-decoration-none" to="/cadastro">Registre-se</Link> </p>

							</div>

						</form>
						
					</div>
				</div>

			</div>

		</main>
	);
}

export default Login;
