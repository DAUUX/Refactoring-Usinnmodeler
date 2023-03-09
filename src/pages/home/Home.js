import "./style.scss";
import { useHistory } from "react-router-dom"; // import do hook
import diagrama from "../../assets/icons/diagrama.svg";
import Interation from "../../assets/icons/interacao.svg";
import Navigation from "../../assets/icons/navegacao.svg";
import USability from "../../assets/icons/usabilidade.svg";
import Document from "../../assets/icons/Document.svg";
import Circle from "../../assets/icons/circle.svg";
import Verificado from "../../assets/icons/verificado.svg";
import Tutorial from "../../assets/icons/tutorial.svg";
import NomeUsinn from "../../assets/icons/nomeUsinn.svg";
import Miguel from "../../assets/icons/miguel.jpeg";
import Funcap from "../../assets/icons/funcap.svg";
import LogoUFC from "../../assets/icons/logoUFC.svg";
import Logotipo from "../../assets/icons/logotipo.svg";

function showSubmit(initiate) {
  if (initiate !== true) {
    if (document.getElementById("title2_section1").style.display == "none") {
      document.getElementById("title2_section1").style.display = "block";
      document.getElementById("title_section1").style.display = "none";
    } else {
      document.getElementById("title2_section1").style.display = "none";
      document.getElementById("title_section1").style.display = "block";
    }
  }
  setTimeout(showSubmit, 4000);
}
function Home() {
  const history = useHistory(); //chamado do hook

  const goToLogin = () => {
    history.push("/modeler/:id?/:slug?"); //uso do hook para ir para a página
  };

 

  return (
    <main>
        <section className="bg-primary text-center " id="section1">
          <div className="p-5 text-white">
            <figure>
              <blockquote className="blockquote p3 ">
                <label id="title_section1" className="display-4">
                  EXPERIÊNCIA COMPLETA
                </label>
                <label id="title2_section1" className="display-4">
                  MODELAGEM 3 EM 1
                </label>
              </blockquote>
              <figcaption className="blockquote">
                <label id="text_section1" className="h3 display-7  textbreak">
                  Modele a interação e a navegação de sistemas interativos
                  <div className="clearfix"></div> com foco na usabilidade.
                </label>
              </figcaption>
            </figure>
            <button
              className="btn btn-light btn-outline-primary"
              type="submit"
              onClick={goToLogin}
            >
              USINN MODELER
            </button>
          </div>
        </section>

        <section id="section2">
          <div className="container">
            <div className="row justify-content-evenly pt-5 pb-3" id="container_section2">
              <div className="col-12 col-md-6 m-3">
                <img
                  src={diagrama}
                  id="img_diagrama"
                  className="rounded float-left img-fluid "
                  alt="diagrama"
                />
              </div>
              <div className="col-12 col-md-6 col-lg-5 ">
                <div className="text-center text-md-start display-1 pb-2 pt-3">
                  <h3 className="text-primary pt-3"><b>USINN</b></h3>
                  <div>
                    <h5 className="text-muted fst-italic fw-lighter">
                      USability-oriented INteraction and Navigation Model
                    </h5>
                    <h5 className="fw-lighter">
                      É um modelo de interação e navegação orientado à{" "}
                      usabilidade que visa a melhoria da qualidade de uso de
                      sistemas interativos.
                    </h5>
                  </div>
                </div>
                <button
                  className="btn btn-primary fw-bold"
                  id="btn_modeler"
                  type="button"
                  onClick={goToLogin}
                >
                  Comece a modelar
                </button>
              </div>
            </div>
            
          </div>
        </section>

        <section  id="section51">
            <div className="container">
              <div class ="row d-flex justify-content-around pt-2">

                  <div className="col-12 col-md-3 mb-3">
                    <div className="d-flex mt-3 p-3 bg-white rounded-3">
                        <img
                          src={Interation}
                          className="rounded float-left img-fluid me-4"
                          alt="Interação"
                        />        
                      <div className="">                        
                          <b>Modela a interação</b>                        
                        <div className="text-muted">
                          Descreve o comportamento
                          entre o usuário e o sistema
                          computacional.
                        </div>
                      </div>  
                    </div>                   
                  </div>

                  <div className="col-12 col-md-3 mb-3">
                    <div className="d-flex mt-3 p-3 bg-white rounded-3">
                        <img
                          src={Navigation}
                          className="rounded float-left img-fluid me-4"
                          alt="Navegação"
                        />        
                      <div className="">
                        <div>
                          <b>Modela a navegação</b>
                        </div>
                        <div className="text-muted">
                          Compreende nós de 
                          navegação e fluxos de 
                          navegação entre os nós.
                        </div>
                      </div>  
                    </div>                      
                  </div>

                  <div className="col-12 col-md-3 mb-3">
                    <div className="d-flex mt-3 p-3 bg-white rounded-3">
                        <img
                          src={USability}
                          id=""
                          className="rounded float-left img-fluid me-4"
                          alt="Usabilidade"
                        />                  
                      <div>
                        <div>
                          <b>Foco na usabilidade</b>
                        </div>
                        <div className="text-muted">
                          Representa mecanismos de 
                          usabilidade que impactam 
                          na interação.
                        </div>
                      </div>     
                    </div>                 
                  </div>

              </div>
            </div>
            <div className="d-flex justify-content-center p-5">
              <div>
                  <img
                    src={Document}                    
                    className=" float-left img-fluid "
                    alt="Usabilidade"
                  /> 
                  <span className="text-primary ps-2">Confira a tese que iniciou o USINN</span>
              </div>
            </div>
        </section>

        <section className="text-primary"  id="section3">
        <div id="BarraDeFundo">
         <div className="container" >
          <div className="row pt-5 pb-5" >
            <div className="col-md-6 ps-5 ">
                <div id="CirculoDeFundo" className="display-5 pt-3" >
                  
                    <b> Por que <br/>adotar o <br/> USINN?</b>
                  
                </div>              
            </div>
             
            <div  className="col-md-6">
                <ul className="CheckList h5">
                  <li className="pb-4">
                    <b>Projeta sistemas voltados ao usuário</b>
                      <br/>- sua maneira de interagir e navegar o sistema
                  </li>
                  <li className="pb-4">
                    <b>Antecipa aspectos de usabilidade</b> na 
                      <br/>etapa de análise e projeto
                  </li>
                  <li className="pb-4">
                    Auxilia a compreender as
                      <br/><b>consequências de decisões de design</b>
                      <br/>para a experiência do usuário
                  </li>
                  <li className="pb-4">
                      <b>Aumenta a qualidade de uso</b> dos 
                        <br/>produtos de software
                    </li>
                  <li className="pb-4">
                    <b>Integra a usabilidade</b> no
                      <br/>desenvolvimento de software
                  </li>
                  <li className="pb-4">
                    <b>Reduz o retrabalho</b> com correções de 
                      <br/>problemas de usabilidade
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </section>


        <section className="bg-primary text-white" id="section4">
         <div className="container">
          <div className="p-3 pt-5 pb-5">            
            <div className="row d-flex justify-content-around pt-4 pb-4">
               <div className="col-12 col-md-4 ">
                      <div className="pt-5 pb-5">
                        <u><h4>TUTORIAL</h4></u>
                      </div>
                      <div className="pt-3">
                        <div>
                          <img
                                src={NomeUsinn}   
                                className="rounded"
                                alt="USINN"
                                width="70%"
                             />
                        </div>
                         <div className="pt-2">
                              <h1> Modeler</h1>
                         </div>
                    </div>
              </div>
                <div className="col-12 col-md-8 ">
                  <img
                    src={Tutorial}
                    alt="tutorial"
                    width="100%"
                  />
                </div>
            </div>
           </div>
          </div>
        </section>


        <section id="section5">
          <div className="d-flex justify-content-center">
             <div className="p-5 text-center">
                <div className="text-primary">
                  <h1 >Conheça nosso TIME</h1>
                </div>
                <div className="text-center text-muted">
                  Somos alunos e professora da UFC - Campus de Russas.
                </div>
            </div> 
          </div>              
        </section>


        <section id="section6">
          <div className="wrapper">
                  <div className="item">
                      <img className="membro" src={Miguel} />
                  </div>
                  <div className="item">
                      <img className="membro" src={Miguel} />
                  </div>
                  <div className="item">
                      <img className="membro" src={Miguel} />
                  </div>
                  <div className="item">
                      <img  className="membro" src={Miguel} />
                  </div>
                  <div className="item">
                      <img  className="membro" src={Miguel} />
                  </div>
                  
          </div>
        </section>

      <section id="section7">
        <div className="container pb-5">
          <div className="row pb-4">
            <div className="d-flex justify-content-center text-white p-4">
              <span className="bg-primary text-center pt-2 ps-3 pe-3 rounded-3"><h2>PARCEIROS</h2></span>
            </div>
            <div>
              <div className="row justify-content-center">
                <div className="col-8 col-md-4 mt-3 mb-3">
                  <img
                    src={Funcap}
                    className="rounded img-fluid"
                    width="264px" height="177px"
                  />
                </div>
                <div className="col-8 col-md-4 mt-3 mb-3">
                <img
                    src={LogoUFC}
                    className="rounded img-fluid"
                    width="264px" height="177px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white" id="section8">
        <div className="container pb-5">
          <div className="row">
            <div className="d-flex justify-content-around">
              <div className="pt-5">
                <div className="p-4">
                  USINN foi criado por <b>Anna Beatriz</b> ❤️ e continua seus estudos <br/>
                  como projeto de extensão na UFC - Campus de Russas.
                </div>
                <div >
                  <img className="ps-4 pe-2" src={Logotipo} />
                  <b > LOGOTIPO</b>
                </div>
                <div className="p-4">
                  USability-oriented INteraction and Navigation Model USINN © 2022
                </div>
              </div>
              <div className="pt-5">
                <div className="p-3 pt-4">
                    Contato <br/>
                    <b>beatriz.marques@ufc.br</b>
                </div>
                <div className="p-3">
                    <b>UNIVERSIDADE FEDERAL DO CEARÁ - CAMPUS DE RUSSAS</b><br/>
                    Rua Felipe Santiago - N° 411, Cidade Universitária, Russas - CE, 62900-000 <br/>
                    Telefone: (88) 3411 - 9218 <br/>
                    E-mail: russas@ufc.br
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}
export default Home;
