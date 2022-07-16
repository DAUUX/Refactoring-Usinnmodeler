import { useHistory } from 'react-router-dom'; // import do hook
import diagrama from "../../assets/icons/diagrama.svg";

function Home() {
  const history = useHistory(); //chamado do hook


  const goToLogin = () => {
    history.push("/modeler/:id?/:slug?"); //uso do hook para ir para a página
  };
  return (
    <main>
      <section className="sections">
        <section className="bloco" id="section1">
          <div>
            
            <figure>
            <blockquote class="blockquote">
              <label id="title_section1" class="lh-1">EXPERIÊNCIA COMPLETA</label>
              
            </blockquote>
            <figcaption class="blockquote">
              <label id="text_section1" class="lh-1 textbreak">
                Modele a interação e a navegação de sistemas interativos<div class="clearfix"></div> com foco na usabilidade.               
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
            <div class="float-start">
              <div class="col-8">
                <img src={diagrama} id="img_diagrama" class="float-start w-500" alt="diagrama" />
              </div>
            </div>

            <div class="container-section2 float-end w-50">
            <figure class="text-start">
            <blockquote class="blockquote">
              <label id="title_section2" class="lh-1">USINN</label> 
            </blockquote>
            <figcaption class="blockquote">
              <label class="lh-1 textbreak">
                <p class="text-muted fst-italic">
                  USability-oriented INteraction and Navigation Model
                </p>
                
              </label>
              <label id="text_section2" class="lh-1 textbreak fw-normal">
                É um modelo de interação e navegação orientado à <div class="clearfix"></div> usabilidade que visa a melhoria 
                da qualidade de uso <div class="clearfix"></div> de sistemas interativos.               
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
        </section>
       
        <section className="bloco" id="section3"></section>
      </section>
    </main>
  );
}
export default Home;
