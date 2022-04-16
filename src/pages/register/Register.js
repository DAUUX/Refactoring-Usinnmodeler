import "./Register.scss";
import usinnModeler from "../../assets/icons/usinnModeler.svg";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Toast } from '../../components/Toast'
import NavBar from "../../components/navBar/NavBar";
import api from "../../services/api";

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
    <main>      
      <div className="container py-5">

        <div className="row my-5">
          <div className="col-12 d-flex justify-content-center">
            <img
              src={usinnModeler}
              alt="logo do site USINN Modeler"
            />
          </div>
        </div>
        
        <div className="row mb-4">
          <div className="col-12 text-center">
            <p className="forms-title">CADASTRO</p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-5">
            <form className="row" onSubmit={handleRegister}>
                
                <div className="col-12 mb-3">
                  <input autoFocus className="form-control" disabled={loading} type="text" name="name" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div className="col-12 mb-3">
                  <input className="form-control" disabled={loading} type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="col-12 mb-3">
                  <input className="form-control" disabled={loading} type="password" name="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <input className="form-control" disabled={loading} type="text" name="company" placeholder="EMPRESA" value={company} onChange={e => setCompany(e.target.value)} />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <input className="form-control" disabled={loading} type="text" name="role" placeholder="CARGO" value={role} onChange={e=>setRole(e.target.value)} />
                </div>

                <div className="col-12 text-center">
                  <button className="btn btn-outline-primary me-3" disabled={loading} type="button" onClick={onCancelButtonClick}>Cancelar</button>
                  <button className="btn btn-primary" disabled={loading} type="submit">Confirmar</button>
                </div>

            </form>
          </div>
        </div>

      </div>
    </main>
  );
}

export default Register;