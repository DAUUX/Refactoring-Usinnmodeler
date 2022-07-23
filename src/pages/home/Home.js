import "./style.scss";
import { useHistory } from "react-router-dom"; // import do hook
import diagrama from "../../assets/icons/diagrama.svg";
import Interation from "../../assets/icons/interacao.svg";
import Navigation from "../../assets/icons/navegacao.svg";
import USability from "../../assets/icons/usabilidade.svg";
import Document from "../../assets/icons/Document.svg";

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

  showSubmit(true);

  return (
    <main>
      <section className="sections">
        <section className="bloco" id="section1">
          <div>
            <figure>
              <blockquote class="blockquote">
                <label id="title_section1" class="lh-1">
                  EXPERIÊNCIA COMPLETA
                </label>
                <label id="title2_section1" class="lh-1">
                  MODELAGEM 3 EM 1
                </label>
              </blockquote>
              <figcaption class="blockquote">
                <label id="text_section1" class="lh-1 textbreak">
                  Modele a interação e a navegação de sistemas interativos
                  <div class="clearfix"></div> com foco na usabilidade.
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
          <div class="container">
            <div class="row justify-content-evenly" id="container_section2">
              <div class="col-5">
                <img
                  src={diagrama}
                  id="img_diagrama"
                  class="rounded float-left img-fluid w-30"
                  alt="diagrama"
                />
              </div>
              <div className="col-5">
                <figure class="text-start">
                  <blockquote class="blockquote">
                    <label id="title_section2">USINN</label>
                  </blockquote>
                  <figcaption class="blockquote">
                    <label class="lh-1 textbreak">
                      <p class="text-muted fst-italic">
                        USability-oriented INteraction and Navigation Model
                      </p>
                    </label>
                    <label id="text_section2" class="lh-1 text-break fw-normal">
                      É um modelo de interação e navegação orientado à{" "}
                      usabilidade que visa a melhoria da qualidade de uso de
                      sistemas interativos.
                    </label>
                  </figcaption>
                </figure>
                <button
                  className="btn btn-primary"
                  id="btn_modeler"
                  type="submit"
                  onClick={goToLogin}
                >
                  Comece a modelar
                </button>
              </div>
            </div>
            <div
              className="row justify-content-evenly fixed-bottom"
              id="container-main"
            >
              <div className="container_interation col-3">
                <img
                  src={Interation}
                  id="img_interacao"
                  className="rounded float-left img-fluid w-10"
                  alt="interacao"
                />
                <h6 className="fw-normal fs-5 lh-sm">
                  Modela a interação
                  <blockquote class="blockquote">
                    <p class="text-muted text-left text-wrap lh-sm fs-6">
                      Descreve o comportamento entre o usuário e o sistema
                      computacional.
                    </p>
                  </blockquote>
                </h6>
              </div>
              <div className="container_navigation col-3">
                <img
                  src={Navigation}
                  id="img_navegacao"
                  className="rounded float-left img-fluid w-10"
                  alt="navegacao"
                />
                <h6 className="fw-normal fs-5 lh-sm">
                  Modela a navegação
                  <blockquote class="blockquote">
                    <p class="text-muted text-left text-wrap lh-sm fs-6">
                      Compreende nós de navegação e fluxos de navegação entre os
                      nós.
                    </p>
                  </blockquote>
                </h6>
              </div>
              <div className="container_usability col-3">
                <img
                  src={USability}
                  id="img_usabilidade"
                  className="rounded float-left img-fluid w-10"
                  alt="usabilidade"
                />
                <h6 className="fw-normal fs-5 lh-sm">
                  Foco na usabilidade
                  <blockquote class="blockquote">
                    <p class="text-muted text-left text-wrap lh-sm fs-6">
                      Representa mecanismos de usabilidade que impactam na
                      interação.
                    </p>
                  </blockquote>
                </h6>
              </div>
              <h3 className="text-center fw-normal fs-6" id="texto_final">
                <img
                  src={Document}
                  id="img_document"
                  class="rounded float-left img-fluid w-30"
                  alt="document"
                />
                <a href="">
                  Confira a tese que iniciou o USINN
                </a>
              </h3>
            </div>
          </div>
        </section>

        <section className="bloco" id="section3"></section>
      </section>
    </main>
  );
}
export default Home;
