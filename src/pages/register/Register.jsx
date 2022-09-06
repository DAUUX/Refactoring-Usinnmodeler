import usinnModeler from "../../assets/icons/usinn-logo-horiz.png";
import { Link, useHistory } from "react-router-dom";
import { useRef, useState } from "react";
import SimpleReactValidator from 'simple-react-validator';
import 'simple-react-validator/dist/locale/pt';
import Spinner from "../../components/Spinner";
import { Toast } from '../../components/Toast';
import api from "../../services/api";

function Register() {
	
	const history = useHistory();
	const validator = useRef(new SimpleReactValidator({locale: 'pt'}));

	const [loading, setLoading]   = useState(false);
	const [name, setName]         = useState('');
	const [email, setEmail]       = useState('');
	const [password, setPassword] = useState('');
	const [company, setCompany]   = useState('');
	const [role, setRole]         = useState('');
	const [, wasValidated]        = useState();


	async function handleRegister(e) {

		e.preventDefault();

		setLoading(true);
		const data = {name, email, password, company, role};

		if (validator.current.allValid()) {
		
			try {
				
				await api.post('signup', data);
				
				Toast('success', 'Cadastro realizado com sucesso!');
				
				history.push('/login');
				
			} catch (error) {
				
				Toast('error', error);
				
			}
		
		} else {
			validator.current.showMessages(true);
			wasValidated(1);
		}

		setLoading(false);

	}

	const onCancelButtonClick = () => {
		history.replace("/");
	};
	
	return (
		<main className="h-100 d-flex align-items-center">      
			<div className="container py-5">

				<div className="row pb-3">
					<div className="col-12 d-flex justify-content-center align-items-center">
						<img src={usinnModeler} alt="logo USINN" />
						<span className="text-primary fs-3 fw-light ms-2">Modeler</span>
					</div>
				</div>

				<div className="row justify-content-center mt-5">
					
					<div className="col-12 col-md-8 col-lg-4">

						<form className="row" noValidate="" onSubmit={handleRegister}>
								
								<div className="col-12 mb-3">
									<input autoFocus className="form-control" disabled={loading} type="text" name="name" placeholder="Nome completo" value={name} onChange={e => setName(e.target.value)}/>
									{validator.current.message("nome", name, ["required",{min:3}, {max:100},{regex:/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/}], { className: 'invalid-feedback d-block' })}
								</div>

								<div className="col-12 mb-3">
									<input className="form-control" disabled={loading} type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
									{validator.current.message("email", email, "required|min:3|max:100|email", { className: 'invalid-feedback d-block' })}
								</div>

								<div className="col-12 mb-3">
									<input className="form-control" disabled={loading} type="password" name="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
									{validator.current.message("senha", password, "required|min:8", { className: 'invalid-feedback d-block' })}
								</div>

								<div className="col-12 mb-3">
									<input className="form-control" disabled={loading} type="text" name="company" placeholder="Empresa" value={company} onChange={e => setCompany(e.target.value)} />
									{validator.current.message("empresa", company, "max:100", { className: 'invalid-feedback d-block' })}
								</div>

								<div className="col-12 mb-3">
									<input className="form-control" disabled={loading} type="text" name="role" placeholder="Cargo" value={role} onChange={e=>setRole(e.target.value)} />
									{validator.current.message("cargo", role, "max:100", { className: 'invalid-feedback d-block' })}
								</div>

								<div className="col-12 d-grid gap-2 mt-2">
									<button className="btn btn-primary btn-lg" type="submit">
										<Spinner className="spinner-border spinner-border-sm me-2" isLoading={loading}  /> CRIAR CONTA
									</button>
								</div>

								<div className="col-12 text-center mt-4">
									<p>Já possui uma conta? <Link className="text-decoration-none text-primary" to="/login" >Entre</Link></p>
								</div>

						</form>
					</div>
				</div>

			</div>
		</main>
	);
}

export default Register;