import usinnModeler from "../../assets/icons/usinn-logo-horiz.png";
import { Link, useHistory } from "react-router-dom";
import { useRef, useState } from "react";
import { Toast } from "../../components/Toast";
import api from "../../services/api";
import Spinner from "../../components/Spinner";
import SimpleReactValidator from "simple-react-validator";
import 'simple-react-validator/dist/locale/pt';


function Login() {
	const history = useHistory();
	const [loading, setLoading]   = useState(false);
	const [email, setEmail]       = useState('');
	const [password, setPassword] = useState('');
	const [, wasValidated]        = useState();

	const [isDirty, setIsDirty] = useState({email: false, password: false})

	const validator = useRef(new SimpleReactValidator({locale: 'pt'}));

	async function handleLogin(e) {

		e.preventDefault();

		setLoading(true);

		const data = {email, password};
		
		if (validator.current.allValid()) {

			try {

				const response = await api.post('signin', data);
	
				const {token, id, name, email} = response.data;
	
				api.defaults.headers.common['x-access-token'] = token;
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify({id, name, email}));
	
				Toast('success', 'Login realizado com sucesso!');

				history.push('/modeler');
	
			} catch (error) {
	
				Toast('error', error);
				
			}

		} else {
			validator.current.showMessages(true);
			setIsDirty({email: true, password: true});
			wasValidated(1);
		}

		setLoading(false);

	}
	
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

						<form className={`row justify-content-center`} onSubmit={handleLogin}>
							<div className="col-12 mb-3">
								<input
									autoFocus
									disabled={loading}
									value={email}
									onChange={e => {setEmail(e.target.value); setIsDirty({...isDirty, email: true}) }}
									onFocus={() => { if (isDirty.email) validator.current.showMessageFor('email')}}
									className={`form-control ${!validator.current.fieldValid('email') && isDirty.email ? 'is-invalid' : '' }`}
									type="email"
									name="email"
									placeholder="E-mail"
								/>
								{validator.current.message("email", email, "required|min:3|max:100|email", { className: 'invalid-feedback d-block' })}
							</div>

							<div className="col-12 mb-3 d-flex flex-column">
								<input
									disabled={loading}
									value={password}
									onChange={e => {setPassword(e.target.value); setIsDirty({...isDirty, password: true}) }}
									onFocus={() => { if (isDirty.password) validator.current.showMessageFor('senha')}}
									className={`form-control ${!validator.current.fieldValid('senha') && isDirty.password ? 'is-invalid' : '' }`}
									type="password"
									name="password"
									placeholder="Senha"
								/>
								{validator.current.message("senha", password, "required|min:8", { className: 'invalid-feedback d-block' })}

								<a className="text-decoration-none ms-auto mt-2" href="#">Esqueceu sua senha?</a>
							</div>

							<div className="col-12 d-grid gap-2 mt-2">
								<button className="btn btn-primary btn-lg" type="submit">
									<Spinner className="spinner-border spinner-border-sm me-2" isLoading={loading}  /> ACESSAR
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
