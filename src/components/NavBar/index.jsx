import { Link, useLocation } from "react-router-dom"; 
import "./style.scss";
import logoUsinn from "../../assets/icons/usinn-logo-min.png";

function NavBar() {
  const { pathname } = useLocation();
	//Pega a primeira parte da url, para identificar o módulo atual
	const path = pathname.split('/')[1];

  return (
    <nav id="site-navbar" className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-toggler" aria-controls="navbar-toggler" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-toggler">
          <Link className="navbar-brand" to="/">
            <img
              className="my-3 my-lg-0"
              src={logoUsinn}
              alt="logo USINN"
            />
          </Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item me-4">
              <Link className={ path === 'tutorial' ? 'nav-link fw-bolder active' : 'nav-link fw-bolder' }> TUTORIAL </Link>
            </li>
            <li className="nav-item me-4">
              <Link className={ path === 'cadastro' ? 'nav-link fw-bolder active' : 'nav-link fw-bolder' } to="/cadastro"> CADASTRO </Link>
            </li>
            <li className="nav-item">
              <Link className={ path === 'login' ? 'nav-link fw-bolder active' : 'nav-link fw-bolder' } to="/login"> LOGIN </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
