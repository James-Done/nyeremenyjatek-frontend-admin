<template>
    <div class="pt-4">
        <form @submit.prevent="handleSubmit">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <input id="campaign_id" type="hidden" name="campaign_id" :value="campaignId" />
                        <label for="date" class="form-label">{{ $t('date') }}</label>
                        <VueDatePicker v-model="date" :disabled-dates="disabledDates" />
                        <button class="btn btn-primary mt-3" type="submit">{{ $t('submit') }}</button>
                    </div>
                </div>
            </div>
        </form>

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

        <div v-if="winners.length > 0" class="container">
            <div class="row">
                <div class="col-12">
                    <button class="btn btn-primary" @click="startNewDraw">{{ $t('newDraw') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';

    defineProps({
        campaignId: {
            type: Number,
            required: true,
        },
    });

    const { t } = useI18n();
    const date = ref(new Date());
    const winners = ref([]);
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

    // TODO: get disabled dates from API
    const disabledDates = [];

    const handleSubmit = () => {
        if (disabledDates.includes(date.value)) {
            return;
        }
        // TODO: fetch winners by campaign id from API
        disabledDates.push(date.value);

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
    };

    const startNewDraw = () => {
        winners.value = [];
        let nextDate = new Date(date.value);
        nextDate.setDate(nextDate.getDate() + 1);
        while (disabledDates.includes(nextDate)) {
            nextDate.setDate(nextDate.getDate() + 1);
        }

        date.value = nextDate;
    };
</script>
