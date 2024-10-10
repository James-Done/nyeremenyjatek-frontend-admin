<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>{{ $t('campaigns') }}</h1>

                    <div class="pt-3 pb-3">
                        <NuxtLink to="/campaign/create" class="btn btn-primary">{{ $t('addCampaign') }}</NuxtLink>
                    </div>
                </div>

                <div class="col-12">
                    <TableComponent :columns="columns" :rows="campaigns">
                        <template #name="{ row }">
                            {{ row.name }}
                        </template>
                        <template #description="{ row }">
                            {{ row.description }}
                        </template>
                        <template #start="{ row }">
                            {{ row.start }}
                        </template>
                        <template #end="{ row }">
                            {{ row.end }}
                        </template>
                        <template #createdBy="{ row }">
                            {{ row.createdBy }}
                        </template>
                        <template #createdAt="{ row }">
                            {{ row.createdAt }}
                        </template>
                        <template #type="{ row }">
                            {{ row.type }}
                        </template>
                        <template #delete="{ row }">
                            <button class="btn btn-danger" @click="deleteCampaign(row.id)">{{ $t('delete') }}</button>
                        </template>
                        <template #edit="{ row }">
                            <NuxtLink :to="`/campaign/edit/${row.id}`" class="btn btn-primary">{{
                                $t('edit')
                            }}</NuxtLink>
                        </template>
                    </TableComponent>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const { t } = useI18n();
    const columns = [
        { key: 'name', label: t('name') },
        { key: 'description', label: t('description') },
        { key: 'start', label: t('campaignStartDate') },
        { key: 'end', label: t('campaignEndDate') },
        { key: 'createdBy', label: t('createdBy') },
        { key: 'createdAt', label: t('createdAt') },
        { key: 'type', label: t('campaignDrawType') },
        { key: 'edit', label: t('edit') },
        { key: 'delete', label: t('delete') },
    ];

    const campaigns = [
        {
            id: 1,
            name: 'Első kampány',
            description: 'Ez az első kampány',
            start: '2021-10-01',
            end: '2021-10-31',
            createdBy: 'Admin',
            createdAt: '2021-09-01',
            type: 'Sorsolás',
        },
        {
            id: 2,
            name: 'Második kampány',
            description: 'Ez a második kampány',
            start: '2021-11-01',
            end: '2021-11-30',
            createdBy: 'Admin',
            createdAt: '2021-09-01',
            type: 'Sorsolás',
        },
        {
            id: 3,
            name: 'Harmadik kampány',
            description: 'Ez a harmadik kampány',
            start: '2021-12-01',
            end: '2021-12-31',
            createdBy: 'Admin',
            createdAt: '2021-09-01',
            type: 'Sorsolás',
        },
    ];

    // TODO: fetch campaigns from the API
    // TODO: delete campaign
    const deleteCampaign = (id) => {
        campaigns.value = campaigns.value.filter((campaign) => campaign.id !== id);
    };
</script>
