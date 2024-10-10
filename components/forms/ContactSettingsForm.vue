<template>
    <div class="mt-4">
        <form @submit="onSubmit">
            <div class="row">
                <div class="col-12">
                    <h1>{{ $t('contactSettings') }}</h1>
                </div>
            </div>

            <div class="row">
                <div class="col-12 mb-3">
                    <TextInput id="email" label="E-mail" :value="contactSettings.email.value" name="email" />
                </div>

                <div class="col-12 mb-3">
                    <TextInput
                        id="phoneNumber"
                        label="Phone number"
                        :value="contactSettings.phoneNumber.value"
                        name="phoneNumber"
                    />
                </div>

                <div class="col-12 mb-3">
                    <TextInput
                        id="companyName"
                        label="Company name"
                        :value="contactSettings.companyName.value"
                        name="companyName"
                    />
                </div>

                <div class="col-12 mb-3">
                    <TextInput
                        id="taxNumber"
                        label="Tax number"
                        :value="contactSettings.taxNumber.value"
                        name="taxNumber"
                        :required="false"
                    />
                </div>

                <div class="col-12 mb-3">
                    <TextInput
                        id="companyRegistrationNumber"
                        label="Company registration number"
                        :value="contactSettings.companyRegistrationNumber.value"
                        name="companyRegistrationNumber"
                        :required="false"
                    />
                </div>

                <div class="col-12 mb-3">
                    <TextInput
                        id="companyAddress"
                        label="Company address"
                        :value="contactSettings.companyAddress.value"
                        name="companyAddress"
                        :required="false"
                    />
                </div>

                <div class="col-12 mb-3">
                    <button type="submit" :class="{ disabled: isSubmitting }" class="btn btn-primary">
                        {{ $t('save') }}
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
    const { t } = useI18n();
    // TODO: get contact settings from API
    const contactSettings = ref({
        email: {
            id: 1,
            value: '',
        },
        phoneNumber: {
            id: 2,
            value: '',
        },
        companyName: {
            id: 3,
            value: '',
        },
        taxNumber: {
            id: 4,
            value: '',
        },
        companyRegistrationNumber: {
            id: 5,
            value: '',
        },
        companyAddress: {
            id: 6,
            value: '',
        },
    });

    const schema = object({
        email: string().email().min(1),
        phoneNumber: string().min(1),
        companyName: string().min(1),
        taxNumber: string().optional(),
        companyRegistrationNumber: string().optional(),
        companyAddress: string().optional(),
    });

    const { handleSubmit, isSubmitting } = useForm({
        validationSchema: toTypedSchema(schema),
    });

    const onSubmit = handleSubmit(async (values) => {
        // TODO: save contact settings
        console.log(values);
        useEvent('showToast', {
            title: 'Success',
            message: t('socialLinksSaved'),
        });
    });
</script>
