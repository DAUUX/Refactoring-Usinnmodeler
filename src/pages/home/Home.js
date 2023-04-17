import "./style.scss";
import { Link} from "react-router-dom"; // import do hook
import diagrama from "../../assets/icons/diagrama.jpeg";
import Interation from "../../assets/icons/interacao.svg";
import Navigation from "../../assets/icons/navegacao.svg";
import USability from "../../assets/icons/usabilidade.svg";
import Document from "../../assets/icons/Document.svg";
import Circle from "../../assets/icons/circle.svg";
import Verificado from "../../assets/icons/verificado.svg";
import Tutorial from "../../assets/icons/tutorial.svg";
import NomeUsinn from "../../assets/icons/nomeUsinn.svg";
import Funcap from "../../assets/icons/funcap.svg";
import LogoUFC from "../../assets/icons/logoUFC.svg";
import Logotipo from "../../assets/icons/logotipo.svg";
import Alex from "../../assets/img/Alex.jpeg";
import Ana_Marcia from "../../assets/img/Ana_Marcia.jpeg";
import Anna_Beatriz from "../../assets/img/Anna_Beatriz.jpeg";
import Caio from "../../assets/img/Caio.jpg";
import Clara from "../../assets/img/Clara.jpeg";
import Dhioleno from "../../assets/img/Dhioleno.jpeg";
import Glauber from "../../assets/img/Glauber.jpeg";
import Hanna from "../../assets/img/Hanna.jpeg";
import Larissa_Santos from "../../assets/img/Larissa.jpeg";
import Mateus_Andrade from "../../assets/img/Mateus_Andrade.jpeg";
import Milene from "../../assets/img/Milene.jpeg";
import Moisés_Oliveira from "../../assets/img/Moises_Oliveira.jpeg";
import Natalia from "../../assets/img/Natalia.jpeg";
import Thiago from "../../assets/img/Thiago.jpeg";
import Vandeilson from "../../assets/img/Vandeilson.jpeg";
import Victor from "../../assets/img/Victor.jpeg";
import Wilkinis from "../../assets/img/Wilkinis.jpeg";


import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useState } from "react";
import { useEffect } from "react";

