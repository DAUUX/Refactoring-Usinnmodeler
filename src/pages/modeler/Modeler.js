
export default function Modeler() {
    return (
        <div className="conteinerPricipal">
        <head>
        <meta charset="utf-8"/>
        <meta name="viewport" 
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>USINN Modeler</title>

        <link rel="stylesheet" href="css/bootstrap.min.css"/>
        <link rel="stylesheet" type="text/css" href="css/offcanvas.css"/>
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />

        <link href="css/style.css" rel="stylesheet" />
      </head>
      <body class="bg-dark" onload="createEditor('config/usinnComponents.xml');">
    
          <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
            <div class="container">
              <div class="navbar-translate">
                <a class="navbar-brand" href="index.html"><b>USINN Modeler</b></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="navbar-toggler-icon"></span>
                  <span class="navbar-toggler-icon"></span>
                  <span class="navbar-toggler-icon"></span>
                </button>
              </div>
              <div class="collapse navbar-collapse">
              <span style="float:right;padding-right:36px;" hidden="hidden">
                <input id="source" type="checkbox"/> Source
              </span>
              <textarea id="xml" style="font-size: 10px;width: 500px;" hidden="hidden"></textarea>
                <ul class="navbar-nav">
                  <li class="dropdown nav-item">
                    <a href="" class="dropdown-toggle nav-link disabled" data-toggle="dropdown">Arquivo</a>
                    <div class="dropdown-menu">
                      <a href="#" class="dropdown-item disabled">Novo</a>
                      <a href="#" class="dropdown-item disabled">Abrir</a>
                      <div class="dropdown-divider"></div>
                      <a href="#" class="dropdown-item disabled">Salvar</a>
                      <a href="#" class="dropdown-item disabled">Salvar em</a>
                      <div class="dropdown-divider"></div>
                      <a href="#" class="dropdown-item disabled">Importar...</a>
                      <a href="#" class="dropdown-item disabled">Exportar...</a>
                    </div>
                  </li>
    
                  <li class="dropdown nav-item ">
                    <a href="" class="dropdown-toggle nav-link disabled" data-toggle="dropdown">Visualizar</a>
                    <div class="dropdown-menu">
                    </div>
                  </li>
    
                  <li class="dropdown nav-item">
                    <a href="" class="dropdown-toggle nav-link" data-toggle="dropdown">Ajuda</a>
                    <div class="dropdown-menu">
                    <a href="resources/oficina_usinn.pdf" target="_blank" class="dropdown-item">Acessar apresentação</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
    
        <nav id="menu-ferramentas" class="nav nav-underline nav-scroller bg-white shadow-sm">
            <div class="container" style="margin-left: 20px;" >
                <div id="mainActions"
                    style="width:100%;padding-top:8px;padding-left:24px;padding-bottom:8px;">
                </div>
                <div id="selectActions" style="width:100%;padding-left:54px;padding-bottom:4px;" hidden="hidden">
                </div>
            </div>
        </nav>
    
    
          <main role="main" class="row" style="height: 1000px;">
              <div class="col-2 h-80 bg-light" style="background-color: blue;">
            <center class="h-100">
                    <div id="toolbar" class="h-100" style="">
                    </div>
            </center>
            
              </div>
    
              <div id="graph" class="col-10 bg-white" style="position:relative;overflow:hidden;background:url('images/grid.gif');cursor:default;">
                  <center id="splash">
                      
                  </center>
    
              </div>
              <div id="outlineContainer"
                  style="position:absolute;overflow:hidden;top:75%;right:20px;width:200px;height:140px;background:white;border-style:solid;border-color:black;">
    
              </div>
    
    
              <div id="zoomActions" style="width:100%;padding-left:54px;padding-top:4px;" hidden="hidden">
              </div>
              <div id="footer" hidden="hidden">
                  <p id="status">

                  </p>
              </div>
          </main>
    
        <script type="text/javascript" src="js/offcanvas.js"></script>
    
        
    
           </body>
      </div>
    );
 }