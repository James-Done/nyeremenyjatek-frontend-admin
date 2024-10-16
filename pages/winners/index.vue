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
                            <NuxtLink to="winners/create" class="btn btn-primary">{{ $t('drawWinner') }}</NuxtLink>
                        </div>
                    </div>
                </div>
            </div>

            <form v-if="features.winners.filter" @submit="onSubmit">
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

        <div class="container">
            <div class="row">
                <div class="col-12">
                    <TableComponent :columns="columns" :rows="data">
                        <template #lastname="{ row }">
                            {{ row.entry.last_name }}
                        </template>

                        <template #firstname="{ row }">
                            {{ row.entry.first_name }}
                        </template>

                        <template #email="{ row }">
                            {{ row.entry.email }}
                        </template>

                        <template #phone="{ row }">
                            {{ row.entry.phone }}
                        </template>

                        <template #prizeType="{ row }">
                            {{ row.prize_type }}
                        </template>

                        <template #prizeName="{ row }">
                            {{ row.prize.prize_name }}
                        </template>

                        <template #winningDay="{ row }">
                            {{ row.winning_day }}
                        </template>

                        <template #location="{ row }">
                            {{ row.location }}
                        </template>

                        <template #notificationSuccess="{ row }">
                            <NuxtLink
                                :to="`winners/edit/${row.entry_id}`"
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
    const features = useFeatureStore();
    const runtimeConfig = useRuntimeConfig();
    const client = useSanctumClient();

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
        { key: 'prizeType', label: t('prizetype') },
        { key: 'prizeName', label: t('prize') },
        { key: 'winningDay', label: t('winningDay') },
    ];

    const { data } = useAsyncData(async () => {
        try {
            const response = await client(`${runtimeConfig.public.adminUrl}winners`);
            return response;
        } catch (error) {
            console.error(error);
            useEvent('showToast', { title: t('error'), message: t('fetchError') });
        }
    });

    const handleExport = async () => {
        try {
            const response = await client(`${runtimeConfig.public.adminUrl}export/winners_view`);
            const anchor = document.createElement('a');
            anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(response);
            anchor.target = '_blank';
            anchor.download = `winners-${new Date().toISOString()}.csv`;
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
