<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>{{ $t('winners') }}</h1>
                    <div class="pt-3 pb-3">
                        <div class="d-flex gap-4">
                            <button class="btn btn-primary" @click.prevent="handleExport">
                                {{ $t('exportWinners') }}
                            </button>
                            <NuxtLink to="winners/create" class="btn btn-primary" @click.prevent="handleExport">{{
                                $t('drawWinner')
                            }}</NuxtLink>
                        </div>
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
                        <SearchInput v-bind="searchInputs.city" />
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-md-3">
                        <Select v-bind="searchInputs.prizeType" />
                    </div>
                    <div class="col-md-3">
                        <SearchInput v-bind="searchInputs.prize" />
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
        </div>

        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <TableComponent :columns="columns" :rows="winners">
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

                        <template #location="{ row }">
                            {{ row.location }}
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

                        <template #privacyPolicy="{ row }">
                            {{ row.privacyPolicy }}
                        </template>

                        <template #newsletter="{ row }">
                            {{ row.newsletter }}
                        </template>

                        <template #prizeType="{ row }">
                            {{ row.prizeType }}
                        </template>

                        <template #prize="{ row }">
                            {{ row.prize }}
                        </template>

                        <template #drawType="{ row }">
                            {{ row.drawType }}
                        </template>

                        <template #status="{ row }">
                            {{ row.status }}
                        </template>

                        <template #drawTime="{ row }">
                            {{ row.drawTime }}
                        </template>

                        <template #drawnBy="{ row }">
                            {{ row.drawnBy }}
                        </template>

                        <template #notificationSuccess="{ row }">
                            <NuxtLink
                                :to="`winners/edit/${row.id}`"
                                class="btn"
                                :class="{
                                    'btn-success': row.notificationSuccess === '1',
                                    'btn-danger': row.notificationSuccess === '0',
                                    'btn-primary': row.notificationSuccess === '',
                                }"
                            >
                                {{ $t('edit') }}
                            </NuxtLink>
                        </template>
                    </TableComponent>
                </div>
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
        city: {
            id: 'city',
            label: t('city'),
            value: '',
            name: 'city',
            required: false,
        },
        prizeType: {
            id: 'prizetype',
            label: t('prizeType'),
            value: '',
            name: 'prizetype',
            options: [
                { value: '', label: t('all') },
                { value: 'daily', label: t('daily') },
                { value: 'weekly', label: t('weekly') },
                { value: 'monthly', label: t('monthly') },
                { value: 'grand', label: t('grand') },
            ],
            required: false,
        },
        prize: {
            id: 'prize',
            label: t('prize'),
            value: '',
            name: 'prize',
            required: false,
        },
    });

    const columns = [
        { key: 'lastname', label: t('lastName') },
        { key: 'firstname', label: t('firstName') },
        { key: 'email', label: t('email') },
        { key: 'phone', label: t('phone') },
        { key: 'birthDate', label: t('birthDate') },
        { key: 'location', label: t('location') },
        { key: 'apcode', label: t('apcode') },
        { key: 'purchaseDate', label: t('purchaseDate') },
        { key: 'purchaseAmount', label: t('purchaseAmount') },
        { key: 'privacyPolicy', label: t('privacyPolicy') },
        { key: 'newsletter', label: t('newsletter') },
        { key: 'prizeType', label: t('prizetype') },
        { key: 'prize', label: t('prize') },
        { key: 'drawType', label: t('drawType') },
        { key: 'status', label: t('status') },
        { key: 'drawTime', label: t('drawTime') },
        { key: 'drawnBy', label: t('drawnBy') },
        { key: 'notificationSuccess', label: t('success') },
    ];

    // TODO: fetch winners from API
    const winners = ref([
        {
            id: 1,
            lastname: 'Doe',
            firstname: 'John',
            email: 'jshon@doe.com',
            phone: '1234567890',
            birthDate: '01/01/2000',
            location: 'New York',
            apcode: '123456',
            purchaseDate: '01/01/2021',
            purchaseAmount: '100',
            privacyPolicy: '1',
            newsletter: '1',
            prizeType: '1',
            prize: '1',
            drawType: '1',
            status: '1',
            drawTime: '01/01/2021',
            drawnBy: 'John Doe',
            notificationSuccess: '1',
        },
        {
            id: 2,
            lastname: 'Doe',
            firstname: 'Jane',
            email: 'asdas@asd.asd',
            phone: '1234567890',
            birthDate: '01/01/2000',
            location: 'New York',
            apcode: '123456',
            purchaseDate: '01/01/2021',
            purchaseAmount: '100',
            privacyPolicy: '1',
            newsletter: '1',
            prizeType: '1',
            prize: '1',
            drawType: '1',
            status: '1',
            drawTime: '01/01/2021',
            drawnBy: 'John Doe',
            notificationSuccess: '0',
        },
    ]);

    const handleExport = () => {
        // TODO:implement export functionality
        console.log('Exporting winners');
    };

    const schema = object({
        firstname: string().optional(),
        lastname: string().optional(),
        email: string().optional(),
        city: string().optional(),
        prizetype: union([literal('daily'), literal('weekly'), literal('monthly'), literal('grand')]).optional(),
        prize: string().optional(),
    });

    const { handleSubmit, isSubmitting, values } = useForm({
        validationSchema: toTypedSchema(schema),
    });

    const onSubmit = handleSubmit(async (values) => {
        if (!filtersActive.value) {
            return;
        }
        // TODO: fetch winners from API refresh winners
        console.log(values);
    });

    const filtersActive = computed(() => {
        return Object.values(values).some((value) => typeof value !== 'undefined');
    });

    const resetFilters = () => {
        // TODO: reset filters reload winners
    };
</script>
