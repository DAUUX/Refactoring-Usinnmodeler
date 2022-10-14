import usinnModeler from "../../assets/icons/usinn-logo-horiz.png";
import { Link, useHistory } from "react-router-dom";
import { useRef, useState } from "react";
import SimpleReactValidator from 'simple-react-validator';
import 'simple-react-validator/dist/locale/pt';
import Spinner from "../../components/Spinner";
import { Toast } from '../../components/Toast';
import api from "../../services/api";
import InputMask from 'react-input-mask';
import moment from "moment";

function Register() {
	
	const history = useHistory();
	const validator = useRef(new SimpleReactValidator({locale: 'pt'}));

	const [loading, setLoading]   = useState(false);
	const [name, setName]         = useState('');
	const [email, setEmail]       = useState('');
	const [birthday, setBirthday] = useState('');
	const [gender, setGender]     = useState('');
	const [password, setPassword] = useState('');
	const [company, setCompany]   = useState('');
	const [role, setRole]         = useState('');
	const [, wasValidated]        = useState();

	const [isDirty, setIsDirty] = useState({name: false, email: false, birthday: false, gender: false, password: false, company: false, role: false});

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
			setIsDirty({name: true, email: true, password: true, company: true, role: true});
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
									<input 
										autoFocus 
										disabled={loading} 
										onChange={e => {setName(e.target.value); setIsDirty({...isDirty, name: true}) }}
										onFocus={() => validator.current.showMessageFor('nome')}
										className={`form-control ${!validator.current.fieldValid('nome') && isDirty.name ? 'is-invalid' : '' }`}
										type="text" 
										name="name" 
										placeholder="Nome completo" 
										value={name}
									/>
									{validator.current.message("nome", name, ["required",{min:3}, {max:100},{regex:/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/}], { className: 'invalid-feedback d-block' })}
								</div>

								<div className="col-12 mb-3">
									<input 
										disabled={loading} 
										onChange={e => {setEmail(e.target.value); setIsDirty({...isDirty, email: true}) }}
										onFocus={() => validator.current.showMessageFor('email')}
										className={`form-control ${!validator.current.fieldValid('email') && isDirty.email ? 'is-invalid' : '' }`}
										type="email" 
										name="email" 
										placeholder="E-mail" 
										value={email}
									/>
									{validator.current.message("email", email, "required|min:3|max:100|email", { className: 'invalid-feedback d-block' })}
								</div>

								<div className="col-12 mb-3">
									<input 
										disabled={loading} 
										onChange={e => {setPassword(e.target.value); setIsDirty({...isDirty, password: true}) }}
										onFocus={() => validator.current.showMessageFor('senha')}
										className={`form-control ${!validator.current.fieldValid('senha') && isDirty.password ? 'is-invalid' : '' }`}
										type="password" 
										name="password" 
										placeholder="Senha" 
										value={password} 
									/>
									{validator.current.message("senha", password, "required|min:8", { className: 'invalid-feedback d-block' })}
								</div>

								<div className="col-12 col-lg-6 mb-3">
									<InputMask 
										disabled={loading} 
										onChange={e => {setBirthday(e.target.value); setIsDirty({...isDirty, birthday: true}) }}
										onFocus={() => validator.current.showMessageFor('data de nascimento')}
										className={`form-control ${!validator.current.fieldValid('data de nascimento') && isDirty.birthday ? 'is-invalid' : '' }`}
										type="text" 
										name="birthday" 
      									mask='99/99/9999'
										placeholder="Data de nascimento" 
										value={birthday} 
									/>
									{validator.current.message("data de nascimento", moment(birthday, "DD/MM/YYYY"), "required|date", { className: 'invalid-feedback d-block' })}
								</div>

								<div className="col-12 col-lg-6 mb-3">
									<select 
										disabled={loading} 
										onChange={e => {setGender(e.target.value); setIsDirty({...isDirty, gender: true}) }}
										onFocus={() => validator.current.showMessageFor('gênero')}
										className={`form-select ${!validator.current.fieldValid('gênero') && isDirty.gender ? 'is-invalid' : '' }`} 
										name="gender" 
										placeholder="Gênero" 
										value={gender}
									>
										<option value="" disabled selected hidden> Gênero </option>
										<option value="1"> Feminino </option>
										<option value="2"> Masculino </option>
										<option value="3"> Prefiro não informar </option>
									</select>
									{validator.current.message("gênero", gender, "required|integer", { className: 'invalid-feedback d-block' })}
								</div>

								<div className="col-12 col-lg-6 mb-3">
									<select
										disabled={loading}
										onChange={e => { setRole(e.target.value); setIsDirty({ ...isDirty, role: true }) }}
										onFocus={() => validator.current.showMessageFor('perfil')}
										className={`form-select ${!validator.current.fieldValid('perfil') && isDirty.role ? 'is-invalid' : ''}`}
										name="role"
										placeholder="Perfil"
										value={role}
									>
										<option value="" disabled selected hidden> Perfil </option>
										<option value="1"> Estudante </option>
										<option value="2"> Pesquisador </option>
										<option value="3"> Profissional </option>
									</select>
									{validator.current.message("perfil", role, "integer", { className: 'invalid-feedback d-block' })}
								</div>

								<div className="col-12 col-lg-6 mb-3">
									<input 
										disabled={loading} 
										onChange={e => {setCompany(e.target.value); setIsDirty({...isDirty, company: true}) }}
										onFocus={() => validator.current.showMessageFor('organização')}
										className={`form-control ${!validator.current.fieldValid('organização') && isDirty.company ? 'is-invalid' : '' }`}
										type="text" 
										name="company" 
										placeholder="Organização" 
										value={company} 
									/>
									{validator.current.message("organização", company, "max:100", { className: 'invalid-feedback d-block' })}
								</div>

								<div className="col-12 d-grid gap-2 mt-2">
									<button className="btn btn-primary btn-lg" type="submit">
										<Spinner className="spinner-border spinner-border-sm me-2" isLoading={loading}  /> CRIAR CONTA
									</button>
								</div>

								<div className="col-12 text-center mt-4">
								<Link className="text-decoration-none text-muted fw-bold" to="/login" > <i className="bi bi-arrow-left"></i> Voltar para login</Link>
								</div>

						</form>
					</div>
				</div>

			</div>
		</main>
	);
}

export default Register;