import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Toast } from "../../components/Toast";
import api from "../../services/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import Spinner from "../../components/Spinner";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import usinnModeler from "../../assets/icons/usinn-logo-horiz.png";

function AlterPassword(props) {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      novaSenha: '',
      confirmarSenha: '',
    },
    validationSchema: Yup.object({
      novaSenha: Yup.string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .required('Nova senha é obrigatória'),
      confirmarSenha: Yup.string()
        .oneOf([Yup.ref('novaSenha'), null], 'As senhas devem coincidir')
        .required('Confirmação de senha é obrigatória'),
    }),
    validateOnChange: true,  // Esta linha ativa a validação à medida que o usuário digita
    onSubmit: async values => {
      try {
        let token = props.match.params.token;
        await api.post('reset-password', { token, password: values.novaSenha });
        history.push('/sucesso');
        Toast('success', 'Senha alterada com sucesso!');
      } catch (error) {
        console.error(error);
        Toast('error', error);
      }
    },
  });

  return (
    <main className="flex-fill d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-8 col-lg-4 text-center">
            <div className="logo-container">
              <img src={usinnModeler} alt="logo USINN" style={{ width: '100px', height: 'auto', marginTop: '20px', position: 'fixed', top: '0', left: '50%', transform: 'translateX(-50%)' }} />
            </div>
            <div className="text-center" style={{ marginTop: '-10px', marginBottom: '100px' }}>
              <FontAwesomeIcon icon={faKey} size="3x" color="#007BFF" />
            </div>
            <h2>Defina a <strong>nova senha</strong></h2>
            <p className="text-muted text-center mb-4">
              Sua nova senha deve ser diferente das usadas anteriormente.
            </p>
            <div>
              <form className={`row justify-content-center`} onSubmit={formik.handleSubmit}>
                <div className="col-12 mb-3">
                  <input
                    autoFocus
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}  // Esta linha garante que o campo seja marcado como "tocado" para mostrar os erros ao usuário
                    value={formik.values.novaSenha}
                    className={`form-control ${formik.touched.novaSenha && formik.errors.novaSenha ? 'is-invalid' : ''}`}
                    type="password"
                    placeholder="Nova senha"
                    name="novaSenha"
                  />
                  {formik.touched.novaSenha && formik.errors.novaSenha ? (
                    <div className="invalid-feedback d-block">{formik.errors.novaSenha}</div>
                  ) : null}
                </div>
                <div className="col-12 mb-3">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmarSenha}
                    className={`form-control ${formik.touched.confirmarSenha && formik.errors.confirmarSenha ? 'is-invalid' : ''}`}
                    type="password"
                    placeholder="Confirme a nova senha"
                    name="confirmarSenha"
                  />
                  {formik.touched.confirmarSenha && formik.errors.confirmarSenha ? (
                    <div className="invalid-feedback d-block">{formik.errors.confirmarSenha}</div>
                  ) : null}
                </div>
                <div className="col-12 d-grid gap-2 mt-2">
                  <button className="btn btn-primary btn-lg" type="submit">
                    Alterar Senha
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AlterPassword;
