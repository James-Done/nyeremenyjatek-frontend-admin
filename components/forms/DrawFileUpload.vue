<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <form class="pt-4" @submit.prevent="handleUpload">
                        <div class="mb-3">
                            <input id="campaign_id" type="hidden" name="campaign_id" :value="campaignId" />

                            <label for="csv-upload" class="form-label">{{ $t('csvUpload') }}</label>
                            <input
                                id="csv-upload"
                                ref="inputFile"
                                accept=".csv"
                                type="file"
                                class="form-control"
                                @change="onFilePicked"
                            />
                        </div>
                        <button class="btn btn-primary" type="submit">Upload</button>
                    </form>
                </div>
            </div>
        </div>

        <div class="container-fluid mt-3">
            <div class="row">
                <div class="col-12">
                    <TableComponent v-if="winners.length > 0" :columns="columns" :rows="winners">
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
                    </TableComponent>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        campaignId: {
            type: Number,
            required: true,
        },
    });

    const { t } = useI18n();
    const winners = ref([]);
    const file = ref(null);
    const inputFile = useTemplateRef('inputFile');
    const columns = ref([
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
    ]);

    const onFilePicked = (e) => {
        winners.value = [];
        file.value = e.target.files[0];
    };

    const handleUpload = () => {
        if (!file.value) {
            return;
        }
        // TODO: Get winners by campaign id from API
        winners.value = [
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
            },
        ];

        file.value = null;
        inputFile.value.value = '';
    };
</script>
