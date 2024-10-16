<template>
    <div class="mt-4">
        <form @submit="onSubmit">
            <div class="row">
                <div class="col-12 mb-4">
                    <h1>{{ $t('socialLinks') }}</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <ul class="list-group">
                        <li v-for="link of socialLinksForm" :key="link.id" class="list-group-item">
                            <div class="d-flex gap-3 align-items-end justify-content-between">
                                <div class="flex-grow-1">
                                    <TextInput v-bind="link" />
                                </div>

                                <button class="btn btn-danger" @click.prevent="removeLink(link.id)">Remove</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-12 text-end">
                    <button class="btn btn-primary mb-2" @click.prevent="addLink">Add Link</button>
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" :class="{ disabled: isSubmitting }" type="submit">
                        {{ $t('save') }}
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
    const { t } = useI18n();
    // TODO: get social links from API
    const socialLinks = ref([
        {
            id: 1,
            url: 'https://www.facebook.com',
        },
        {
            id: 2,
            url: 'https://www.twitter.com',
        },
        {
            id: 3,
            url: 'https://www.instagram.com',
        },
    ]);

    const socialLinksForm = computed(() => {
        return socialLinks.value.map((socialLink) => {
            return {
                id: 'socialLink-' + socialLink.id.toString(),
                label: 'URL',
                value: socialLink.url,
                name: 'socialLink-' + socialLink.id.toString(),
                required: true,
            };
        });
    });

    const addLink = () => {
        socialLinks.value.push({
            id: 'socialLink-' + socialLinks.value.length + 1,
            name: 'socialLink',
            url: '',
        });

        schema.value = getSchema();
    };

    const removeLink = (id) => {
        id = parseInt(id.replace('socialLink-', ''));
        socialLinks.value = socialLinks.value.filter((socialLink) => socialLink.id !== id);
        schema.value = getSchema();
    };

    const getSchema = () => {
        return object(
            socialLinks.value.reduce((acc, socialLink) => {
                acc['socialLink-' + socialLink.id.toString()] = string().url();
                return acc;
            }, {}),
        );
    };

    const schema = ref(getSchema());
    const typedSchema = computed(() => toTypedSchema(schema.value));

    const { handleSubmit, isSubmitting } = useForm({
        validationSchema: typedSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        // TODO: save social links
        console.log(values);
        useEvent('showToast', {
            title: 'Success',
            message: t('socialLinksSaved'),
        });
    });
</script>
