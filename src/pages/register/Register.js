import "../register/Register.css";
import usinnModeler from "../icons/usinnModeler.svg";
import { useHistory } from "react-router-dom";
import NavBar from "../navBar/NavBar";

function Register() {
const history = useHistory();
const onCancelButtonClick = () => {
  history.replace("/");
};
const onNextButtonClick = () => {
  history.push("/login");
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
        <form>
            <input className="inputName" type="text" name="name" placeholder="Nome" />
            <input className="inputEmail" type="email" name="email" placeholder="Email" />
            <input className="inputPassword" type="password" name="senha" placeholder="Senha" />
            <input className="inputCompany" type="text" name="Empresa" placeholder="EMPRESA" />
            <input className="inputOffice" type="text" name="Cargo" placeholder="CARGO" />
            <button className="buttonCancelRegister" onClick={onCancelButtonClick}>Cancelar</button>
            <button className="buttonConfirmRegister" onClick={onNextButtonClick}>Confirmar</button>
        </form>
      </div>
    </div>
  );
}

export default Register;