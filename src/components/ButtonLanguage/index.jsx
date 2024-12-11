import './style.scss';
import i18n from '../../i18n';

function ButtonLanguage(props) {

    return (
            <div className="dropdown d-flex">
                
                {props.textColor === "white" ? 
                    <button className="btn px-2 pe-0 dropdown-toggle text-white" id="dropdownMenuButton" type="button" data-bs-toggle="dropdown" aria-expanded="false">  
                        <div id="profileImg" className="text-uppercase"> <img className="mb-4 img-fluid"src={"./images/icons/language.png"} alt=""></img> </div>
                    </button>
                : 
                    <button className="btn px-2 pe-0 dropdown-toggle" id="dropdownMenuButton" type="button" data-bs-toggle="dropdown" aria-expanded="false">  
                        <div id="profileImg" className="text-uppercase"> <img className="mb-4 img-fluid"src={"./images/icons/language.png"} alt=""></img> </div> 
                    </button>
                }

            <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton">
                <li><button className="dropdown-item" onClick={(e) => {e.preventDefault(); i18n.changeLanguage('pt-BR')}}> PT-BR </button></li>
                <li><button className="dropdown-item" onClick={(e) => {e.preventDefault(); i18n.changeLanguage('en-US')}}> EN-US </button> </li>
            </ul>
        
        </div>


    )

}

export default ButtonLanguage;

