import { createConfigForNuxt } from '@nuxt/eslint-config/flat';

export default createConfigForNuxt({})
    .overrideRules({
        'vue/html-self-closing': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/prop-name-casing': 'off',
    })
    .override('nuxt/javascript', {
        languageOptions: {
            globals: {
                useRuntimeConfig: 'readonly',
                useFetch: 'readonly',
                props: 'readonly',
                console: 'readonly',
                clearError: 'readonly',
                useNuxtApp: 'readonly',
                $fetchState: 'readonly',
                setTimeout: 'readonly',
                useRoute: 'readonly',
                FormData: 'readonly',
                navigateTo: 'readonly',
                useI18n: 'readonly',
                useLocalePath: 'readonly',
                useField: 'readonly',
                useForm: 'readonly',
                toTypedSchema: 'readonly',
                object: 'readonly',
                number: 'readonly',
                string: 'readonly',
                literal: 'readonly',
                union: 'readonly',
                defineEmits: 'readonly',
                mitt: 'readonly',
                useListen: 'readonly',
                useEvent: 'readonly',
                boolean: 'readonly',
                useTemplateRef: 'readonly',
                definePageMeta: 'readonly',
            },
        },
    });
