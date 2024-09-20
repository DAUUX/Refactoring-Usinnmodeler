import React, { useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Toast } from "../../components/Toast";
import api from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";

import usinnModeler from "../../assets/icons/usinn-logo-horiz.png";

export default function AlterPassword(props) {

  useEffect(() => {
    document.title = 'Alterar Senha - USINN Modeler';
  },[]);

  const navigate = useNavigate();
  const { token } = useParams()

  const formik = useFormik({
    initialValues: {
      novaSenha: "",
      confirmarSenha: "",
    },
    validationSchema: Yup.object({
      novaSenha: Yup.string().min(8, "A senha deve ter pelo menos 8 caracteres").required("Nova senha é obrigatória"),
      confirmarSenha: Yup.string().oneOf([Yup.ref("novaSenha"), null], "As senhas devem coincidir").required("Confirmação de senha é obrigatória"),
    }),
    validateOnChange: true, // Esta linha ativa a validação à medida que o usuário digita
    
    onSubmit: async (values) => {
      try {
        await api.post('reset-password', { token, password: values.novaSenha });
        navigate('/login');
        Toast('success', 'Senha alterada com sucesso!', "key");
      } catch (error) {
        if(error === "TypeError: Cannot read properties of undefined (reading 'status')"){
          Toast('error', "Falha na conexão ao servidor", "errorServer");
        }
        else{
            Toast('error', error, "aviso");
        }
      }
    },
  });

  return (
    <main className="d-flex flex-fill flex-column align-items-center pb-2 pb-sm-5" aria-labelledby="region">
      <div className="w-100 d-flex justify-content-center bg-white py-2 py-sm-3">
        <img src={usinnModeler} alt="" />
      </div>

      <div className="h-75 d-flex flex-column justify-content-center mt-5 col-12 col-md-8 col-lg-4">      
        <div className="text-center">
          <FontAwesomeIcon icon={faKey} className="mb-2 mb-sm-5 p-3 bg-white rounded-circle" size="3x" color="#007BFF" />
          <h1 id="region" className="h2 fw-bold">Defina a nova senha</h1>
          <p className="mb-4">
            Sua nova senha deve ser diferente das usadas anteriormente.
          </p>
        </div>

        <form className={`row m-0 justify-content-center`} onSubmit={formik.handleSubmit}>
          <div className="col-12 mb-3">
            <input
              autoFocus
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // Esta linha garante que o campo seja marcado como "tocado" para mostrar os erros ao usuário
              value={formik.values.novaSenha}
              className={`form-control ${formik.touched.novaSenha && formik.errors.novaSenha ? "is-invalid" : ""}`}
              type="password"
              placeholder="Nova senha"
              name="novaSenha"
            />
            {formik.touched.novaSenha && formik.errors.novaSenha ? (<strong className="invalid-feedback d-block">{formik.errors.novaSenha}</strong>) : null}
          </div>

          <div className="col-12 mb-3">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmarSenha}
              className={`form-control ${formik.touched.confirmarSenha && formik.errors.confirmarSenha ? "is-invalid" : "" }`}
              type="password"
              placeholder="Confirme a nova senha"
              name="confirmarSenha"
            />
            {formik.touched.confirmarSenha && formik.errors.confirmarSenha ? (<strong className="invalid-feedback d-block">{formik.errors.confirmarSenha}</strong>) : null}
          </div>

          <div className="col-12 d-grid mt-2">
            <button className="btn btn-primary btn-lg" type="submit">
              Alterar Senha
            </button>
          </div>
          
        </form>
        <div className="col-12 text-center pt-5">
          <Link className="text-reset text-decoration-none fw-bold h5" to="/login" > <i className="bi bi-arrow-left"></i> Voltar para login</Link>
        </div>
      </div>
    </main>
  );
}
