// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            apiBase: 'https://api.nyeremenyjatek.donestudio.hu/api',
            apiVersion: '/v1',
            adminUrl: 'https://admin.nyeremenyjatek.donestudio.hu/',
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
    modules: ['@nuxtjs/i18n', 'nuxt-auth-sanctum', '@pinia/nuxt'],

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
                imports: [
                    'object',
                    'number',
                    'string',
                    'literal',
                    'union',
                    'boolean',
                    'url',
                    'extend',
                    'array',
                    'date',
                    'optional',
                ],
            },
        ],
    },
/*
    routeRules: {
        '/web/v1/**': {
            proxy: { to: `${process.env.NUXT_PUBLIC_API_BASE_LOCAL}v1/**` },
        },
        '/web/**': {
            proxy: { to: `${process.env.NUXT_PUBLIC_API_BASE_LOCAL}**` },
        },
    },
*/
    sanctum: {
        mode: 'token',
        baseUrl: 'https://api.nyeremenyjatek.donestudio.hu/api', // Laravel API
        redirect: {
            onLogin: '/',
            onLogout: '/login',
            onAuthOnly: '/login',
            onGuestOnly: '/account',
        },
        endpoints: {
            user: '/user',
        },
        globalMiddleware: {
            enabled: true,
        },
    },
});
