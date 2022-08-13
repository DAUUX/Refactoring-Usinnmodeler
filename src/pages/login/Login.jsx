import usinnModeler from "../../assets/icons/usinnModeler.svg";
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
    <main>
      <div className="container py-5">
        <div className="row my-5">
          <div className="col-12 d-flex justify-content-center">
            <img
              src={usinnModeler}
              alt="logo USINN"
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12 text-center">
            <p className="forms-title">LOGIN</p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-5">

            <form className="row" onSubmit={handleLogin}>
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
                {validator.current.message("email", email, "required|min:3|max:100|email", { className: 'invalid-feedback d-block ms-2' })}
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
                {validator.current.message("senha", password, "required|min:8", { className: 'invalid-feedback d-block ms-2' })}
              </div>

              <div className="col-12 text-center">
                <Link className="btn btn-outline-primary me-3" type="button" to="/cadastro" >Cadastrar</Link>
                <button className="btn btn-primary" type="submit">
                  <Spinner className="spinner-border spinner-border-sm me-2" isLoading={loading}  /> Confirmar
                </button>
              </div>

            </form>
            
          </div>
        </div>

      </div>

    </main>
  );
}

export default Login;
