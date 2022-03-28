import "../register/Register.css";
import logoUsinn from "../icons/logoUsinn.png";
import returnIcon from "../icons/returnIcon.svg";
import usinnModeler from "../icons/usinnModeler.svg";
import { useHistory } from "react-router-dom";

function Register() {
const history = useHistory();
const onCancelButtonClick = () => {
  history.replace("/");
};
const onNextButtonClick = () => {
  history.push("/login");
};
  return (
    <div className="conteiner">
      <div className="navBar">
        <img
          src={logoUsinn}
          width="91"
          height="20"
          alt="logo do site USINN"
          id="logoUsinn"
        />
        <img
          src={returnIcon}
          width="91"
          height="20"
          alt="icone de retorno do site USINN"
          id="returnIcon"
        />
      </div>
      <div className="main">
        <img
          src={usinnModeler}
          width="91"
          height="20"
          alt="logo do site USINN Modeler"
          id="usinnModeler"
        />
        <span className="register">CADASTRO</span>
        <form>
            <input className="inputName" type="text" name="name" placeholder="Nome" />
            <input className="inputEmail" type="email" name="email" placeholder="Email" />
            <input className="inputPassword" type="password" name="senha" placeholder="Senha" />
            <input className="inputCompany" type="text" name="Empresa" placeholder="EMPRESA" />
            <input className="inputOffice" type="text" name="Cargo" placeholder="CARGO" />
            <button className="buttonCancel" onClick={onCancelButtonClick}>Cancelar</button>
            <button className="buttonConfirm" onClick={onNextButtonClick}>Confirmar</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
