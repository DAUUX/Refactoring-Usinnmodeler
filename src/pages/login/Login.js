import "../login/Login.css";
import usinnModeler from "../icons/usinnModeler.svg";
import { useHistory } from "react-router-dom";
import NavBar from "../navBar/NavBar";

function Login() {
const history = useHistory();
const onCancelButtonClick = () => {
  history.replace("/");
};
const onNextButtonClick = () => {
  history.push("/");
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
          <input
            className="inputLoginEmail"
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            className="inputLoginPassword"
            type="password"
            name="senha"
            placeholder="Senha"
          />
          <button className="buttonLoginCancel" onClick={onCancelButtonClick}>Cancelar</button>
          <button className="buttonLoginConfirm" onClick={onNextButtonClick}>Confirmar</button>
        </div>
      </div>
      <h1></h1>
    </div>
  );
}

export default Login;
