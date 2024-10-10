// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
        },
    },

    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],

    router: {
        options: {
            linkActiveClass: 'active',
        },
    },

    build: {
        transpile: ['@vuepic/vue-datepicker'],
    },

    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    css: ['bootstrap/dist/css/bootstrap.min.css'],
    modules: ['@nuxtjs/i18n'],

    i18n: {
        vueI18n: './i18n.config.ts',
        locales: ['en', 'hu'],
        defaultLocale: 'en',
    },

    imports: {
        presets: [
            {
                from: 'vee-validate',
                imports: ['useField', 'useForm'],
            },
            {
                from: '@vee-validate/zod',
                imports: ['toTypedSchema'],
            },
            {
                from: 'zod',
                imports: ['object', 'number', 'string', 'literal', 'union', 'boolean', 'url', 'extend', 'array'],
            },
        ],
    },
});
