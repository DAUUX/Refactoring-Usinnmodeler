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
			wasValidated(1);
		}

		setLoading(false);

	}
	
	return (
		<main className="h-100 d-flex align-items-center">

			<div className="container">

				<div className="row pb-3">
					<div className="col-12 d-flex justify-content-center align-items-center">
						<img src={usinnModeler} alt="logo USINN" />
						<span className="text-primary fs-3 fw-light ms-2">Modeler</span>
					</div>
				</div>

				<div className="row justify-content-center mt-5">

					<div className="col-12 col-md-8 col-lg-4">

						<form className="row justify-content-center" onSubmit={handleLogin}>
							<div className="col-12 mb-3">
								<input
									autoFocus
									disabled={loading}
									value={email}
									onChange={e => setEmail(e.target.value)}
									className="form-control"
									type="email"
									name="email"
									placeholder="Email"
								/>
								{validator.current.message("email", email, "required|min:3|max:100|email", { className: 'invalid-feedback d-block' })}
							</div>

							<div className="col-12 mb-3">
								<input
									disabled={loading}
									value={password}
									onChange={e => setPassword(e.target.value)}
									className="form-control"
									type="password"
									name="password"
									placeholder="Senha"
								/>
								{validator.current.message("senha", password, "required|min:8", { className: 'invalid-feedback d-block' })}
							</div>

							<div className="col-12 d-grid gap-2 mt-2">
								<button className="btn btn-primary btn-lg" type="submit">
									<Spinner className="spinner-border spinner-border-sm me-2" isLoading={loading}  /> ACESSAR
								</button>
							</div>

							<div className="col-12 text-center mt-3">
								<p>Esqueceu sua senha? <a className="text-decoration-none text-muted" href="#">Clique aqui</a></p>
							</div>

							<div className="col-12 text-center mt-5">
								<Link className="btn btn-secondary me-3" type="button" to="/cadastro" >Criar conta</Link>
							</div>

						</form>
						
					</div>
				</div>

			</div>

		</main>
	);
}

export default Login;
