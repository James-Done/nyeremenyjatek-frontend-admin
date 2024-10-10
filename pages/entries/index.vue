<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>{{ $t('entries') }}</h1>
                <div class="pt-3 pb-3">
                    <button class="btn btn-primary" @click.prevent="handleExport">{{ $t('exportEntries') }}</button>
                </div>
            </div>
        </div>

        <form @submit="onSubmit">
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
                    <button class="btn btn-danger" @click="resetFilters">{{ $t('resetFilters') }}</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <TableComponent :columns="columns" :rows="entries">
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

    // TODO: fetch entries from API
    const entries = ref([
        {
            id: 1,
            lastname: 'Doe',
            firstname: 'John',
            email: 'jshon@doe.com',
            phone: '1234567890',
            birthDate: '01/01/2000',
            newsletter: 'Yes',
            campaign: 'Campaign 1',
            city: 'City 1',
            apcode: 'APCODE 1',
            purchaseDate: '01/01/2021',
            purchaseAmount: '100',
        },
        {
            id: 2,
            lastname: 'Doe',
            firstname: 'Jane',
            email: 'jane@doe.com',
            phone: '1234567890',
            birthDate: '01/01/2000',
            newsletter: 'Yes',
            campaign: 'Campaign 2',
            city: 'City 2',
            apcode: 'APCODE 2',
            purchaseDate: '01/01/2021',
            purchaseAmount: '100',
        },
    ]);

    const handleExport = () => {
        // TODO:implement export functionality
        console.log('Exporting entries');
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

    const { handleSubmit, isSubmitting, values } = useForm({
        validationSchema: toTypedSchema(schema),
    });

    const onSubmit = handleSubmit(async (values) => {
        if (!filtersActive.value) {
            return;
        }

        console.log(values);
        // TODO: fetch entries from API refresh entries
    });

    const filtersActive = computed(() => {
        return Object.values(values).some((value) => typeof value !== 'undefined');
    });

    const resetFilters = () => {
        //
    };
</script>
