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
import "./style.scss";
import { roleOptions, genderOptions } from '../../Consts';

function Register() {
	const history = useHistory();
	const validator = useRef(new SimpleReactValidator({locale: 'pt', messages: {accepted: 'O campo é inválido.'}}));
	
	const [loading, setLoading]   = useState(false);
	const [name, setName]         = useState('');
	const [email, setEmail]       = useState('');
	const [birthday, setBirthday] = useState('');
	const [gender, setGender]     = useState('');
	const [password, setPassword] = useState('');
	const [company, setCompany]   = useState('');
	const [role, setRole]         = useState('');
	const [accept, setAccept]     = useState(false);
	const [, wasValidated]        = useState();

	const [isDirty, setIsDirty] = useState({name: false, email: false, birthday: false, gender: false, password: false, company: false, role: false});

	async function handleRegister(e) {

		e.preventDefault();

		setLoading(true);
		const data = {name, email, birthday: moment(birthday, 'DD/MM/YYYY', true).format('YYYY-MM-DD'), gender, password, company, role, accept};

		if (validator.current.allValid() && accept) {
		
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
	
	return (
		<main id="register-page" className="flex-fill d-flex align-items-center">  
		    
			<div className="container py-5">

				<div className="row pb-3">
					<div className="col-12 d-flex justify-content-center align-items-center">
						<img src={usinnModeler} alt="logo USINN" />
						<span className="text-primary fs-3 fw-light ms-2">Modeler</span>
					</div>
				</div>

				<div id="content" className="row position-relative justify-content-center mt-5">
					
					<div className="col-12 col-md-8 col-lg-4">

						<form className="row" noValidate="" onSubmit={handleRegister}>
								
								<div className="col-12 mb-3">
									<input 
										autoFocus 
										disabled={loading} 
										onChange={e => {setName(e.target.value)}}
										onInput={() =>{setIsDirty({...isDirty, name: true}); validator.current.showMessageFor('nome')}}
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
										onChange={e => {setEmail(e.target.value)}}
										onInput={() => {setIsDirty({...isDirty, email: true}); validator.current.showMessageFor('email')}}
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
										onChange={e => {setPassword(e.target.value)}}
										onInput={() => {setIsDirty({...isDirty, password: true}); validator.current.showMessageFor('senha')}}
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
										onChange={e => {setBirthday(e.target.value)}}
										onInput={() => {setIsDirty({...isDirty, birthday: true}); validator.current.showMessageFor('data de nascimento')}}
										className={`form-control ${!validator.current.fieldValid('data de nascimento') && isDirty.birthday ? 'is-invalid' : '' }`}
										type="text" 
										name="birthday" 
      									mask='99/99/9999'
										placeholder="Data de nascimento" 
										value={birthday} 
									/>
									{validator.current.message("data de nascimento", moment(birthday, "DD/MM/YYYY", true).isValid(), "required|accepted", { className: 'invalid-feedback d-block' })}
								</div>

								<div className="col-12 col-lg-6 mb-3">
									<select 
										required
										disabled={loading} 
										onChange={e => {setGender(e.target.value); setIsDirty({...isDirty, gender: true}); validator.current.showMessageFor('gênero')}}
										className={`form-select ${!validator.current.fieldValid('gênero') && isDirty.gender ? 'is-invalid' : '' }`} 
										name="gender" 
										placeholder="Gênero" 
										value={gender}
									>
										<option value="" disabled selected hidden> Gênero </option>

										{ genderOptions.map((item, index) => 
											<option value={index+1} key={index} > {item} </option>
										)}

									</select>
									{validator.current.message("gênero", gender, "required|integer", { className: 'invalid-feedback d-block' })}
								</div>

								<div id="gray-area" className="my-lg-2">
									<div className="row h-100 align-items-center">
										<div className="col-12 col-lg-6 mb-3">
											<select
												required
												disabled={loading}
												onChange={e => { setRole(e.target.value); setIsDirty({ ...isDirty, role: true }); validator.current.showMessageFor('perfil')}}
												className={`form-select ${!validator.current.fieldValid('perfil') && isDirty.role ? 'is-invalid' : ''}`}
												name="role"
												placeholder="Perfil"
												value={role}
											>
												<option value="" disabled selected hidden> Perfil </option>
												{ roleOptions.map((item, index) => 
													<option value={index+1} key={index} > {item} </option>
												)}
											</select>
											{validator.current.message("perfil", role, "integer", { className: 'invalid-feedback d-block' })}
										</div>

										<div className="col-12 col-lg-6 mb-3">
											<input 
												disabled={loading} 
												onChange={e => {setCompany(e.target.value)}}
												onInput={() => {setIsDirty({ ...isDirty, role: true }); validator.current.showMessageFor('organização')}}
												className={`form-control ${!validator.current.fieldValid('organização') && isDirty.company ? 'is-invalid' : '' }`}
												type="text" 
												name="company" 
												placeholder="Organização" 
												value={company} 
											/>
											{validator.current.message("organização", company, "max:100", { className: 'invalid-feedback d-block' })}
										</div>
									</div>
								</div>

								<div className="col-12 d-flex justify-content-center py-3">
									<div className="form-check">

										<input 
											required
											onChange={e => setAccept(!accept)}
											name="accept" 
											className="form-check-input" 
											type="checkbox" 
											checked={accept}
											id="acceptCheckbox"
										/>

										<label className="form-check-label text-muted" htmlFor="acceptCheckbox"> 
											Li e aceito os <a className="text-reset text-decoration-none fw-bold" href="#"> termos de uso </a> 
										</label>

									</div>
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