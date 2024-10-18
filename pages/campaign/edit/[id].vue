<template>
    <div>
        <CampaignForm
            :id="data?.campaign_id"
            :campaign-name="data?.campaign_name"
            :campaign-description="data?.campaign_description"
            :entry-start="data?.entry_start"
            :entry-end="data?.entry_end"
            :campaign-start="data?.campaign_start"
            :campaign-end="data?.campaign_end"
            :draw-type="data?.drawing"
        />
    </div>
</template>

<script setup>
    const route = useRoute();
    const client = useSanctumClient();
    const config = useRuntimeConfig();
    const url = useRequestURL();
    const { id } = route.params;

    const { data } = useAsyncData('campaingDetails', async () => {
        try {
            const response = await client(`${config.public.adminUrl}campaigns/${id}`, {
                headers: {
                    referer: url.href,
                },
            });
            return response;
        } catch (e) {
            console.log(e);
        }
    });
</script>
