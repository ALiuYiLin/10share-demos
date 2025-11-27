import i18n, { type InitOptions } from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
i18n
.use(Backend)
.use(LanguageDetector)
.use(initReactI18next)
.init({
    fallbackLng: 'zh', //默认语言
    debug: import.meta.env.DEV, //开发环境开启调试
    supportedLngs: ['en', 'zh'],
    ns: ['common','home'],
    defaultNS: 'common',

    backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage']
    },
    interpolation: {
        escapeValue: false // React 以防 xss 关闭转义
    }
} as InitOptions)

export default i18n