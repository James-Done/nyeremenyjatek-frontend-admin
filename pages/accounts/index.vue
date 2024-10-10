<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>{{ $t('accounts') }}</h1>
                <div class="pt-3 pb-3">
                    <NuxtLink to="/accounts/create" class="btn btn-primary"> {{ $t('addAccount') }} </NuxtLink>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <TableComponent :columns="columns" :rows="accounts">
                    <template #account_name="{ row }">
                        {{ row.account_name }}
                    </template>
                    <template #public_url="{ row }">
                        <a :href="row.public_url">{{ row.public_url }}</a>
                    </template>
                    <template #superadmin_name="{ row }">
                        {{ row.superadmin_name }}
                    </template>
                    <template #superadmin_email="{ row }">
                        {{ row.superadmin_email }}
                    </template>
                    <template #active_campaign="{ row }">
                        {{ row.active_campaign }}
                    </template>
                    <template #last_campaign_start="{ row }">
                        {{ row.last_campaign_start }}
                    </template>
                    <template #last_campaign_end="{ row }">
                        {{ row.last_campaign_end }}
                    </template>

                    <template #created_by="{ row }">
                        {{ row.created_by }}
                    </template>
                    <template #created_at="{ row }">
                        {{ row.created_at }}
                    </template>
                    <template #active="{ row }">
                        <span :class="{ 'text-success': row.active, 'text-danger': !row.active }">
                            {{ row.active ? $t('yes') : $t('no') }}
                        </span>
                    </template>

                    <template #deactivate="{ row }">
                        <button v-if="row.active" class="btn btn-danger w-100 d-block" @click="toggleAccount(row.id)">
                            {{ $t('deactivate') }}
                        </button>
                        <button v-else class="btn btn-success w-100 d-block" @click="toggleAccount(row.id)">
                            {{ $t('activate') }}
                        </button>
                    </template>

                    <template #Edit="{ row }">
                        <NuxtLink :to="`/accounts/edit/${row.id}`" class="btn btn-primary">{{ $t('edit') }}</NuxtLink>
                    </template>
                </TableComponent>
            </div>
        </div>
    </div>
</template>
<script setup>
    const { t } = useI18n();

    const columns = [
        { key: 'account_name', label: t('companyName') },
        { key: 'public_url', label: t('publicUrl') },
        { key: 'superadmin_name', label: t('superadminName') },
        { key: 'superadmin_email', label: t('superadminEmail') },
        { key: 'active_campaign', label: t('activeCampaign') },
        { key: 'last_campaign_start', label: t('lastCampaignStart') },
        { key: 'last_campaign_end', label: t('lastCampaignEnd') },
        { key: 'created_by', label: t('createdBy') },
        { key: 'created_at', label: t('createdAt') },
        { key: 'active', label: t('active') },
        { key: 'deactivate', label: t('deactivate') },
        { key: 'Edit', label: t('edit') },
    ];
    // TODO: fetch accounts from API
    const accounts = ref([
        {
            id: 1,
            account_name: 'Account 1',
            public_url: 'https://account1.com',
            superadmin_name: 'Superadmin 1',
            superadmin_email: 'asd@asd.asd',
            active_campaign: 'Campaign 1',
            last_campaign_start: '2021-01-01',
            last_campaign_end: '2021-01-31',
            created_by: 'Admin 1',
            created_at: '2021-01-01',
            active: true,
        },

        {
            id: 2,
            account_name: 'Account 2',
            public_url: 'https://account2.com',
            superadmin_name: 'Superadmin 2',
            superadmin_email: 'ksdfmks@sadas.asd',
            active_campaign: 'Campaign 2',
            last_campaign_start: '2021-02-01',
            last_campaign_end: '2021-02-28',
            created_by: 'Admin 2',
            created_at: '2021-02-01',
            active: false,
        },
        {
            id: 3,
            account_name: 'Account 3',
            public_url: 'https://account3.com',
            superadmin_name: 'Superadmin 3',
            superadmin_email: 'lsdflsd@asd.asd',
            active_campaign: 'Campaign 3',
            last_campaign_start: '2021-03-01',
            last_campaign_end: '2021-03-31',
            created_by: 'Admin 3',
            created_at: '2021-03-01',
            active: true,
        },
    ]);

    const toggleAccount = (id) => {
        const account = accounts.value.find((account) => account.id === id);
        account.active = !account.active;

        useEvent('showToast', {
            title: 'Success',
            message: account.active ? 'Account activated' : 'Account deactivated',
        });

        // TODO: deactivate account in the API and update the accounts list
    };
</script>
