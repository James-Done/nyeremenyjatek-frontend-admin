<template>
    <div>
        <form @submit.prevent="onSubmit">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1>{{ $t('editAccountSettings') }}</h1>
                    </div>

                    <div class="col-12">
                        <div class="mb-3">
                            <TextInput
                                id="page_title"
                                :value="page_title"
                                :label="$t('pageTitle')"
                                :required="true"
                                name="page_title"
                            />
                        </div>

                        <div class="mb-3">
                            <TextInput
                                id="page_keywords"
                                :value="page_keywords"
                                :label="$t('pageKeywords')"
                                :required="false"
                                name="page_keywords"
                            />
                        </div>

                        <div class="mb-3">
                            <TextArea
                                id="page_description"
                                :value="page_description"
                                :label="$t('pageDescription')"
                                :required="false"
                                name="page_description"
                            />
                        </div>

                        <div class="mb-3">
                            <ColorInput
                                id="background_color"
                                :value="background_color"
                                :label="$t('backgroundColor')"
                                :required="true"
                                name="background_color"
                            />
                        </div>

                        <div class="mb-3">
                            <ColorInput
                                id="popup_background_color"
                                :value="popup_background_color"
                                :label="$t('popupBackgroundColor')"
                                :required="true"
                                name="popup_background_color"
                            />
                        </div>

                        <div class="mb-3">
                            <ColorInput
                                id="primary_button_background_color"
                                :value="primary_button_background_color"
                                :label="$t('primaryButtonBackgroundColor')"
                                :required="true"
                                name="primary_button_background_color"
                            />
                        </div>

                        <div class="mb-3">
                            <ColorInput
                                id="primary_button_text_color"
                                :value="primary_button_text_color"
                                :label="$t('primaryButtonTextColor')"
                                :required="true"
                                name="primary_button_text_color"
                            />
                        </div>

                        <div class="mb-3">
                            <ColorInput
                                id="secondary_button_background_color"
                                :value="secondary_button_background_color"
                                :label="$t('secondaryButtonBackgroundColor')"
                                :required="true"
                                name="secondary_button_background_color"
                            />
                        </div>

                        <div class="mb-3">
                            <ColorInput
                                id="secondary_text_background_color"
                                :value="secondary_text_background_color"
                                :label="$t('secondaryTextBackgroundColor')"
                                :required="true"
                                name="secondary_text_background_color"
                            />
                        </div>

                        <div class="mb-3">
                            <ColorInput
                                id="body_text_color"
                                :value="body_text_color"
                                :label="$t('bodyTextColor')"
                                :required="true"
                                name="body_text_color"
                            />
                        </div>

                        <div class="mb-3">
                            <ColorInput
                                id="heading_text_color"
                                :value="heading_text_color"
                                :label="$t('headingTextColor')"
                                :required="true"
                                name="heading_text_color"
                            />
                        </div>

                        <div class="mb-3">
                            <TextArea
                                id="analytics_tracking_code"
                                :value="analytics_tracking_code"
                                :label="$t('analyticsTrackingCode')"
                                :required="false"
                                name="analytics_tracking_code"
                            />
                        </div>

                        <div class="mb-3">
                            <button type="submit" :class="{ disabled: isSubmitting }" class="btn btn-primary">
                                {{ $t('submit') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
    defineProps({
        page_title: {
            type: String,
            default: '',
        },
        page_keywords: {
            type: String,
            default: '',
        },
        page_description: {
            type: String,
            default: '',
        },
        background_color: {
            type: String,
            default: '',
        },
        popup_background_color: {
            type: String,
            default: '',
        },
        primary_button_background_color: {
            type: String,
            default: '',
        },
        primary_button_text_color: {
            type: String,
            default: '',
        },
        secondary_button_background_color: {
            type: String,
            default: '',
        },
        secondary_text_background_color: {
            type: String,
            default: '',
        },
        body_text_color: {
            type: String,
            default: '',
        },
        heading_text_color: {
            type: String,
            default: '',
        },
        analytics_tracking_code: {
            type: String,
            default: '',
        },
    });

    const { t } = useI18n();

    const schema = object({
        page_title: string().min(1),
        page_keywords: string().optional(),
        page_description: string().optional(),
        background_color: string().min(1),
        popup_background_color: string().min(1),
        primary_button_background_color: string().min(1),
        primary_button_text_color: string().min(1),
        secondary_button_background_color: string().min(1),
        secondary_text_background_color: string().min(1),
        body_text_color: string().min(1),
        heading_text_color: string().min(1),
        analytics_tracking_code: string().optional(),
    });

    const { handleSubmit, isSubmitting } = useForm({
        validationSchema: toTypedSchema(schema),
    });

    const onSubmit = handleSubmit(async (values) => {
        console.log(values);
        // TODO: Implement API call to update account settings
        useEvent('showToast', { title: t('success'), message: t('accountSettingsUpdated') });
    });
</script>
