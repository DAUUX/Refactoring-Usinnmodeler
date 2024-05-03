import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; 
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { Toast } from "../../components/Toast";
import api from "../../services/api";
import Spinner from "../../components/Spinner";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import usinnModeler from "../../assets/icons/usinn-logo-horiz.png";

function RequestChange() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [enviadoComSucesso, setEnviadoComSucesso] = useState(false); // Estado para controlar o envio bem-sucedido
  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      // Simule a lógica de envio de email de redefinição de senha (substitua com sua lógica real)
      await api.post('recover-password',{email});
      // Redirecionamento após envio bem-sucedido (substitua com o caminho correto)
      setEnviadoComSucesso(true)
      // history.push('/sucesso'); // Você pode ou não redirecionar para outra página, dependendo de como deseja implementar isso.
    } catch (error) {
      Toast('error', error, "errorCircle"); // Tratamento de erro
    }
    setLoading(false)
  };

  return (
    <main className="flex-fill d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-8 col-lg-4 text-center">
            <div>
              <img src={usinnModeler} alt="logo USINN" style={{ width: '100px', height: 'auto', marginTop: '20px', position: 'fixed', top: '0', left: '50%', transform: 'translateX(-50%)' }} />
            </div>
          
            <div>

            </div>
            {!enviadoComSucesso ? ( // Renderiza o formulário apenas se não for enviado com sucesso
              <div>
                 {/* Adicione o ícone de chave */}
               <div className="text-center"style={{ marginTop: '-10px',marginBottom: '100px' }} >
                 <FontAwesomeIcon icon={faKey} size="3x" color="#007BFF" />
               </div>
                <h2>Esqueceu sua senha?</h2>
                 <p className="text-muted text-center mb-4">
                  Não se preocupe, enviaremos as instruções de recuperação.
                 </p>
                   <form className={`row justify-content-center`} onSubmit={handleSubmit}>
                     <div className="col-12 mb-3">
                      <input
                      autoFocus
                      onChange={handleEmailChange}
                      value={email}
                      className={`form-control`}
                      type="email"
                      placeholder="Digite seu endereço de e-mail"
                    />
                  </div>
  
                  <div className="col-12 d-grid gap-2 mt-2">
                    <button className="btn btn-primary btn-lg" type="submit" disabled={loading} >
                      <Spinner className="spinner-border spinner-border-sm me-2" isLoading={loading}  /> Enviar
                    </button>
                  </div>
                </form>
              </div>
            ) : ( // Renderiza a mensagem após o envio bem-sucedido
              <div>
                <div className="text-center" style={{ marginTop: '-10px',marginBottom: '100px' }} >
                 <FontAwesomeIcon icon={faEnvelope} size="3x" color="#007BFF" />
               </div>
               <h2> Cheque seu E-mail </h2>
                <p className="text-muted">
                  Enviamos um link para recuperação de senha.
                </p>
								<div className="col-12 text-center mt-4">
									<Link className="text-decoration-none text-muted fw-bold" to="/login" > <i className="bi bi-arrow-left"></i> Voltar para login</Link>
								</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default RequestChange;
