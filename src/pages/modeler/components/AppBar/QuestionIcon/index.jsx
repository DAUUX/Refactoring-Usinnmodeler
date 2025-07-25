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
import { useTranslation } from 'react-i18next';

const IconContainer = () => {
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);
  const [activeCarousel, setActiveCarousel] = useState("ajuda");
  return (
    <div className="icon-container d-flex align-items-center ps-2 pe-2 outline-black">
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
        <div tabIndex="0" className="return-button ps-2" onClick={() => setActiveCarousel("ajuda")} onKeyDown={(e) => e.key === "Enter" && setActiveCarousel("ajuda")} >
          <i className="bi bi-list"></i>
        </div>
      )}
        <div tabIndex="0" className="close-button pe-2" onClick={() => setShowTooltip(false)+setActiveCarousel("ajuda")} onKeyDown={(e) => e.key === "Enter" && setShowTooltip(false)+setActiveCarousel("ajuda")}>
          <i className="bi bi-x-lg"></i>
        </div>

        {/* Menu com 3 opções */}


        {/* Ajuda */}
        {activeCarousel === "ajuda" && (
          <div className="carousel slide px-3" >
            <div className="tooltip-menu">
              <h5>{t("Ajuda - Elementos da Notação")}</h5>
              <div className="menu-container" style={{textAlign:"justify", paddingInline:"20px"}}>
                <div tabIndex="0" className="menu-item p-1 m-1" onClick={() => setActiveCarousel("navegacao")} onKeyDown={(e) => e.key === "Enter" && setActiveCarousel("navegacao")} >
                  <span className="">{t("Elementos de Navegação")}</span>
                  <i className="bi bi-chevron-right mb-1"></i>
                </div>
                <div tabIndex="0" className="menu-item p-1 m-1" onClick={() => setActiveCarousel("interacao")} onKeyDown={(e) => e.key === "Enter" && setActiveCarousel("interacao")}>
                  <span>{t("Elementos de Interação")}</span>
                  <i className="bi bi-chevron-right mb-1"></i>
                </div>
                <div tabIndex="0" className="menu-item p-1 m-1" onClick={() => setActiveCarousel("usabilidade")} onKeyDown={(e) => e.key === "Enter" && setActiveCarousel("usabilidade")}>
                  <span>{t("Elementos de Usabilidade")}</span>
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
                  alt={t("Ponto de Abertura")}
                  style={{ width: '48px', objectFit: 'cover' }}
                />
                <h5 className="pt-2">{t("Ponto de Abertura")}</h5>
                <p className="carousel-text">{t("Indica o início da navegação e/ou da interação do usuário com o sistema.")}</p>
              </div>

              <div className="carousel-item">
                <img 
                  src={pontoDeFechamento}
                  alt={t("Ponto de Fechamento")} 
                  style={{ width: '48px', objectFit: 'cover' }}
                />
                <h5 className="pt-2">{t("Ponto de Fechamento")}</h5>
                <p className="carousel-text">{t("Indica o término da navegação e/ou da interação do usuário com o sistema.")}</p>
              </div>
              
              <div className="carousel-item">
                <img 
                  src={navegacao}
                  alt={t("Navegacao")} 
                  style={{ width: '50px', objectFit: 'cover' }}
                />
                <h5 className="pt-3 mt-1">{t("Navegação")}</h5>
                <p className="carousel-text">{t("Relacionamento entre unidades de apresentação. A direção das setas indica se o usuário pode prosseguir ou retornar a unidade de apresentação.")}</p>
              </div>

              <div className="carousel-item">
                <img 
                  src={unidadeDeApresentacao}
                  alt={t("Unidade de apresentação")} 
                  style={{ width: '80px', objectFit: 'cover' }}
                />
                <h5 className="pt-3">{t("Unidade de apresentação")}</h5>
                <p className="carousel-text">{t("É uma unidade de apresentação que deve estar sempre acessível durante a interação.")}</p>
              </div>
              

            </div>
            <button id="buttoncarousel" className="carousel-control-prev" type="button" data-bs-target="#carouselNavegacao" data-bs-slide="prev">
              <i className="bi bi-chevron-left fs-2"></i>
            </button>
            <button id="buttoncarousel" className="carousel-control-next" type="button" data-bs-target="#carouselNavegacao" data-bs-slide="next">
              <i className="bi bi-chevron-right fs-2"></i>
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
                  alt={t("Processo do Sistema")} 
                  style={{ width: '42px', objectFit: 'cover' }}
                />
                <h5 className="pt-3">{t("Processo do Sistema")}</h5>
                <p className="carousel-text">{t("Representa um processamento interno do sistema após uma solicitação do usuário.  Após a conclusão, os sistema deve fornecer um feedback.")}</p>
              
              </div>

              <div className="carousel-item">
              <img 
                  src={feedbackDoSistema}
                  alt={t("Feedback do sistema")} 
                  style={{ width: '180px', objectFit: 'cover' }}
                />
                <h5 className="pt-4">{t("Feedback do sistema")}</h5>
                <p className="carousel-text">{t("Resposta fornecida pelo sistema a uma requisição do usuário. Se a requisição for executada com sucesso, a seta é contínua. Caso contrário, a seta é tracejada e informa o problema ocorrido.")}</p>
              </div>

              <div className="carousel-item">
              <img 
                  src={transicaodousuario}
                  alt={t("Transição do Usuário")} 
                  style={{ width: '160px', objectFit: 'cover' }}
                />
                <h5 className="pt-4">{t("Transição do Usuário")}</h5>
                <p className="carousel-text">{t("Diálogo onde o usuário escolhe como prosseguir no sistema. Condições para que a transição seja realizada podem ser descritas como parâmetros.")}</p>
              </div>

              <div className="carousel-item">
              <img 
                  src={acaoDoUsuario}
                  alt={t("Ação do Usuário")} 
                  style={{ width: '80px', objectFit: 'cover' }}
                />
                <h5 className="pt-4">{t("Ação do Usuário")}</h5>
                <p className="carousel-text">{t("Descreve ações do usuário que podem ser realizadas em direção a um objetivo de interação.")}</p>
              </div>

            </div>
            <button id="buttoncarousel" className="carousel-control-prev" type="button" data-bs-target="#carouselInteracao" data-bs-slide="prev">
              <i className="bi bi-chevron-left fs-2"></i>
            </button>
            <button id="buttoncarousel" className="carousel-control-next" type="button" data-bs-target="#carouselInteracao" data-bs-slide="next">
              <i className="bi bi-chevron-right fs-2"></i>
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
                    alt={t("Transição de Cancelamento")} 
                    style={{ width: '50px', objectFit: 'cover' }}
                  />
                  <h5 className="pt-4">{t("Transição de Cancelamento")}</h5>
                  <p className="carousel-text">{t("Descreve a possibilidade de o usuário desfazer ou cancelar ações.")}</p>
              </div>
                
              <div className="carousel-item">
                <img 
                    src={colecaoDeDados}
                    alt={t("Coleção de dados e query")} 
                    style={{ width: '150px', objectFit: 'cover' }}
                  />
                  <h5 className="pt-2">{t("Coleção de dados e query")}</h5>
                  <p className="carousel-text">{t("Elemento que contém os dados apresentados e utilizados durante as operações do usuário. As preferências e elementos favoritos do usuário podem ser armazenados nas coleções de dados.")}</p>
              </div>

              <div className="carousel-item">
                <img 
                    src={UnidadeDeApresentacaoSP}
                    alt={t("Unidade de apresentação ( sempre acessível )")} 
                    style={{ width: '120px', objectFit: 'cover' }}
                  />
                  <h5 className="pt-2">{t("Unidade de apresentação")} <br/> ( {t("sempre acessível")} )</h5>
                  <p className="carousel-text">{t("Elemento que contém os dados apresentados e utilizados durante as operações do usuário. As preferências e elementos favoritos do usuário podem ser armazenados nas coleções de dados.")}</p>
              </div>

              <div className="carousel-item">
                <img 
                    src={AcaoDoUsuarioObrigatoria}
                    alt={t("Ação do Usuário (Obrigatória)")} 
                    style={{ width: '120px', objectFit: 'cover' }}
                  />
                  <h5 className="pt-2">{t("Ação do Usuário (Obrigatória)")}</h5>
                  <p className="carousel-text">{t("Descreve ações do usuário obrigatórias para que o usuário prossiga em direção a um objetivo de interação.")}</p>
              </div>

              <div className="carousel-item">
                <img 
                    src={AlertaDeNotificacao}
                    alt={t("Alerta de notificação ou confirmação")} 
                    style={{ width: '120px', objectFit: 'cover' }}
                  />
                  <h5 className="pt-2">{t("Alerta de notificação ou confirmação")}</h5>
                  <p className="carousel-text">{t("Representa um alerta que o sistema pode emitir durante a interação do usuário com sistema, devido a determinadas condições. Não irá interromper a interação nem requer uma resposta do usuário.")}</p>
              </div>

              <div className="carousel-item">
                <img 
                    src={indicadorDeProgresso}
                    alt={t("Progresso no sistema com indicador de progresso")} 
                    style={{ width: '120px', objectFit: 'cover' }}
                  />
                  <h5 className="pt-2">{t("Progresso no sistema com indicador de progresso")}</h5>
                  <p className="carousel-text">{t("Representa um processamento interno do sistema após uma solicitação do usuário. Após sua conclusão, o sistema deve fornecer feedback ao usuário.")}</p>
              </div>
              

            </div>
            <button id="buttoncarousel" className="carousel-control-prev" type="button" data-bs-target="#carouselUsabilidade" data-bs-slide="prev">
              <i className="bi bi-chevron-left fs-2"></i>
            </button>
            <button id="buttoncarousel" className="carousel-control-next" type="button" data-bs-target="#carouselUsabilidade" data-bs-slide="next">
              <i className="bi bi-chevron-right fs-2"></i>
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