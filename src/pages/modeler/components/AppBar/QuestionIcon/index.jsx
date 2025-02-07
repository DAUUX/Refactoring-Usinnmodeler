import React, { useState } from "react";
import questionIcon from '../../../../../assets/icons/toolbar-question-icon.svg';
import './index.css'; // Importe o arquivo CSS para estilizar o tooltip


import pontoDeAbertura from './pontoDeAbertura.png';
import pontoDeFechamento from './pontoDeFechamento.png';
import navegacao from './navegacao.png';
import unidadeDeApresentacao from './unidadeDeApresentacao.png';
import processoDoSistema from './processoDoSistema.png'
import feedbackDoSistema from './feedbackDoSistema.png'
import transicaodousuario from './transicaodousuario.png'
import acaoDoUsuario from './acaoDoUsuario.png'
import TransicaoDeCancelamento from './TransicaoDeCancelamento.png'
import colecaoDeDados from './colecaoDeDados.png'
import UnidadeDeApresentacaoSP from './UnidadeDeApresentacaoSP.png'
import AcaoDoUsuarioObrigatoria from './AcaoDoUsuarioObrigatoria.png'
import AlertaDeNotificacao from './AlertaDeNotificacao.png'
import indicadorDeProgresso from './indicadorDeProgresso.png'

