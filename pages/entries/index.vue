<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>{{ $t('entries') }}</h1>
                <div class="pt-3 pb-3">
                    <button v-if="features.entries.export" class="btn btn-primary" @click.prevent="handleExport">
                        {{ $t('exportEntries') }}
                    </button>
                </div>
            </div>
        </div>

        <form v-if="features.entries.filter" @submit="onSubmit">
            <div class="row mb-2">
                <div class="col-md-3">
                    <SearchInput v-bind="searchInputs.firstName" />
                </div>
                <div class="col-md-3">
                    <SearchInput v-bind="searchInputs.lastName" />
                </div>
                <div class="col-md-3">
                    <SearchInput v-bind="searchInputs.email" />
                </div>
                <div class="col-md-3">
                    <SearchInput v-bind="searchInputs.phone" />
                </div>
            </div>

            <div class="row mb-4">
                <div class="col-md-3">
                    <Select v-bind="searchInputs.newsletter" />
                </div>
                <div class="col-md-3">
                    <SearchInput v-bind="searchInputs.campaignId" />
                </div>
                <div class="col-md-3">
                    <SearchInput v-bind="searchInputs.city" />
                </div>

                <div class="col-md-3 d-flex align-end justify-content-center">
                    <button
                        :class="{ disabled: isSubmitting || !filtersActive }"
                        class="btn btn-primary w-100 align-self-end"
                        type="submit"
                    >
                        {{ $t('search') }}
                    </button>
                </div>
            </div>
        </form>

        <div class="row mb-2">
            <div class="col-12">
                <div v-if="filtersActive" class="d-flex justify-content-end">
                    <button class="btn btn-danger" @click="resetForm">{{ $t('resetFilters') }}</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <TableComponent
                    :columns="columns"
                    :rows="data?.data"
                    :last-page="data?.last_page"
                    @refresh="
                        (page) => {
                            currentPage = page;
                            refresh();
                        }
                    "
                >
                    <template #lastname="{ row }">
                        {{ row.lastname }}
                    </template>

                    <template #firstname="{ row }">
                        {{ row.firstname }}
                    </template>

                    <template #email="{ row }">
                        {{ row.email }}
                    </template>

                    <template #phone="{ row }">
                        {{ row.phone }}
                    </template>

                    <template #birthDate="{ row }">
                        {{ row.birthDate }}
                    </template>

                    <template #newsletter="{ row }">
                        {{ row.newsletter }}
                    </template>

                    <template #campaign="{ row }">
                        {{ row.campaign }}
                    </template>

                    <template #city="{ row }">
                        {{ row.city }}
                    </template>

                    <template #apcode="{ row }">
                        {{ row.apcode }}
                    </template>

                    <template #purchaseDate="{ row }">
                        {{ row.purchaseDate }}
                    </template>

                    <template #purchaseAmount="{ row }">
                        {{ row.purchaseAmount }}
                    </template>
                </TableComponent>
            </div>
        </div>
    </div>
</template>

<script setup>
    const { t } = useI18n();
    const features = useFeatureStore();
    const runtimeConfig = useRuntimeConfig();
    const client = useSanctumClient();

    const currentPage = ref(1);

    let searchInputs = ref({
        firstName: {
            id: 'firstname',
            label: t('firstName'),
            value: '',
            name: 'firstname',
            required: false,
        },
        lastName: {
            id: 'lastname',
            label: t('lastName'),
            value: '',
            name: 'lastname',
            required: false,
        },
        email: {
            id: 'email',
            label: t('email'),
            value: '',
            name: 'email',
            required: false,
        },
        phone: {
            id: 'phone',
            label: t('phone'),
            value: '',
            name: 'phone',
            required: false,
        },
        newsletter: {
            id: 'newsletter',
            label: t('newsletter'),
            value: '',
            name: 'newsletter',
            options: [
                { value: '', label: t('all') },
                { value: '1', label: t('yes') },
                { value: '0', label: t('no') },
            ],
            required: false,
        },
        campaignId: {
            id: 'campaignId',
            label: t('campaign'),
            value: '',
            name: 'campaignId',
            required: false,
        },
        city: {
            id: 'city',
            label: t('city'),
            value: '',
            name: 'city',
            required: false,
        },
    });

    const columns = [
        { key: 'lastname', label: t('lastName') },
        { key: 'firstname', label: t('firstName') },
        { key: 'email', label: t('email') },
        { key: 'phone', label: t('phone') },
        { key: 'birthDate', label: t('birthDate') },
        { key: 'newsletter', label: t('newsletter') },
        { key: 'campaign', label: t('campaign') },
        { key: 'city', label: t('city') },
        { key: 'apcode', label: t('apcode') },
        { key: 'purchaseDate', label: t('purchaseDate') },
        { key: 'purchaseAmount', label: t('purchaseAmount') },
    ];

    const { data, refresh } = useAsyncData(async () => {
        const response = await client(`${runtimeConfig.public.adminUrl}entries?page=${currentPage.value}`);

        const entries = response.data.map((entry) => {
            return {
                lastname: entry.last_name,
                firstname: entry.first_name,
                email: entry.email,
                phone: entry.phone,
                birthDate: entry.birthday,
                newsletter: entry.newsletter,
                campaign: entry.campaign_id,
                city: entry.city_id,
                apcode: entry.AP_code,
                purchaseDate: entry.date_of_purchase,
                purchaseAmount: entry.amount_of_purchase,
            };
        });

        response.data = entries;
        return response;
    });

    const handleExport = async () => {
        try {
            const response = await client(`${runtimeConfig.public.adminUrl}export/entries_view`);
            const anchor = document.createElement('a');
            anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(response);
            anchor.target = '_blank';
            anchor.download = `entries-${new Date().toISOString()}.csv`;
            anchor.click();
        } catch (error) {
            console.error(error);
            useEvent('showToast', { title: t('error'), message: t('exportError') });
        }
    };

    const schema = object({
        firstname: string().optional(),
        lastname: string().optional(),
        email: string().optional(),
        phone: string().optional(),
        newsletter: string().optional(),
        campaignId: string().optional(),
        city: string().optional(),
    });

    const { handleSubmit, isSubmitting, values, resetForm } = useForm({
        validationSchema: toTypedSchema(schema),
    });

    const onSubmit = handleSubmit(async (values) => {
        if (!filtersActive.value) {
            return;
        }

        console.log(values);
    });

    const filtersActive = computed(() => {
        return Object.values(values).some((value) => typeof value !== 'undefined');
    });
</script>
