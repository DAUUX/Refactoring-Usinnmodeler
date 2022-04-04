import "../login/Login.css";
import usinnModeler from "../icons/usinnModeler.svg";
import { useHistory } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import { useState } from "react";
import { Toast } from "../../components/Toast";
import api from "../../services/api";

function Login() {
  const history = useHistory();
  
  const [loading, setLoading]       = useState(false);
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

  const onCancelButtonClick = () => {
    history.replace("/");
  };
  
  return (
    <div className="conteiner">
      <div className="navBar">
        <NavBar />
      </div>
      <div className="main">
        <img
          src={usinnModeler}
          width="91"
          height="20"
          alt="logo do site USINN Modeler"
          id="usinnModeler"
        />
        <span className="login">LOGIN</span>
        <div className="conteinerDiv">
          <form onSubmit={handleLogin}>
            <input
              disabled={loading}
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="inputLoginEmail"
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              disabled={loading}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="inputLoginPassword"
              type="password"
              name="password"
              placeholder="Senha"
            />
            <button className="buttonLoginConfirm" type="submit">Confirmar</button>
            <button className="buttonLoginCancel" onClick={onCancelButtonClick}>Cancelar</button>
          </form>
        </div>
      </div>
      <h1></h1>
    </div>
  );
}

export default Login;
