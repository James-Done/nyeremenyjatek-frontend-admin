<template>
    <div>
        <div class="container vh-100">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="col-12">
                    <div class="border p-4">
                        <h1>{{ $t('login') }}</h1>
                        <form @submit="onSubmit">
                            <div class="mb-3">
                                <EmailInput id="email" name="email" :label="$t('email')" />
                            </div>
                            <div class="mb-3">
                                <PasswordInput id="password" name="password" :label="$t('password')" />
                            </div>
                            <button type="submit" :class="{ disabled: isSubmitting }" class="btn btn-primary">
                                {{ $t('login') }}
                            </button>
                        </form>

                        <div class="mt-3">
                            <NuxtLink to="/login/forgotten">{{ $t('forgottenPass') }}</NuxtLink>
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
        email: string().email().min(1),
        password: string().min(1),
    });

    const { handleSubmit, isSubmitting } = useForm({
        validationSchema: toTypedSchema(schema),
    });

    const onSubmit = handleSubmit(async (values) => {
        console.log(values);

        await navigateTo('/');
    });
</script>