function Home() {
  const phrases = ["EXPERIÊNCIA COMPLETA", "MODELAGEM 3 EM 1"];
  const [phraseIndex, setPhraseIndex] = useState(0);

useEffect(()=>{
    
  let index = 0;
    
  function showPhrase() {
    index = index == phrases.length-1?0:index+1;
    setPhraseIndex(index);
  }
    
  const phraseInterval = setInterval(showPhrase, 3000);

  return ()=>{
    clearInterval(phraseInterval);
  }
},[])

  return (
    <main>
      <section className="bg-primary">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-primary">
              <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse pt-4" id="navbarTogglerDemo01">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                  <li className="nav-item pe-5">
                  <img src={Logotipo} alt="Logo" className="d-inline-block "/>
                  </li>
                  <li className="nav-item pe-3">
                    <a className="nav-link active text-white " aria-current="page" href="#SobreUSINN">Sobre o USINN</a>
                  </li>
                  <li className="nav-item pe-3">
                    <a className="nav-link text-white " href="#Adote">Por que adotar</a>
                  </li>
                  <li className="nav-item pe-3">
                    <a className="nav-link text-white " href="#Tutorial">Tutorial</a>
                  </li>
                  <li className="nav-item pe-3">
                    <a className="nav-link text-white " href="#NossoTime">Nosso time</a>
                  </li>
                </ul>
                <div className="d-flex " >
                  <Link className="navbar-brand text-white pe-3" to="/cadastro">
                      Cadastro
                  </Link>
                  <Link className="navbar-brand bg-white text-primary rounded-pill px-4" to="/login">
                    Login
                  </Link>
                </div>
              </div>
          </nav>

        </div>
      </section>
        
        <section className="bg-primary text-center " id="Titulo">
          <div className="p-5 text-white">
            <div className="textTitle">
              {
                phrases.map((item, index)=>{
                  return <h1 key={index} className={phraseIndex==index?"d-block":"d-none"}>{item}</h1>
                })
              }
            </div>
            <div className="p-3">
              <div className="text30px textbreak">
                Modele a interação e a navegação de sistemas interativos
                <div className="clearfix"></div> com foco na usabilidade.
              </div>
            </div>
            <Link
              className="btn btn-light btn-outline-primary rounded-pill"
              type="submit"
              to="/login"
            >
              USINN MODELER
            </Link>
          </div>
        </section>

        <section id="SobreUSINN">
          <div className="container">
            <div className="row justify-content-evenly align-items-center pt-5 pb-3">
              <div className="col-12 col-md-6 p-3">
                <img
                  src={diagrama}
                  id="img_diagrama"
                  className="rounded float-left img-fluid "
                  alt="diagrama"
                />
              </div>
              <div className="col-12 col-md-6 col-lg-5 text20px">
                <div className="text-center text-md-start display-1 pb-2">
                  <h2 className="text-primary pb-2"><b>USINN</b></h2>
                  <div>
                    <h5 className="text-muted fst-italic fw-lighter pb-2">
                      USability-oriented INteraction and Navigation Model
                    </h5>
                    <h5 className="fw-lighter pb-2 ">
                      É um modelo de interação e navegação orientado à{" "}
                      usabilidade que visa a melhoria da qualidade de uso de
                      sistemas interativos.
                    </h5>
                  </div>
                </div>
                <Link
                  className="btn btn-primary fw-bold text-center p-1"
                  type="button"
                  to="/login"
                >
                  Comece a modelar
                </Link>
              </div>
            </div>
            
          </div>
        </section>

        <section  id="Caracteristicas">
            <div className="container">
              <div class ="row d-flex justify-content-around pt-2 text16px">

                  <div className="col-12 col-lg-3 mb-3">
                    <div className="d-flex mt-3 p-3 bg-white rounded-3 h-100">
                        <img
                          src={Interation}
                          className="rounded float-left img-fluid me-4"
                          alt="Interação"
                        />        
                        <div>                        
                          <b>Modela a interação</b>                        
                          <div className="text-muted">
                            Descreve o comportamento
                            entre o usuário e o sistema
                            computacional.
                          </div>
                        </div>  
                    </div>                   
                  </div>

                  <div className="col-12 col-lg-3 mb-3">
                    <div className="d-flex mt-3 p-3 bg-white rounded-3 h-100">
                        <img
                          src={Navigation}
                          className="rounded float-left img-fluid me-4"
                          alt="Navegação"
                        />        
                        <div>
                          <b>Modela a navegação</b>
                          <div className="text-muted">
                            Compreende nós de 
                            navegação e fluxos de 
                            navegação entre os nós.
                          </div>
                        </div>  
                    </div>                      
                  </div>

                  <div className="col-12 col-lg-3 mb-3">
                    <div className="d-flex mt-3 p-3 bg-white rounded-3 h-100">
                        <img
                          src={USability}
                          id=""
                          className="rounded float-left img-fluid me-4"
                          alt="Usabilidade"
                        />                  
                        <div>
                          <b>Foco na usabilidade</b>
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

        <section className="text-primary"  id="Adote">
        <div id="BarraDeFundo">
         <div className="container" >
          <div className="row pt-5 pb-5" >
            <div className="col-md-6 ps-5 ">
                <div id="CirculoDeFundo" className="display-5 pt-3" >
                  
                    <b> Por que <br/>adotar o <br/> USINN?</b>
                  
                </div>              
            </div>
             
            <div  className="col-md-6 ">
                <ul className="CheckList h5 text20px">
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


        <section className="bg-primary text-white" id="Tutorial">
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
                  <div className="px-5 py-4">
                    <iframe className=" w-100" height="400px"
                    src="https://www.youtube.com/embed/VwchcuMd7Hk" title="Tutorial USINN" 
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen></iframe>
                  </div>                  
                </div>
            </div>
           </div>
          </div>
        </section>


        <section id="NossoTime">
          <div className="d-flex justify-content-center">
             <div className="p-5 text-center">
                <div className="text-primary">
                  <h1 >Conheça nosso TIME</h1>
                </div>
                <div className="text-center text-muted text16px">
                  Somos alunos e professora da UFC - Campus de Russas.
                </div>
            </div> 
          </div>              
        </section>


        <section id="Membros">
          <div id="backgroundMembers">
            <Splide aria-label="Membros do projeto" options={{ 
              type    : 'loop',
              pagination: true,
              perMove : 5,            
              perPage : 5,
              breakpoints: {
                576: {
                  perPage: 1,
                  perMove: 1,
                },
                992: {
                  perPage: 3,
                  perMove: 3,
                }}
              }}>

              <SplideSlide className="pb-3 d-flex flex-column">
                  <img className="member" src={Alex} />
                  <div className="text-center">
                    <div className="text20px"><b>Alex Alan dos Santos</b></div>
                    <div className="text16px">Requisitos e Design</div>
                  </div>
              </SplideSlide>
              <SplideSlide className="pb-3 d-flex flex-column">
                  <img className="member" src={Ana_Marcia} />
                  <div className="text-center">
                    <div className="text20px"><b>Ana Márcia de Lima</b></div>
                    <div className="text16px">Requisitos e Design</div>
                  </div>
              </SplideSlide>
              <SplideSlide className="pb-3 d-flex flex-column">
                  <img className="member" src={Anna_Beatriz} />
                  <div className="text-center">
                    <div className="text20px"><b>Anna Beatriz Marques</b></div>
                    <div className="text16px">Orientadora</div>
                  </div>
              </SplideSlide>
              <SplideSlide className="pb-3 d-flex flex-column">
                  <img className="member" src={Caio} />
                  <div className="text-center">
                    <div className="text20px"><b>Caio Finotti</b></div>
                    <div className="text16px">Desenvolvimento</div>
                  </div>
              </SplideSlide>
              <SplideSlide className="pb-3 d-flex flex-column">
                  <img className="member" src={Clara} />
                  <div className="text-center">
                    <div className="text20px"><b>Clara Fonseca</b></div>
                    <div className="text16px">Teste</div>
                  </div>
              </SplideSlide>
              <SplideSlide className="pb-3 d-flex flex-column">
                  <img className="member" src={Dhioleno} />
                  <div className="text-center">
                    <div className="text20px"><b>Dhioleno da Silva</b></div>
                    <div className="text16px">Requisito e Desenvolvimento</div>
                  </div>
              </SplideSlide>
              <SplideSlide className="pb-3 d-flex flex-column">
                  <img className="member" src={Wilkinis} />
                  <div className="text-center">
                    <div className="text20px"><b>Francisco Wilkinis de Sousa</b></div>
                    <div className="text16px">Teste</div>
                  </div>
              </SplideSlide>
              <SplideSlide className="pb-3 d-flex flex-column">
                  <img className="member" src={Glauber} />
                  <div className="text-center">
                    <div className="text20px"><b>Glauber Marreiro</b></div>
                    <div className="text16px">Desenvolvimento</div>
                  </div>
              </SplideSlide>
              <SplideSlide className="pb-3 d-flex flex-column">
                  <img className="member" src={Hanna} />
                  <div className="text-center">
                    <div className="text20px"><b>Hanna Ranielly Ramos</b></div>
                    <div className="text16px"> Requisitos </div>
                  </div>
              </SplideSlide>
              <SplideSlide className="pb-3 d-flex flex-column">
                  <img className="member" src={Larissa_Santos} />
                  <div className="text-center">
                    <div className="text20px"><b>Larissa Saraiva</b></div>
                    <div className="text16px">Teste</div>
                  </div>
              </SplideSlide>
              <SplideSlide className="pb-3 d-flex flex-column">
                  <img className="member" src={Mateus_Andrade} />
                  <div className="text-center">
                    <div className="text20px"><b>Mateus Eugênio Andrade</b></div>
                    <div className="text16px">Desenvolvimento</div>
                  </div>
              </SplideSlide>
              <SplideSlide className="pb-3 d-flex flex-column">
                  <img className="member" src={Milene} />
                  <div className="text-center">
                    <div className="text20px"><b>Milene Cavalcante</b></div>
                    <div className="text16px">Requisitos e Design</div>
                  </div>
              </SplideSlide>
              <SplideSlide className="pb-3 d-flex flex-column">
                  <img className="member" src={Moisés_Oliveira} />
                  <div className="text-center">
                    <div className="text20px"><b>Moisés Costa</b></div>
                    <div className="text16px">Teste</div>
                  </div>
              </SplideSlide>
              <SplideSlide className="pb-3 d-flex flex-column">
                  <img className="member" src={Natalia} />
                  <div className="text-center">
                    <div className="text20px"><b>Natália Lidia Coelho</b></div>
                    <div className="text16px">Desenvolvimento</div>
                  </div>
              </SplideSlide>
              <SplideSlide className="pb-3 d-flex flex-column">
                  <img className="member" src={Thiago} />
                  <div className="text-center">
                    <div className="text20px"><b>Thiago Torres</b></div>
                    <div className="text16px">Requisitos e Desenvolvimento</div>
                  </div>
              </SplideSlide>
              <SplideSlide className="pb-3 d-flex flex-column">
                  <img className="member" src={Vandeilson} />
                  <div className="text-center">
                    <div className="text20px"><b>Vandeilson Nogueira</b></div>
                    <div className="text16px">Teste</div>
                  </div>
              </SplideSlide>
              <SplideSlide className="pb-3 d-flex flex-column">
                  <img className="member" src={Victor} />
                  <div className="text-center">
                    <div className="text20px"><b>Victor Cesar Feitosa</b></div>
                    <div className="text16px">Teste</div>
                  </div>
              </SplideSlide>
            </Splide>
          </div>
        </section>

      <section id="Patrocinadores">
        <div className="container pb-5">
          <div className="row pb-4">
            <div className="d-flex justify-content-center text-white p-4">
              <span className="bg-primary text-center pt-2 ps-3 pe-3 rounded-pill"><h2>PARCEIROS</h2></span>
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

      <section className="bg-primary text-white" >
        <div className="container pb-5">
          <div className="row">
            <div className="d-flex justify-content-around text16px">
              <div className="pt-5">
                <div className="p-4">
                  USINN foi criado por <b>Anna Beatriz</b> ❤️ e continua seus estudos <br/>
                  como projeto de extensão na UFC - Campus de Russas.
                </div>
                <div >
                  <img className="ps-4 pe-2" src={Logotipo} />
                  <b > USINN</b>
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
                <div className="p-3 text12px">
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
