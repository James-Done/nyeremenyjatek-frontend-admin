// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || 'default_api_base',
            apiVersion: process.env.NUXT_PUBLIC_API_VERSION || 'default_api_version',
            adminUrl: process.env.NUXT_PUBLIC_API_BASE && process.env.NUXT_PUBLIC_API_VERSION ?
                `${process.env.NUXT_PUBLIC_API_BASE}${process.env.NUXT_PUBLIC_API_VERSION}/admin/` :
                'default_admin_url',
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

    routeRules: {
        '/web/v1/**': {
            proxy: { to: `${process.env.NUXT_PUBLIC_API_BASE_LOCAL}v1/**` },
        },
        '/web/**': {
            proxy: { to: `${process.env.NUXT_PUBLIC_API_BASE_LOCAL}**` },
        },
    },

    sanctum: {
        mode: 'token',
        baseUrl: `${process.env.NUXT_PUBLIC_API_BASE}`, // Laravel API
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
