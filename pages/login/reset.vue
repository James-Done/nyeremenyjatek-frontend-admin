<template>
    <div>
        <div class="container vh-100">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="col-12">
                    <div class="border p-4">
                        <h1>{{ $t('resetPass') }}</h1>
                        <form @submit="onSubmit">
                            <div class="mb-3">
                                <PasswordInput id="password" name="password" :label="$t('password')" />
                            </div>
                            <button type="submit" :class="{ disabled: isSubmitting }" class="btn btn-primary">
                                {{ $t('resetPass') }}
                            </button>
                        </form>

                        <div class="mt-3">
                            <NuxtLink to="/login">{{ $t('login') }}</NuxtLink>
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
    });

    const schema = object({
        password: string().min(8),
    });

    const { handleSubmit, isSubmitting, resetForm } = useForm({
        validationSchema: toTypedSchema(schema),
    });

    const onSubmit = handleSubmit(async (values) => {
        // TODO: aPI call to send password reset link
        console.log(values);
        resetForm();

        useEvent('showToast', {
            title: 'Success',
            message: 'Password reset link sent to your email',
        });
    });
</script>
