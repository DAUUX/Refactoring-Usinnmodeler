import styles from "./style.module.scss";
import { Link } from "react-router-dom"; // import do hook
import diagrama from "../../assets/icons/diagrama.jpeg";
import Interation from "../../assets/icons/interacao.svg";
import Navigation from "../../assets/icons/navegacao.svg";
import USability from "../../assets/icons/usabilidade.svg";
import Document from "../../assets/icons/Document.svg";
import NomeUsinn from "../../assets/icons/Logo_USINN_Positiva.png";
import Funcap from "../../assets/icons/funcap.svg";
import LogoUFC from "../../assets/icons/logoUFC.svg";
import Logotipo from "../../assets/icons/logotipo.svg";
import { useTranslation } from 'react-i18next';
import ButtonLanguage from "../../components/ButtonLanguage";

import Slides from "./Slides";
import BasicCard from "./BasicCard";
import { useEffect, useState } from "react";

export default function Home() {
  const { t } = useTranslation()

  const [title, setTitle] = useState(' EXPERIÊNCIA COMPLETA')
  const [hambOpen, setHmabOpen] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitle(prevTitle => prevTitle === 'EXPERIÊNCIA COMPLETA' ? 'MODELAGEM 3 EM 1' : 'EXPERIÊNCIA COMPLETA');
    }, 3000);
  
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    document.title = 'Home - USINN Modeler';
    const hash = window.location.hash;
    
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <>
      <header className={`position-absolute w-100 ${hambOpen && 'border-bottom border-white'}`}>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary py-1 px-3 px-lg-5">
          <button
            className="navbar-toggler bg-light my-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded={hambOpen}
            aria-haspopup="true"
            aria-label="Toggle navigation"
            onClick={() => setHmabOpen(!hambOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            id="navbarTogglerDemo01"
            className="collapse navbar-collapse py-2 py-sm-3"
          >
            <img
              src={Logotipo}
              alt="Logo da USINN"
              className="navbar-brand d-none d-lg-inline"
            />

            <ul role="menu" className="navbar-nav me-auto mb-2 mb-lg-0 fs-5 d-flex">
              <li className="nav-item" role="none">
                <a
                  href="#SobreUSINN"
                  className={`${styles.underline} nav-link text-white`}
                  aria-label="ir para seção, saiba mais sobre o usinn"
                  role="menuitem"
                >
                  {t('Sobre o USINN')}
                </a>
              </li>
              <li className="nav-item" role="none">
                <a
                  href="#Adote"
                  className={`${styles.underline} nav-link text-white`}
                  aria-label="ir para seção por que adotar o usinn"
                  role="menuitem"
                >
                  Por que adotar
                </a>
              </li>
              <li className="nav-item" role="none">
                <a
                  href="#Tutorial"
                  className={`${styles.underline} nav-link text-white`}
                  aria-label="ir para seção tutorial"
                  role="menuitem"
                >
                  Tutorial
                </a>
              </li>
              <li className="nav-item" role="none">
                <a
                  href="#NossoTime"
                  className={`${styles.underline} nav-link text-white`}
                  aria-label="ir para seção conheça o nosso time"
                  role="menuitem"
                >
                  Nosso time
                </a>
              </li>
            </ul>
            <ul className="fs-5 p-0 m-0 d-flex align-items-center list-inline" role="menu">
              <li role="none">
                <ButtonLanguage />
              </li>
              <li role="none">
                <Link
                  to="/cadastro"
                  className={`${styles.underline} text-decoration-none text-white me-3`}
                  aria-label="ir para página de cadastro"
                  role="menuitem"
                >
                  Cadastro
                </Link>
              </li>
              <li role="none">
                <Link
                  to="/login"
                  className={`${styles.btn} btn btn-light rounded-pill py-2 px-4 `}
                  aria-label="ir para página de login"
                  role="menuitem"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main>
        <section className="bg-primary text-white d-flex flex-column justify-content-center align-items-center vh-100" aria-labelledby="region1">
            <h1 id="region1" className="text-center">
              {title}
            </h1>

            <p className="my-4 text-center h2">
              {t('Modele a interação e a navegação de sistemas interativos')} <br />
              {t('com foco na usabilidade.')}
            </p>

            <Link
              to="/login"
              className={`${styles.btn} btn btn-light text-black rounded-pill`}
              aria-label="ir para página de login do usinn"
            >
              COMECE A MODELAR
            </Link>
        </section>

        <section id="SobreUSINN" aria-labelledby="region2">
          <div className="row d-flex align-items-center p-sm-5 p-1 pt-5 m-0">
            <div className="col-auto col-lg-6 d-flex align-items-center">
              <img src={diagrama} alt="" className="img-fluid" />
            </div>

            <div className="text-center text-md-start px-1 py-5 p-sm-5 col-auto col-lg-6">
              <h1 id="region2" className="text-primary pb-2 h2 fw-bolder">
                Sobre o USINN
              </h1>

              <p className="fw-lighter h5 pb-2">
                <em lang="en">USability-oriented INteraction and Navigation Model</em>
              </p>

              <p className="fs-5 m-0">
                É um modelo de interação e navegação orientado à usabilidade que
                visa a melhoria da qualidade de uso de sistemas interativos.
              </p>
            </div>
          </div>

          <div className="row gap-5 p-3 p-sm-5 m-0">
            <BasicCard
              imagem={Navigation}
              titulo={"Modela a interação"}
              paragrafo={
                "Descreve o comportamento entre o usuário e o sistema computacional."
              }
            />
            <BasicCard
              imagem={Interation}
              titulo={"Modela a navegação"}
              paragrafo={
                "Compreende nós de navegação e fluxos de navegação entre os nós."
              }
            />
            <BasicCard
              imagem={USability}
              titulo={"Foco na usabilidade"}
              paragrafo={
                "Representa mecanismos de usabilidade que impactam na interação."
              }
            />
          </div>
        </section>

        <section id="Adote" aria-labelledby="region3">
          <div id="Caracteristicas" className="d-flex justify-content-center pb-5">
            <img src={Document} alt="" />
            <p id="region3" className="text-primary pt-3 ps-2 fw-bolder d-inline">
              Confira a tese que iniciou o <abbr title="USability-oriented INteraction and Navigation Model">USINN</abbr>
            </p>
          </div>

          <div className={`${styles.BarraDeFundo} row m-0 text-primary`} aria-label=" ">
            <div className="col-12 col-sm-6 p-0 pb-5 ps-md-5">
              <h1
                className={`${styles.CirculoDeFundo} m-0 ms-sm-5 text-center text-sm-start fw-bolder display-5`}
              >
                Por que <br /> adotar o <br /> USINN?
              </h1>
            </div>

            <div className="col-12 col-sm-6 fs-5 ps-5 ps-sm-0">
              <ul className={`${styles.CheckList} row gy-2 ps-4 ps-sm-0`}>
                <li>
                  <p>
                    <b>Projeta sistemas voltados ao usuário</b>
                    <br />- sua maneira de interagir e navegar o sistema
                  </p>
                </li>
                <li>
                  <p>
                    <b>Antecipa aspectos de usabilidade </b>na <br />
                    etapa de análise e projeto
                  </p>
                </li>
                <li>
                  <p>
                    Auxilia a compreender as <br />
                    <b>consequências de decisões de design</b> <br />
                    para a experiência do usuário
                  </p>
                </li>
                <li>
                  <p>
                    <b>Aumenta a qualidade de uso</b> dos <br />
                    produtos de software
                  </p>
                </li>
                <li>
                  <p>
                    <b>Integra a usabilidade</b> no <br />
                    desenvolvimento de software
                  </p>
                </li>
                <li>
                  <p>
                    <b>Reduz o retrabalho </b>com correções de <br />
                    problemas de usabilidade
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section
          id="Tutorial"
          aria-labelledby="region4"
          className="bg-primary text-white d-flex flex-column flex-lg-row p-2 py-3 px-lg-0 py-lg-5"
        >
          <div className="col-lg-5 col-lg-4 align-content-center pb-3 pb-lg-0 px-5">
            <h1 id="region4" className="text-center">
              TUTORIAL
            </h1>
            <div className="w-auto px-5 px-lg-0 py-3 p-lg-3 pb-lg-0 text-center">
              <img src={NomeUsinn} alt="" className="w-100" style={{maxWidth: "200px"}} />
            </div> 
          </div>

          <div className="ratio ratio-21x9 me-lg-5">
            <iframe
              allowFullScreen
              title="Tutorial USINN"
              src="https://www.youtube.com/embed/VwchcuMd7Hk"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </section>

        <section id="NossoTime" aria-labelledby="region5">
          <div className="text-center">
            <h1 id="region5" className="text-primary mt-5">
              Conheça nosso TIME
            </h1>
            <p className="fs-5">
              Somos alunos e professora da <abbr title="Universidade Federal do Ceará">UFC</abbr> - Campus de Russas.
            </p>
          </div>

          <div className={`${styles.backgroundMembers}`}>
            <Slides />
          </div>
        </section>

        <section id="Parceiros" className="p-5" aria-labelledby="region6">
          <div className="d-flex justify-content-center ">
            <h1
              id="region6"
              className="bg-primary my-5 text-white fs-2 px-4 py-2 rounded-pill d-inline"
            >
              Parceiros
            </h1>
          </div>

          <div className="row justify-content-center py-5">
            <img
              src={Funcap}
              alt="Patrocionadora FUNCAP - Fundação Cearense de Apoio ao Desenvolvimento Científico e Tecnológico"
              className="col-sm-auto col-md-3 p-5 p-sm-5 p-md-0 p-lg-4 mx-5"
            />

            <img
              src={LogoUFC}
              alt="Patrocionadora UFC - Universidade Federal do Ceará"
              className="col-sm-auto col-md-3 p-5 p-sm-5 p-md-0 p-lg-4 mx-5"
            />
          </div>
        </section>
      </main>

      <footer className="bg-primary text-white row px-2 py-4 p-sm-5 m-0">
        <div className="col-sm-auto col-md-7 fs-5">
          <p>
            USINN foi criado por <b>Anna Beatriz</b> ❤️ e continua seus estudos
            como projeto de pesquisa e desenvolvimento tecnológico na UFC -
            Campus de Russas.
          </p>

          <div className="d-flex pb-3">
            <img src={Logotipo} alt="" />
            <span aria-hidden="true" className="ps-1 pt-1 fw-bolder">
              USINN
            </span>
          </div>

          <p lang="en">
            USability-oriented INteraction and Navigation Model USINN © 2022
          </p>
        </div>

        <address className="col-sm-auto col-md-5">
          <div className="d-flex flex-column pb-3">
            <strong className="fs-5">Contato</strong>
            <span>beatriz.marques@ufc.br</span>
          </div>
          
          <div className="d-flex flex-column">
            <strong>UNIVERSIDADE FEDERAL DO CEARÁ - CAMPUS DE RUSSAS</strong>
            Rua Felipe Santiago - Nº 411, Cidade Universitária, Russas - CE, 62900-000 <br />
            Telefone: (88) 3411-9218 <br />
            E-mail: russas@ufc.br
          </div>
        </address>
      </footer>
    </>
  );
}
