import { useState, useEffect } from "react";
import usinnModeler from "../../assets/icons/usinn-logo-horiz.png";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { Toast } from '../../components/Toast';
import api from "../../services/api";
import moment from "moment";
import "./style.scss";
import { roleOptions, genderOptions } from '../../Consts';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export default function Register() {
	const { t } = useTranslation();

	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	let DateTenYears = new Date();
	DateTenYears.setFullYear((new Date()).getFullYear() - 10);

	useEffect(() => {
		document.title = t('Cadastrar - USINN Modeler');
	}, [t]);

	const navigate = useNavigate();

	const formik = useFormik({

		initialValues: {
			name: '',
			email: '',
			birthday: '',
			gender: '',
			password: '',
			company: '',
			role: '',
			accept: false
		},

		validationSchema: Yup.object({
			name: Yup.string()
				.matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, { message: t('O nome só deve conter caracteres') })
				.min(3, t('O nome deve ter no mínimo 3 caracteres'))
				.max(100, t('O nome deve ter no máximo 100 caracteres'))
				.required(t('Nome é obrigatório')),
			email: Yup.string().email(t('Endereço de e-mail inválido')).max(255, t('O email deve ter no máximo 255 caracteres')).required(t('E-mail é obrigatório')),
			password: Yup.string().min(8, t('Senha deve ter no mínimo 8 caracteres')).required(t('Senha é obrigatória')),
			birthday: Yup.date()
				.transform((value, currentValue) => { return moment(currentValue, 'DD/MM/YYYY', true).toDate() })
				.typeError(t('Data é inválida'))
				.min(new Date(0, 0, 1), t('Data de nascimento inválida'))
				.max(DateTenYears, t('Data de nascimento inválida'))
				.required(t('Data de nascimento é obrigatória')),
			gender: Yup.number().integer(t('Valor é inválido')).min(1, t('Valor é inválido')).max(3, t('Valor é inválido')).required(t('Gênero é obrigatório')),
			role: Yup.number().integer(t('Valor é inválido')).required(t('O perfil é obrigatório')),
			company: Yup.string().max(100, t('A organização deve ter no máximo 100 caracteres')).required(t('A organização é obrigatória')),
			accept: Yup.boolean().oneOf([true], t('É necessário aceitar os termos'))
		}),

		onSubmit: async values => {

			try {

				await api.post('signup', { ...values, birthday: moment(values.birthday, 'DD/MM/YYYY', true).format('YYYY-MM-DD') });

				Toast('success', 'Cadastro realizado com sucesso!', "checkCircle");

				navigate('/login');

			} catch (error) {

				if (error === "TypeError: Cannot read properties of undefined (reading 'status')") {
					Toast('error', "Falha na conexão ao servidor", "errorServer");
				}
				else {
					Toast('error', error, "aviso");
				}

			}
		},
	});

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
		<main id="register-page" className="flex-fill d-flex align-items-center register" aria-label={t('formulário de cadastro')}>
			<div className="container py-5 py-sm-0">

				<div className="pb-3 d-flex justify-content-center align-items-center" aria-hidden="true">
					<img src={usinnModeler} alt="" />
					<span className="text-primary fs-3 fw-light ms-2">Modeler</span>
				</div>

				<div id="content" className="row position-relative justify-content-center mt-5">
					<form className="row m-auto mt-5 col-12 col-md-8 col-lg-4" noValidate="" onSubmit={formik.handleSubmit}>

						<div className="col-12 mb-3">
							<input
								autoFocus
								disabled={formik.isSubmitting}
								onChange={formik.handleChange}
								onInput={(e) => formik.setFieldTouched(e.target.name, true, false)}
								value={formik.values.name}
								className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
								type="text"
								name="name"
								placeholder={t('Nome completo')+"*"}
								autoComplete="name"
							/>
							{formik.touched.name && formik.errors.name ? (<strong className="invalid-feedback d-block"> {formik.errors.name}</strong>) : null}
						</div>

						<div className="col-12 mb-3">
							<input
								disabled={formik.isSubmitting}
								onChange={formik.handleChange}
								onInput={(e) => formik.setFieldTouched(e.target.name, true, false)}
								value={formik.values.email}
								className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
								type="email"
								name="email"
								placeholder='E-mail*'
								autoComplete="email"
							/>
							{formik.touched.email && formik.errors.email ? (<strong className="invalid-feedback d-block"> {formik.errors.email}</strong>) : null}
						</div>

						<div className="col-12 mb-3 " style={{ position: 'relative' }}>
							<input
								disabled={formik.isSubmitting}
								onChange={formik.handleChange}
								onInput={(e) => formik.setFieldTouched(e.target.name, true, false)}
								value={formik.values.password}
								className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
								type={showPassword ? "text" : "password"}
								name="password"
								placeholder={t('Senha')+"*"}
							/>
							<div className="">
								<i onClick={togglePasswordVisibility} className={`bi bi-${showPassword ? 'eye-fill' : 'eye-slash-fill'} icon ${formik.touched.password && formik.errors.password ? 'reyeicon-active' : ''}`}></i>
							</div>

							{formik.touched.password && formik.errors.password ? (<strong className="invalid-feedback d-block"> {formik.errors.password}</strong>) : null}
						</div>

						<div className="col-12 col-lg-6 mb-3">
							<input
								disabled={formik.isSubmitting}
								onChange={(e) => { formik.handleChange(e); maskBirth(e) }}
								onInput={(e) => formik.setFieldTouched(e.target.name, true, false)}
								value={formik.values.birthday}
								className={`form-control ${formik.touched.birthday && formik.errors.birthday ? 'is-invalid' : ''}`}
								type="text"
								name="birthday"
								placeholder={t('Data de nascimento')+"*"}
							/>
							{formik.touched.birthday && formik.errors.birthday ? (<strong className="invalid-feedback d-block"> {formik.errors.birthday}</strong>) : null}
						</div>

						<div className="col-12 col-lg-6 mb-3">
							<select
								disabled={formik.isSubmitting}
								onChange={(e) => { formik.handleChange(e); formik.setFieldTouched(e.target.name, true, false) }}
								value={formik.values.gender}
								className={`form-select ${formik.touched.gender && formik.errors.gender ? 'is-invalid' : ''}${formik.values.gender === '' ? ' is-empty' : ''}`}
								name="gender"
								placeholder={t('Gênero')+"*"}
								title={t('seu gênero')}
							>
								<option value="" disabled hidden>{t('Gênero')+"*"}</option>
								{genderOptions.map((item, index) =>
									<option value={index + 1} key={index}> {item} </option>
								)}
							</select>
							{formik.touched.gender && formik.errors.gender ? (<strong className="invalid-feedback d-block"> {formik.errors.gender}</strong>) : null}
						</div>

						<div id="gray-area" className="my-lg-2">
							<div className="row h-100 align-items-center">
								<div className="col-12 col-lg-6 mb-3">
									<select
										disabled={formik.isSubmitting}
										onChange={(e) => { formik.handleChange(e); formik.setFieldTouched(e.target.name, true, false) }}
										value={formik.values.role}
										className={`form-select ${formik.touched.role && formik.errors.role ? 'is-invalid' : ''}${formik.values.role === '' ? ' is-empty' : ''}`}
										name="role"
										placeholder={t('Perfil')}
										title={t('seu perfil')}
									>
										<option value="" disabled hidden>{t('Perfil')+"*"}</option>
										{roleOptions.map((item, index) =>
											<option value={index + 1} key={index}> {item} </option>
										)}
									</select>
									{formik.touched.role && formik.errors.role ? (<strong className="invalid-feedback position-absolute"> {formik.errors.role}</strong>) : null}
								</div>

								<div className="col-12 col-lg-6 mb-3">
									<input
										disabled={formik.isSubmitting}
										onChange={formik.handleChange}
										onInput={(e) => formik.setFieldTouched(e.target.name, true, false)}
										value={formik.values.company}
										className={`form-control ${formik.touched.company && formik.errors.company ? 'is-invalid' : ''}`}
										type="text"
										name="company"
										placeholder={t('Organização')+"*"}
										autoComplete="organization"
									/>
									{formik.touched.company && formik.errors.company ? (<strong className="invalid-feedback position-absolute"> {formik.errors.company}</strong>) : null}
								</div>
							</div>
						</div>

						<div className="col-12 d-flex justify-content-center py-3">
							<div className="form-check">
								<input
									disabled={formik.isSubmitting}
									onChange={(e) => { formik.handleChange(e); formik.setFieldTouched(e.target.name, true, false) }}
									value={formik.values.accept}
									name="accept"
									className="form-check-input border-1 border-dark"
									type="checkbox"
									checked={formik.values.accept}
									id="acceptCheckbox"
								/>
								<label className="form-check-label" htmlFor="acceptCheckbox">
									{t('Li e aceito os')} <Link className="fw-bold text-primary" target="_blank" to="/privacidade">{t('termos de uso')}</Link>
								</label>
								{formik.touched.accept && formik.errors.accept ? (<strong className="invalid-feedback ms-n3 d-block"> {formik.errors.accept}</strong>) : null}
							</div>
						</div>

						<div className="col-12 d-grid gap-2 mt-2">
							<button className="btn btn-primary btn-lg" type="submit">
								<Spinner className="spinner-border spinner-border-sm me-2" isLoading={formik.isSubmitting} /> {t('CRIAR CONTA')}
							</button>
						</div>

						<div className="col-12 text-center mt-4">
							<Link className="text-reset text-decoration-none fw-bold h5" to="/login" > <i className="bi bi-arrow-left"></i> {t('Voltar para login')}</Link>
						</div>

					</form>
				</div>
			</div>
		</main>
	);
}