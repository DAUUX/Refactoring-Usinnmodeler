import Spinner from "../../components/Spinner";
import { useHistory } from "react-router-dom"; // import do hook

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
            <div className="col-12 text-center">
              <label id="title_section1">EXPERIÊNCIA COMPLETA</label>
              <label id="text_section1">
                Construa seus diagramas de interação, crie seu time e
                compartilhe projetos.
              </label>
            </div>
            <button
              className="btn btn-light btn-outline-primary"
              type="submit"
              onClick={goToLogin}
            >
              USINN MODELER
            </button>
          </div>
        </section>
        <section className="bloco" id="section2"></section>
        <section className="bloco" id="section3"></section>
      </section>
    </main>
  );
}
export default Home;
