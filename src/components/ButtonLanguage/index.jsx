import './style.scss';
import { useState } from "react";
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

function ButtonLanguage() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
      };

    return (
        <div 
            style={{
                position: "fixed",
                bottom: "20px", 
                right: "20px",  
                zIndex: 1000
            }}
        >
            <div className="dropdown d-flex">
                <button
                    className="language-button d-flex align-items-center px-3 py-2 rounded-4 border"
                    id="dropdownMenuButton"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div id="profileImgButtonLanguage" className="text-uppercase mx-1">
                        <img className="img-fluid" src={"./images/icons/language.png"} alt="" />
                    </div>
                    <span className="mx-1 mt-1">{t("Mudar idioma")}</span>
                    <div className='mt-2'>
                        <i className={`bi ${isOpen ? "bi-chevron-up" : "bi-chevron-down"} ms-2`}></i>
                    </div>
                </button>
                <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton">
                    <li>
                        <button className="dropdown-item" onClick={() => handleChangeLanguage('pt-BR')}>PT-BR</button>
                    </li>
                    <li>                       
                        <button className="dropdown-item" onClick={() => handleChangeLanguage('en-US')}>EN-US</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ButtonLanguage;
