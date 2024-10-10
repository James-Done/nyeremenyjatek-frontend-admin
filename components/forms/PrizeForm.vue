<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1 v-if="typeof id === 'undefined'">{{ $t('addPrize') }}</h1>
                    <h1 v-else>{{ $t('editPrize') }}</h1>
                </div>
            </div>
            <div class="row">
                <form @submit="onSubmit">
                    <input v-if="id" type="hidden" :value="id" />
                    <div class="mb-3">
                        <TextInput
                            id="prizeName"
                            :value="prizeName"
                            :label="$t('prizeName')"
                            :required="true"
                            name="prizeName"
                        />
                    </div>
                    <div class="mb-3">
                        <TextArea
                            id="prizeDescription"
                            :value="prizeDescription"
                            :label="$t('prizeDescription')"
                            :required="true"
                            name="prizeDescription"
                        />
                    </div>

                    <div class="mb-3">
                        <NumberInput
                            id="prizeQuantity"
                            :value="prizeQuantity"
                            :label="$t('prizeQuantity')"
                            :required="true"
                            name="prizeQuantity"
                        />
                    </div>

                    <div class="mb-3">
                        <Select
                            id="prizeType"
                            :value="prizeType"
                            :label="$t('prizeType')"
                            :required="true"
                            name="prizeType"
                            :options="[
                                { value: 'daily', label: $t('daily') },
                                { value: 'weekly', label: $t('weekly') },
                                { value: 'monthly', label: $t('monthly') },
                                { value: 'grand', label: $t('grand') },
                            ]"
                        />
                    </div>

                    <div class="mb-3">
                        <label for="prizeImage" class="form-label">{{ $t('prizeImage') }}</label>
                        <input id="prizeImage" type="file" class="form-control" @change="onFilePicked" />
                    </div>

                    <button type="submit" :class="{ disabled: isSubmitting }" class="btn btn-primary">
                        {{ $t('submit') }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
    const file = ref(null);

    defineProps({
        id: {
            type: String,
            default: undefined,
        },
        prizeName: {
            type: String,
            default: '',
        },
        prizeDescription: {
            type: String,
            default: '',
        },
        prizeQuantity: {
            type: Number,
            default: 1,
        },
        prizeType: {
            type: String,
            default: '',
        },
        prizeImage: {
            type: String,
            default: '',
        },
    });

    const schema = object({
        prizeName: string().min(1),
        prizeDescription: string().min(1),
        prizeQuantity: number().positive(),
        prizeType: union([literal('daily'), literal('weekly'), literal('monthly'), literal('grand')]),
    });

    const { handleSubmit, isSubmitting } = useForm({
        validationSchema: toTypedSchema(schema),
    });

    const onFilePicked = (e) => {
        file.value = e.target.files[0];
    };

    const onSubmit = handleSubmit(async (values) => {
        const formData = new FormData();
        formData.append('prizeImage', file.value);
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // const response = await $fetch('...', {
        //     method: 'POST',
        //     body: formData,
        // });

        await navigateTo('/prizes');
        useEvent('showToast', { title: 'Success', message: 'Prize created successfully' });
    });
</script>
