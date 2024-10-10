<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6">
                <form @submit.prevent="onSubmit">
                    <div class="mb-3">
                        <TextInput id="username" :label="$t('userName')" :required="true" name="username" />
                    </div>

                    <div class="mb-3">
                        <EmailInput id="email" :label="$t('email')" :required="true" name="email" />
                    </div>

                    <button type="submit" :class="{ disabled: isSubmitting }" class="btn btn-primary">
                        {{ $t('submit') }}
                    </button>
                </form>
            </div>
        </div>

        <Toast :show="createSuccess === false" title="Error" message="Error creating user" />
    </div>
</template>

<script setup>
    const config = useRuntimeConfig();

    let createSuccess = ref(null);

    const schema = object({
        email: string().email(),
        username: string().min(1),
    });

    const { handleSubmit, isSubmitting } = useForm({
        validationSchema: toTypedSchema(schema),
    });

    const onSubmit = handleSubmit(async (values) => {
        $fetch(`${config.public.apiBase}users/add`, {
            method: 'POST',
            body: JSON.stringify(values),
        })
            .then(async (res) => {
                if (!res.id) {
                    createSuccess.value = false;
                    return;
                }

                createSuccess.value = true;

                await navigateTo('/users');

                useEvent('showToast', { title: 'Success', message: 'User created successfully' });
            })
            .catch(() => {
                createSuccess.value = false;
            });
    });

    watch(createSuccess, (value) => {
        if (value === null) {
            return;
        }

        setTimeout(() => {
            createSuccess.value = null;
        }, 1000);
    });
</script>
