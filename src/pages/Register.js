import "./Register.css";
import logoUsinn from "../icons/logoUsinn.png";
import returnIcon from "../icons/returnIcon.svg";
import usinnModeler from "../icons/usinnModeler.svg";

function Register() {
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
            <input className="inputEmail" type="text" name="email" placeholder="Email" />
            <input className="inputPassword" type="text" name="senha" placeholder="Senha" />
            <input className="inputCompany" type="text" name="Empresa" placeholder="EMPRESA" />
            <input className="inputOffice" type="text" name="Cargo" placeholder="CARGO" />
        </form>
        <button className="buttonCancel">Cancelar</button>
        <button className="buttonConfirm">Confirmar</button>

      </div>
    </div>
  );
}

export default Register;
