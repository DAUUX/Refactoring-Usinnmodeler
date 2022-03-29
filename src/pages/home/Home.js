import "../home/Home.css";
import { useHistory } from "react-router-dom";
function Home() {
const history = useHistory();
const onNextButtonClick = () => {
  history.replace("/modeler");
};
  return (
    <div className="conteinerPrincipal">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <link rel="icon" href="../../../../favicon.ico" />
        <title>USINN Modeler</title>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
          crossorigin="anonymous"
        />
        <script
          src={
            "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
          }
          integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
          crossorigin="anonymous"
        ></script>

        <link href="bootstrap/cover.css" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300"
          rel="stylesheet"
        />
      </head>
      <body class="text-center">
        <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <header class="masthead mb-auto">
            <div class="inner">
              <h3 class="masthead-brand">USINN Modeler</h3>
              <nav class="nav nav-masthead justify-content-center">
                <a class="nav-link active" href="#">
                  Início
                </a>
                <a class="nav-link" href="#">
                  Sobre
                </a>
                <a class="nav-link" href="#">
                  Contato
                </a>
                <a class="nav-link" href="/cadastro">
                  Cadastro
                </a>
                <a class="nav-link" href="/login">
                  Login
                </a>
              </nav>
            </div>
          </header>

          <main role="main" class="inner cover">
            <h1 class="cover-heading">Em desenvolvimento...</h1>
            <p class="lead">
              O USINN Modeler é uma ferramenta para auxiliar a modelagem de
              diagramas USINN de forma rápida e simples.
            </p>
            <p class="lead">
              <button
                class="btn btn-lg btn-secondary"
                onClick={onNextButtonClick}
              >
                Acesse a versão BETA
              </button>
            </p>
          </main>

          <footer class="mastfoot mt-auto">
            <div class="inner">
              <p>Desenvolvido por</p>
              <a href="https://github.com/alex-felipe/">Alex Felipe</a>
            </div>
          </footer>
        </div>

        <script
          src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
          integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
          crossorigin="anonymous"
        ></script>
        <script src="bootstrap/popper.min.js"></script>
        <script src="bootstrap/bootstrap.min.js"></script>
      </body>
    </div>
  );
}
export default Home;
