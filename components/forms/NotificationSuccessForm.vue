<template>
    <div>
        <form @submit.prevent="onSubmit">
            <HiddenInput v-if="id" name="id" :value="id" />

            <div class="col-12 mb-3">
                <Select v-bind="status" />
            </div>

            <button type="submit" :class="{ disabled: isSubmitting }" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script setup>
    const { t } = useI18n();

    const props = defineProps({
        id: {
            type: String,
            required: true,
        },
    });

    const status = ref({
        id: 'status',
        label: t('status'),
        value: props.status,
        name: 'status',
        options: [
            {
                label: t('success'),
                value: '1',
            },
            {
                label: t('drawAlternateWinner'),
                value: '0',
            },
        ],
        required: true,
    });

    const schema = object({
        id: string().min(1),
        status: union([literal('1'), literal('0')]),
    });

    const { handleSubmit, isSubmitting } = useForm({
        validationSchema: toTypedSchema(schema),
    });

    const onSubmit = handleSubmit(async (values) => {
        // TODO: Implement API call
        console.log(values);
        await navigateTo('/winners');
        useEvent('showToast', {
            title: t('success'),
            message: t('winnerUpdated'),
        });
    });
</script>
