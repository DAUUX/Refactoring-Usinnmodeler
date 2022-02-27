import "./Login.css";
import logoUsinn from "../icons/logoUsinn.png";
import returnIcon from "../icons/returnIcon.svg";
import usinnModeler from "../icons/usinnModeler.svg";

function Login() {
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
        <span className="login">LOGIN</span>
        <div className="conteinerDiv">
          <input
            className="inputEmail"
            type="text"
            name="email"
            placeholder="Email"
          />
          <input
            className="inputPassword"
            type="text"
            name="senha"
            placeholder="Senha"
          />
        </div>
      </div>
      <h1></h1>
    </div>
  );
}

export default Login;
