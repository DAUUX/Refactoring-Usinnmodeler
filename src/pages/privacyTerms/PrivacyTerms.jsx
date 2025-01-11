import './style.scss';
import usinnModeler from "../../assets/icons/usinn-logo-horiz.png";
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function PrivacyTerms() {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = t('Termos de Privacidade - USINN Modeler');
    }, [t]);

    return (
        <main id="termosPrivacidade" className="py-5" aria-labelledby="region">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-12 d-flex justify-content-center align-items-center pb-4" aria-hidden="true">
                        <img src={usinnModeler} alt="" />
                        <span className="text-primary fs-3 fw-light ms-2">Modeler</span>
                    </div>

                    <div className="col-12 col-lg-10">

                        <h1 id="region" className="mb-4">{t('Termos de Uso e Política de Privacidade')}</h1>

                        <p className="fs-5">{t('Bem-vindo ao nosso sistema. Antes de utilizá-lo, pedimos que leia atentamente os seguintes termos de uso e política de privacidade. Ao continuar a utilizar o nosso sistema, você concorda com estes termos.')}</p>

                        <h2>{t('Coleta de dados pessoais')}</h2>
                        <p className="fs-5">{t('Nós coletamos dados pessoais, tais como nome, sobrenome, endereço de e-mail, gênero, data de nascimento, ocupação e organização. Esses dados são coletados com o objetivo de identificar e analisar o público-alvo do sistema.')}</p>
                        
                        <h2>{t('Uso dos dados pessoais')}</h2>
                        <p className="fs-5">{t('Os dados pessoais coletados são armazenados em nossos servidores e serão utilizados apenas para os fins descritos nesta política de privacidade. Não compartilharemos esses dados com terceiros sem o consentimento prévio do usuário, exceto quando exigido por lei.')}</p>

                        <h2>{t('Segurança dos dados pessoais')}</h2>
                        <p className="fs-5">{t('Tomamos medidas de segurança para proteger os dados pessoais coletados em nosso sistema contra perda, uso indevido, alteração ou destruição. No entanto, nenhum método de transmissão ou armazenamento de dados na Internet é 100% seguro e, portanto, não podemos garantir a segurança absoluta dos dados pessoais.')}</p>

                        <h2>{t('Acesso, correção e exclusão dos dados pessoais')}</h2>
                        <p className="fs-5">{t('De acordo com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/18), o usuário pode solicitar acesso aos dados pessoais que coletamos, bem como solicitar correções ou exclusões desses dados. O usuário também pode solicitar a limitação ou a portabilidade desses dados, assim como a revogação do consentimento que tenha nos fornecido. Para fazer uma solicitação, o usuário pode entrar em contato conosco através do e-mail indicado em nosso sistema.')}</p>

                        <h2>{t('Cookies e tecnologias de rastreamento')}</h2>
                        <p className="fs-5">{t('Nós utilizamos cookies e outras tecnologias de rastreamento em nosso sistema para melhorar a experiência do usuário e fornecer um serviço mais personalizado. Os cookies que utilizamos estão relacionados a criação de conta, para o gerenciamento do processo de inscrição e administração geral, e ao login no sistema, para evitar que você precise realizar login sempre que visitar uma nova página. Esses cookies serão excluídos quando você sair do sistema.')}</p>

                        <h3>{t('Cookies de Terceiros')}</h3>
                        <p className="fs-5">{t('Em alguns casos especiais, podemos também usar cookies fornecidos por terceiros confiáveis. A seção a seguir detalha quais cookies de terceiros você pode encontrar através deste site.')}</p>

                        <h4>{t('YouTube video widget')}</h4>
                        <p className="mb-0">{t('YouTube é um serviço de visualização de conteúdo de vídeo fornecido pelo Google LLC que permite a este Site a incorporar conteúdo desse tipo em suas páginas.')}</p>
                        <small>{t('Mais informações:')} 
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">{t('Política de privacidade Youtube')}</a>
                        </small>

                        <h4 className="mt-2">{t('Google Fonts')}</h4>
                        <p className="mb-0">{t('Google Fonts é um serviço de visualização de face de tipo fornecido pelo Google LLC que permite este Site a incorporar conteúdo desse tipo em suas páginas.')}</p>
                        <small>{t('Mais informações:')} 
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">{t('Política de privacidade Google Fonts')}</a>
                        </small>

                        <h2 className="mt-3">{t('Atualização dos termos de uso e política de privacidade')}</h2>

                        <p className="fs-5">{t('Reservamo-nos o direito de atualizar estes termos de uso e política de privacidade a qualquer momento. A nova versão dos termos será publicada em nosso sistema e entrará em vigor imediatamente após a publicação.')}</p>

                    </div>

                </div>

            </div>

        </main>

    )

}

export default PrivacyTerms;