import "../login/Login.css";
import usinnModeler from "../../assets/icons/usinnModeler.svg";
import { Link } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";
import { useState } from "react";
import { Toast } from "../../components/Toast";
import api from "../../services/api";

function Login() {
  
  const [loading, setLoading]   = useState(false);
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {

    e.preventDefault();

    setLoading(true);

    const data = {email, password};

    try {

      const response = await api.post('signin', data);

      const {token, name, email} = response.data;

      api.defaults.headers.common['x-access-token'] = token;
      localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify({name, email}));

      Toast('success', 'Login realizado com sucesso!');

    } catch (error) {

      Toast('error', error);
      
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
              </div>

              <div className="col-12 text-center">
                <Link className="btn btn-outline-primary me-3" type="button" to="/cadastro" >Cadastrar</Link>
                <button className="btn btn-primary" type="submit">Confirmar</button>
              </div>

            </form>
            
          </div>
        </div>

      </div>

    </main>
  );
}

export default Login;
