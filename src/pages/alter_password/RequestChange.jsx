import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { Toast } from "../../components/Toast";
import api from "../../services/api";
import Spinner from "../../components/Spinner";

import usinnModeler from "../../assets/icons/usinn-logo-horiz.png";

export default function RequestChange() {

  useEffect(() => {
    document.title = 'Recuperar Senha - USINN Modeler';
  },[]);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviadoComSucesso, setEnviadoComSucesso] = useState(false); // Estado para controlar o envio bem-sucedido

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    
    try {
      // Simule a lógica de envio de email de redefinição de senha (substitua com sua lógica real)
      await api.post("recover-password", { email });
      // Redirecionamento após envio bem-sucedido (substitua com o caminho correto)
      setEnviadoComSucesso(true);
      // history.push('/sucesso'); // Você pode ou não redirecionar para outra página, dependendo de como deseja implementar isso.
    } catch (error) {

      Toast('error', error, "errorCircle");

    }
    setLoading(false);
  };

  return (
    <main className="d-flex flex-fill flex-column align-items-center pb-2 pb-sm-5" aria-labelledby="region">
      <div className="w-100 d-flex justify-content-center bg-white py-2 py-sm-3">
        <img src={usinnModeler} alt="" />
      </div>

      <div className="h-75 d-flex flex-column justify-content-center mt-5 col-12 col-md-8 col-lg-4">

        {!enviadoComSucesso ? ( // Renderiza o formulário apenas se não for enviado com sucesso
          <div>
            <div className="text-center mb-4" >
              <FontAwesomeIcon icon={faKey} className="mb-2 mb-sm-5 p-3 bg-white rounded-circle" size="3x" color="#007BFF" />
              <h1 id="region" className="h2">Esqueceu sua senha?</h1>
              <p>Não se preocupe, enviaremos as instruções de recuperação.</p>
            </div>

            <form className={`row m-0 justify-content-center`} onSubmit={handleSubmit}>
              <div className="col-12 mb-3">
                <input
                  autoFocus
                  onChange={handleEmailChange}
                  value={email}
                  className={`form-control`}
                  type="email"
                  name="email"
                  placeholder="Digite seu endereço de e-mail"
                  autoComplete="email"
                />
              </div>

              <div className="col-12 d-grid gap-2 mt-2">
                <button className="btn btn-primary btn-lg" type="submit" disabled={loading}>
                  <Spinner className="spinner-border spinner-border-sm me-2" isLoading={loading}/>
                    Enviar
                </button>
              </div>

            </form>
            <div className="col-12 text-center pt-5">
                <Link className="text-reset text-decoration-none fw-bold h5" to="/login" > <i className="bi bi-arrow-left"></i> Voltar para login</Link>
            </div>
          </div>
        ) : (
          // Renderiza a mensagem após o envio bem-sucedido

        <div className="text-center" style={{ marginTop: "-10px", marginBottom: "100px" }}>
          <div>
            <FontAwesomeIcon className="pb-2 pb-sm-5" icon={faEnvelope} size="3x" color="#007BFF"/>
            <h1 className="h2"> Cheque seu E-mail </h1>
            <p>Enviamos um link para recuperação de senha.</p>
          </div>

          <div className="col-12 text-center pt-5">
              <Link className="text-reset text-decoration-none fw-bold h5" to="/login" > <i className="bi bi-arrow-left"></i> Voltar para login</Link>
          </div>
        </div>
        )}
      </div>
    </main>
  );
}
