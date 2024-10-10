<template>
    <div>
        <form @submit="onSubmit">
            <div class="container">
                <div class="row">
                    <div class="col-12 mb-3">
                        <h1 v-if="typeof id === 'undefined'">{{ $t('addAccount') }}</h1>
                        <h1 v-else>{{ $t('editAccount') }}</h1>
                    </div>

                    <HiddenInput v-if="id" name="id" :value="id" />

                    <div class="col-12 mb-3">
                        <TextInput v-bind="account_name" />
                    </div>

                    <div class="col-12 mb-3">
                        <TextInput v-bind="public_url" />
                    </div>

                    <div class="col-12 mb-3">
                        <TextInput v-bind="superadmin_name" />
                    </div>

                    <div class="col-12 mb-3">
                        <EmailInput v-bind="superadmin_email" />
                    </div>

                    <div class="col-12 mb-3">
                        <Select v-bind="plan" />
                    </div>

                    <div class="col-12 mb-3">
                        <button type="submit" :class="{ disabled: isSubmitting }" class="btn btn-primary">
                            {{ $t('submit') }}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
    defineProps({
        id: {
            type: String,
            default: undefined,
        },
        account_name: {
            type: Object,
            default: () => {
                const { t } = useI18n();
                return {
                    id: 'account_name',
                    label: t('companyName'),
                    value: '',
                    name: 'account_name',
                    required: true,
                };
            },
        },
        public_url: {
            type: Object,
            default: () => {
                const { t } = useI18n();
                return {
                    id: 'public_url',
                    label: t('publicUrl'),
                    value: '',
                    name: 'public_url',
                    required: true,
                };
            },
        },
        superadmin_name: {
            type: Object,
            default: () => {
                const { t } = useI18n();
                return {
                    id: 'superadmin_name',
                    label: t('superadminName'),
                    value: '',
                    name: 'superadmin_name',
                    required: true,
                };
            },
        },
        superadmin_email: {
            type: Object,
            default: () => {
                const { t } = useI18n();
                return {
                    id: 'superadmin_email',
                    label: t('superadminEmail'),
                    value: '',
                    name: 'superadmin_email',
                    required: true,
                    disabled: false,
                };
            },
        },
        plan: {
            type: Object,
            default: () => {
                const { t } = useI18n();
                return {
                    id: 'plan',
                    label: t('plan'),
                    value: 'minimum',
                    name: 'plan',
                    options: [
                        {
                            label: 'Minimum',
                            value: 'minimum',
                        },
                        {
                            label: 'Optimum',
                            value: 'optimum',
                        },
                    ],
                    required: true,
                };
            },
        },
    });

    const schema = object({
        id: string().optional(),
        account_name: string().min(1),
        public_url: string().url().min(1),
        superadmin_name: string().min(1),
        superadmin_email: string().email().min(1),
        plan: union([literal('minimum'), literal('optimum')]),
    });

    const { handleSubmit, isSubmitting } = useForm({
        validationSchema: toTypedSchema(schema),
    });

    const onSubmit = handleSubmit(async (values) => {
        console.log(values);

        // TODO: submit form
        await navigateTo('/accounts');
        useEvent('showToast', {
            title: 'Success',
            message: 'Account created successfully',
        });
    });
</script>
