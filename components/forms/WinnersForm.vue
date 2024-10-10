<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>{{ $t('drawWinner') }}</h1>
                </div>
                <div class="col-12">
                    <label for="campaign" class="form-label">{{ $t('campaign') }}</label>
                    <select id="campaign" v-model="campaignId" class="form-select">
                        <option v-for="campaign in campaigns" :key="campaign.id" :value="campaign.id">
                            {{ campaign.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div v-if="drawType === 'file'">
            <LazyDrawFileUpload :campaign-id="campaignId" />
        </div>

        <div v-else-if="drawType === 'manual'">
            <LazyManualDraw :campaign-id="campaignId" />
        </div>
        <div v-else-if="drawType === 'auto'">
            <!-- <AutoDraw /> -->
        </div>
    </div>
</template>

<script setup>
    const campaignId = ref('');

    // TODO: get campaign list from API
    const campaigns = ref([
        {
            id: 1,
            name: 'Campaign 1',
            startDate: '2021-01-01',
            endDate: '2021-12-31',
            status: 'Active',
            prizeType: 'Cash',
            prize: '1000',
            drawType: 'file',
            drawTime: '2021-12-31 12:00:00',
            drawnBy: 'Admin',
        },
        {
            id: 2,
            name: 'Campaign 2',
            startDate: '2021-01-01',
            endDate: '2021-12-31',
            status: 'Active',
            prizeType: 'Cash',
            prize: '1000',
            drawType: 'manual',
            drawTime: '2021-12-31 12:00:00',
            drawnBy: 'Admin',
        },
        {
            id: 3,
            name: 'Campaign 3',
            startDate: '2021-01-01',
            endDate: '2021-12-31',
            status: 'Active',
            prizeType: 'Cash',
            prize: '1000',
            drawType: 'auto',
            drawTime: '2021-12-31 12:00:00',
            drawnBy: 'Admin',
        },
    ]);

    const drawType = computed(() => {
        const campaign = campaigns.value.find((campaign) => campaign.id === campaignId.value);
        return campaign ? campaign.drawType : '';
    });
</script>
