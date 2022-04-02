import "../register/Register.css";
import usinnModeler from "../icons/usinnModeler.svg";
import { useHistory } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import { useState } from "react";
import api from "../../services/api";
import { Toast } from '../../components/Toast'

function Register() {
  
  const history = useHistory();

  const [loading, setLoading]   = useState(false);
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany]   = useState('');
  const [role, setRole]         = useState('');

  async function handleRegister(e) {

    e.preventDefault();

    setLoading(true);

    const data = {name, email, password, company, role};

    try {

      await api.post('signup', data);

      Toast('success', 'Cadastro realizado com sucesso!');

      
      history.push('/login');
      
    } catch (error) {
      
      Toast('error', error);

    }

    setLoading(false);

  }

  const onCancelButtonClick = () => {
    history.replace("/");
  };
  
  return (
    <div className="conteinerRegister">
      <div className="navBar">
        <NavBar />
      </div>
      <div className="main">
        <img
          src={usinnModeler}
          width="91"
          height="20"
          alt="logo do site USINN Modeler"
          id="usinnModelerRegister"
        />
        <span className="register">CADASTRO</span>
        <form onSubmit={handleRegister} >
            <input className="inputName" disabled={loading} type="text" name="name" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
            <input className="inputEmail" disabled={loading} type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="inputPassword" disabled={loading} type="password" name="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
            <input className="inputCompany" disabled={loading} type="text" name="company" placeholder="EMPRESA" value={company} onChange={e => setCompany(e.target.value)} />
            <input className="inputOffice" disabled={loading} type="text" name="role" placeholder="CARGO" value={role} onChange={e=>setRole(e.target.value)} />
            <button className="buttonConfirmRegister" disabled={loading} type="submit">Confirmar</button>
            <button className="buttonCancelRegister" disabled={loading} onClick={onCancelButtonClick}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default Register;