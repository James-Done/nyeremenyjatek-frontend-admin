<template>
    <div>
        <AccountForm v-bind="account" />
    </div>
</template>

<script setup>
    const { t } = useI18n();
    const route = useRoute();
    const id = route.params.id;

    // TODO: fetch account data by id
    const account = {
        id: id,
        account_name: {
            id: 'account_name',
            label: t('companyName'),
            value: 'Test' + id.value,
            name: 'account_name',
            required: true,
        },
        public_url: {
            id: 'public_url',
            label: t('publicUrl'),
            value: 'https://test.com',
            name: 'public_url',
            required: true,
        },
        superadmin_name: {
            id: 'superadmin_name',
            label: t('superadminName'),
            value: 'superadmin_name',
            name: 'superadmin_name',
            required: true,
        },
        superadmin_email: {
            id: 'superadmin_email',
            label: t('superadminEmail'),
            value: 'asd@asd.asd',
            name: 'superadmin_email',
            required: true,
            disabled: true,
        },
        plan: {
            id: 'plan',
            label: t('plan'),
            value: 'optimum',
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
        },
    };
</script>