const IconContainer = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [activeCarousel, setActiveCarousel] = useState("ajuda");
  return (
    <div className="icon-container d-flex align-items-center ps-2 pe-2">
      <button 
        className="btn" 
        onClick={() => setShowTooltip(!showTooltip)}
      >
        <img 
          src={questionIcon} 
          alt="Ampliar" 
          style={{ width: '20px', height: '20px' }} 
        />
      </button>
      {showTooltip && (
        <div className="custom-tooltip">

      <div className="tooltip-content" >
      {activeCarousel !== "ajuda" && (
        <div className="return-button ps-2" onClick={() => setActiveCarousel("ajuda")} >
          <i class="bi bi-list"></i>
        </div>
      )}
        <div className="close-button pe-2" onClick={() => setShowTooltip(false)+setActiveCarousel("ajuda")} >
          <i className="bi bi-x-lg"></i>
        </div>

        {/* Menu com 3 opções */}


        {/* Ajuda */}
        {activeCarousel === "ajuda" && (
          <div className="carousel slide px-3" >
            <div className="tooltip-menu">
              <h5>Ajuda - Elementos da Notação</h5>
              <div className="menu-container" style={{textAlign:"justify", paddingInline:"20px"}}>
                <div className="menu-item p-1 m-1" onClick={() => setActiveCarousel("navegacao")}>
                  <span className="">Elementos de Navegação</span>
                  <i className="bi bi-chevron-right mb-1"></i>
                </div>
                <div className="menu-item p-1 m-1" onClick={() => setActiveCarousel("interacao")}>
                  <span>Elementos de Interação</span>
                  <i className="bi bi-chevron-right mb-1"></i>
                </div>
                <div className="menu-item p-1 m-1" onClick={() => setActiveCarousel("usabilidade")}>
                  <span>Elementos de Usabilidade</span>
                  <i className="bi bi-chevron-right mb-1"></i>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Carrossel de Navegação */}
        {activeCarousel === "navegacao" && (
          <div id="carouselNavegacao" className="carousel slide" >
            <div className="carousel-inner" >
              <div className="carousel-item active" >
                <img 
                  src={pontoDeAbertura}
                  alt="Ponto de Abertura" 
                  style={{ width: '48px', objectFit: 'cover' }}
                />
                <h5 className="pt-2">Ponto de Abertura</h5>
                <p className="carousel-text">Indica o início da navegação e/ou da interação do usuário com o sistema.</p>
              </div>

              <div className="carousel-item">
                <img 
                  src={pontoDeFechamento}
                  alt="Ponto de Encerramento" 
                  style={{ width: '48px', objectFit: 'cover' }}
                />
                <h5 className="pt-2">Ponto de Encerramento</h5>
                <p className="carousel-text">Indica o término da navegação e/ou da interação do usuário com o sistema.</p>
              </div>
              
              <div className="carousel-item">
                <img 
                  src={navegacao}
                  alt="Seta de Navegacao" 
                  style={{ width: '50px', objectFit: 'cover' }}
                />
                <h5 className="pt-3 mt-1">Navegação</h5>
                <p className="carousel-text">Relacionamento entre unidades de apresentação. A direção das setas indica se o usuário pode prosseguir ou retornar a unidade de apresentação.</p>
              </div>

              <div className="carousel-item">
                <img 
                  src={unidadeDeApresentacao}
                  alt="Unidade de Apresentação" 
                  style={{ width: '80px', objectFit: 'cover' }}
                />
                <h5 className="pt-3">Unidade de Apresentação</h5>
                <p className="carousel-text">É uma unidade de apresentação que deve estar sempre acessível durante a interação.</p>
              </div>
              

            </div>
            <button id="buttoncarousel" className="carousel-control-prev" type="button" data-bs-target="#carouselNavegacao" data-bs-slide="prev">
              <i class="bi bi-chevron-left fs-2"></i>
            </button>
            <button id="buttoncarousel" className="carousel-control-next" type="button" data-bs-target="#carouselNavegacao" data-bs-slide="next">
              <i class="bi bi-chevron-right fs-2"></i>
            </button>
          </div>
        )}

        {/* Carrossel de Interação */}
        {activeCarousel === "interacao" && (
          <div id="carouselInteracao" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
              <img 
                  src={processoDoSistema}
                  alt="Processo do Sistema" 
                  style={{ width: '42px', objectFit: 'cover' }}
                />
                <h5 className="pt-3">Processo do Sistema</h5>
                <p className="carousel-text">Representa um processamento interno do sistema após uma solicitação do usuário.  Após a conclusão, os sistema deve fornecer um feedback.</p>
              
              </div>

              <div className="carousel-item">
              <img 
                  src={feedbackDoSistema}
                  alt="Feedback do sistema" 
                  style={{ width: '180px', objectFit: 'cover' }}
                />
                <h5 className="pt-4">Feedback do sistema</h5>
                <p className="carousel-text">Resposta fornecida pelo sistema a uma requisição do usuário. Se a requisição for executada com sucesso, a seta é contínua. Caso contrário, a seta é tracejada e informa o problema ocorrido.</p>
              </div>

              <div className="carousel-item">
              <img 
                  src={transicaodousuario}
                  alt="Transição do usuário" 
                  style={{ width: '160px', objectFit: 'cover' }}
                />
                <h5 className="pt-4">Transição do usuário</h5>
                <p className="carousel-text">Diálogo onde o usuário escolhe como prosseguir no sistema. Condições para que a transição seja realizada podem ser descritas como parâmetros.</p>
              </div>

              <div className="carousel-item">
              <img 
                  src={acaoDoUsuario}
                  alt="Ação do usuário" 
                  style={{ width: '80px', objectFit: 'cover' }}
                />
                <h5 className="pt-4">Ação do usuário</h5>
                <p className="carousel-text">Descreve ações do usuário que podem ser realizadas em direção a um objetivo de interação.</p>
              </div>

            </div>
            <button id="buttoncarousel" className="carousel-control-prev" type="button" data-bs-target="#carouselInteracao" data-bs-slide="prev">
              <i class="bi bi-chevron-left fs-2"></i>
            </button>
            <button id="buttoncarousel" className="carousel-control-next" type="button" data-bs-target="#carouselInteracao" data-bs-slide="next">
              <i class="bi bi-chevron-right fs-2"></i>
            </button>
          </div>
        )}

        {/* Carrossel de Usabilidade */}
        {activeCarousel === "usabilidade" && (
          <div id="carouselUsabilidade" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img 
                    src={TransicaoDeCancelamento}
                    alt="Transição de cancelamento" 
                    style={{ width: '50px', objectFit: 'cover' }}
                  />
                  <h5 className="pt-4">Transição de cancelamento</h5>
                  <p className="carousel-text">Descreve a possibilidade de o usuário desfazer ou cancelar ações.</p>
              </div>
                
              <div className="carousel-item">
                <img 
                    src={colecaoDeDados}
                    alt="Coleção de dados e query" 
                    style={{ width: '150px', objectFit: 'cover' }}
                  />
                  <h5 className="pt-2">Coleção de dados e query</h5>
                  <p className="carousel-text">Elemento que contém os dados apresentados e utilizados durante as operações do usuário. As preferências e elementos favoritos do usuário podem ser armazenados nas coleções de dados.</p>
              </div>

              <div className="carousel-item">
                <img 
                    src={UnidadeDeApresentacaoSP}
                    alt={"Unidade de apresentação ( sempre acessível )"} 
                    style={{ width: '120px', objectFit: 'cover' }}
                  />
                  <h5 className="pt-2">Unidade de apresentação <br/> ( sempre acessível )</h5>
                  <p className="carousel-text">Elemento que contém os dados apresentados e utilizados durante as operações do usuário. As preferências e elementos favoritos do usuário podem ser armazenados nas coleções de dados.</p>
              </div>

              <div className="carousel-item">
                <img 
                    src={AcaoDoUsuarioObrigatoria}
                    alt={"Ação do usuário obrigatória"} 
                    style={{ width: '120px', objectFit: 'cover' }}
                  />
                  <h5 className="pt-2">Ação do usuário obrigatória</h5>
                  <p className="carousel-text">Descreve ações do usuário obrigatórias para que o usuário prossiga em direção a um objetivo de interação.</p>
              </div>

              <div className="carousel-item">
                <img 
                    src={AlertaDeNotificacao}
                    alt={"Alerta de notificação ou confirmação"} 
                    style={{ width: '120px', objectFit: 'cover' }}
                  />
                  <h5 className="pt-2">Alerta de notificação ou confirmação</h5>
                  <p className="carousel-text">Representa um alerta que o sistema pode emitir durante a interação do usuário com sistema, devido a determinadas condições. Não irá interromper a interação nem requer uma resposta do usuário.</p>
              </div>

              <div className="carousel-item">
                <img 
                    src={indicadorDeProgresso}
                    alt={"Progresso no sistema com indicador de progresso"} 
                    style={{ width: '120px', objectFit: 'cover' }}
                  />
                  <h5 className="pt-2">Progresso no sistema com indicador de progresso</h5>
                  <p className="carousel-text">Representa um processamento interno do sistema após uma solicitação do usuário. Após sua conclusão, o sistema deve fornecer feedback ao usuário.</p>
              </div>
              

            </div>
            <button id="buttoncarousel" className="carousel-control-prev" type="button" data-bs-target="#carouselUsabilidade" data-bs-slide="prev">
              <i class="bi bi-chevron-left fs-2"></i>
            </button>
            <button id="buttoncarousel" className="carousel-control-next" type="button" data-bs-target="#carouselUsabilidade" data-bs-slide="next">
              <i class="bi bi-chevron-right fs-2"></i>
            </button>
          </div>
        )}
      </div>
    </div>
      )}
    </div>
  );
};

export default IconContainer;