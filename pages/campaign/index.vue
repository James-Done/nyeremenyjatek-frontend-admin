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
                    <TableComponent :columns="columns" :rows="data">
                        <template #name="{ row }">
                            {{ row.campaign_name }}
                        </template>
                        <template #description="{ row }">
                            {{ row.campaign_description }}
                        </template>
                        <template #start="{ row }">
                            {{ row.campaign_start }}
                        </template>
                        <template #end="{ row }">
                            {{ row.campaign_end }}
                        </template>
                        <template #createdBy="{ row }">
                            {{ row.created_by }}
                        </template>
                        <template #createdAt="{ row }">
                            {{ row.created_at }}
                        </template>
                        <template #type="{ row }">
                            {{ row.drawing }}
                        </template>
                        <template v-if="features.campaigns.delete" #delete="{ row }">
                            <button class="btn btn-danger" @click="deleteCampaign(row.campaign_id)">
                                {{ $t('delete') }}
                            </button>
                        </template>
                        <template v-if="features.campaigns.edit" #edit="{ row }">
                            <NuxtLink :to="`/campaign/edit/${row.campaign_id}`" class="btn btn-primary">{{
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
    const runtimeConfig = useRuntimeConfig();
    const client = useSanctumClient();
    const features = useFeatureStore();

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

    if (!features.campaigns.delete) {
        columns.splice(
            columns.findIndex((column) => column.key === 'delete'),
            1,
        );
    }

    if (!features.campaigns.edit) {
        columns.splice(
            columns.findIndex((column) => column.key === 'edit'),
            1,
        );
    }

    const { data } = useAsyncData(async () => {
        const response = await client(`${runtimeConfig.public.adminUrl}campaigns`);
        return response;
    });

    // TODO: delete campaign
    const deleteCampaign = (id) => {
        console.log('delete campaign', id);
    };
</script>
