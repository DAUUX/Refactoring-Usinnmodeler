import "../navBar/NavBar.css";
import logoUsinn from "../icons/logoUsinn.png";
import returnIcon  from "../icons/returnIcon.svg";

function NavBar() {
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
      />
    </div>
  );
}
export default NavBar;
