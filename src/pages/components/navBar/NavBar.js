import "../navBar/NavBar.css";
import logoUsinn from "../icons/logoUsinn.png";
import returnIcon  from "../icons/returnIcon.svg";
import { useHistory } from "react-router-dom";

function NavBar() {
const history = useHistory();
const onReturnButtonClick = () => {
  history.replace("/");
};
  return (
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
        onClick={onReturnButtonClick}
      />
    </div>
  );
}
export default NavBar;
