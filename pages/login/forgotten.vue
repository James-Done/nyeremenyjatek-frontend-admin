<template>
    <div>
        <div class="container vh-100">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="col-12">
                    <div class="border p-4">
                        <h1>{{ $t('forgottenPass') }}</h1>
                        <form @submit="onSubmit">
                            <div class="mb-3">
                                <EmailInput id="email" name="email" :label="$t('email')" />
                            </div>
                            <button type="submit" :class="{ disabled: isSubmitting }" class="btn btn-primary">
                                {{ $t('submit') }}
                            </button>
                        </form>

                        <div class="mt-3">
                            <NuxtLink to="/login/">{{ $t('login') }}</NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    definePageMeta({
        layout: 'unauthenticated',
        sanctum: {
            excluded: true,
        },
    });

    const { t } = useI18n();

    const schema = object({
        email: string().email().min(1),
    });

    const { handleSubmit, isSubmitting, resetForm, setErrors } = useForm({
        validationSchema: toTypedSchema(schema),
    });

    const onSubmit = handleSubmit(async (values) => {
        try {
            await $fetch('/web/v1/public/password/remind', {
                method: 'POST',
                body: { data: JSON.stringify(values) },
            });

            useEvent('showToast', {
                title: 'Success',
                message: 'Password reset link sent to your email',
            });

            resetForm();
        } catch (error) {
            console.error(error);
            setErrors({ email: t('loginError') });
        }
    });
</script>
