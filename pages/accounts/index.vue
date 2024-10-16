<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>{{ $t('accounts') }}</h1>
                <div v-if="features.account.add" class="pt-3 pb-3">
                    <NuxtLink to="/accounts/create" class="btn btn-primary"> {{ $t('addAccount') }} </NuxtLink>
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
                    <template #account_name="{ row }">
                        {{ row.account_name }}
                    </template>

                    <template #public_url="{ row }">
                        <a :href="row.public_url">{{ row.public_url }}</a>
                    </template>

                    <template #active="{ row }">
                        <span :class="{ 'text-success': row.active, 'text-danger': !row.active }">
                            {{ row.active ? $t('yes') : $t('no') }}
                        </span>
                    </template>

                    <template v-if="features.account.deactivate" #deactivate="{ row }">
                        <button v-if="row.active" class="btn btn-danger w-100 d-block" @click="toggleAccount(row.id)">
                            {{ $t('deactivate') }}
                        </button>
                        <button v-else class="btn btn-success w-100 d-block" @click="toggleAccount(row.id)">
                            {{ $t('activate') }}
                        </button>
                    </template>

                    <template v-if="features.account.edit" #Edit="{ row }">
                        <NuxtLink :to="`/accounts/edit/${row.id}`" class="btn btn-primary">{{ $t('edit') }}</NuxtLink>
                    </template>
                </TableComponent>
            </div>
        </div>
    </div>
</template>
<script setup>
    definePageMeta({
        middleware: 'user-role',
    });

    const { t } = useI18n();
    const client = useSanctumClient();
    const runtimeConfig = useRuntimeConfig();
    const features = useFeatureStore();
    const currentPage = ref(1);

    const columns = [
        { key: 'account_name', label: t('companyName') },
        { key: 'public_url', label: t('publicUrl') },
        { key: 'active', label: t('active') },
        { key: 'edit', label: t('edit') },
        { key: 'deactivate', label: t('deactivate') },
    ];

    if (!features.account.edit) {
        columns.splice(
            columns.findIndex((column) => column.key === 'edit'),
            1,
        );
    }

    if (!features.account.deactivate) {
        columns.splice(
            columns.findIndex((column) => column.key === 'deactivate'),
            1,
        );
    }

    const { data, refresh } = useAsyncData(async () => {
        return await client(`${runtimeConfig.public.adminUrl}accounts?page=${currentPage.value}`);
    });

    const toggleAccount = (id) => {
        // TODO: deactivate account in the API and update the accounts list
        console.log('toggle account', id);
    };
</script>
