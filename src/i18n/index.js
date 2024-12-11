import i18n from 'i18next';
import { initReactI18next  } from 'react-i18next';
import PTBR from './locales/pt/pt-br.json';
import ENUS from './locales/en/en-us.json';

const resources = {
    enUS: {
        ...ENUS
    },
    ptBR: {
        ...PTBR
    }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ptBR',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;