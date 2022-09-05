import usinnModeler from "../../assets/icons/usinnModeler.svg";
import { useHistory } from "react-router-dom";
import { useRef, useState } from "react";
import SimpleReactValidator from 'simple-react-validator';
import 'simple-react-validator/dist/locale/pt';
import Spinner from "../../components/Spinner";
import { Toast } from '../../components/Toast';
import api from "../../services/api";

function Register() {
  
  const history = useHistory();
  const validator = useRef(new SimpleReactValidator({locale: 'pt'}));

  const [loading, setLoading]   = useState(false);
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany]   = useState('');
  const [role, setRole]         = useState('');
  const [, wasValidated]        = useState();


  async function handleRegister(e) {

    e.preventDefault();

    setLoading(true);
    const data = {name, email, password, company, role};

    if (validator.current.allValid()) {
    
      try {
        
        await api.post('signup', data);
        
        Toast('success', 'Cadastro realizado com sucesso!');
        
        history.push('/login');
        
      } catch (error) {
        
        Toast('error', error);
        
      }
    
    } else {
      validator.current.showMessages(true);
      wasValidated(1);
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
            <form className="row" noValidate="" onSubmit={handleRegister}>
                
                <div className="col-12 mb-3">
                  <input autoFocus className="form-control" disabled={loading} type="text" name="name" placeholder="Nome" value={name} onChange={e => setName(e.target.value)}/>
                  {validator.current.message("nome", name, ["required",{min:3}, {max:100},{regex:/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/}], { className: 'invalid-feedback d-block ms-2' })}
                </div>

                <div className="col-12 mb-3">
                  <input className="form-control" disabled={loading} type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                  {validator.current.message("email", email, "required|min:3|max:100|email", { className: 'invalid-feedback d-block ms-2' })}
                </div>

                <div className="col-12 mb-3">
                  <input className="form-control" disabled={loading} type="password" name="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
                  {validator.current.message("senha", password, "required|min:8", { className: 'invalid-feedback d-block ms-2' })}
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <input className="form-control" disabled={loading} type="text" name="company" placeholder="EMPRESA" value={company} onChange={e => setCompany(e.target.value)} />
                  {validator.current.message("empresa", company, "max:100", { className: 'invalid-feedback d-block ms-2' })}
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <input className="form-control" disabled={loading} type="text" name="role" placeholder="CARGO" value={role} onChange={e=>setRole(e.target.value)} />
                  {validator.current.message("cargo", role, "max:100", { className: 'invalid-feedback d-block ms-2' })}
                </div>

                <div className="col-12 text-center">
                  <button className="btn btn-outline-primary me-3" disabled={loading} type="button" onClick={onCancelButtonClick}>Cancelar</button>

                  <button className="btn btn-primary" disabled={loading} type="submit">
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

export default Register;