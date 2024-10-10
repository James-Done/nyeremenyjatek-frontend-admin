<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1 v-if="typeof id === 'undefined'">{{ $t('addCampaign') }}</h1>
                    <h1 v-else>{{ $t('editCampaign') }}</h1>
                </div>
            </div>

            <div class="row">
                <form @submit="onSubmit">
                    <input v-if="id" type="hidden" :value="id" />

                    <div class="mb-3">
                        <TextInput
                            id="campaign-name"
                            :value="campaignName"
                            :label="$t('campaignName')"
                            :required="true"
                            name="campaignName"
                        />
                    </div>
                    <div class="mb-3">
                        <TextArea
                            id="campaign-description"
                            :value="campaignDescription"
                            name="campaignDescription"
                            :label="$t('campaignDescription')"
                            :required="true"
                        />
                    </div>

                    <div class="mb-3">
                        <DatePicker
                            id="campaign-start"
                            :value="campaignStart"
                            name="campaignStart"
                            :label="$t('campaignStartDate')"
                            :required="true"
                        />
                    </div>

                    <div class="mb-3">
                        <DatePicker
                            id="campaign-end"
                            :value="campaignEnd"
                            name="campaignEnd"
                            :label="$t('campaignEndDate')"
                            :required="true"
                        />
                    </div>

                    <div class="mb-3">
                        <Select
                            id="draw-type"
                            name="drawType"
                            :label="$t('campaignDrawType')"
                            :value="drawType"
                            :options="[
                                { value: 'auto', label: $t('auto') },
                                { value: 'human', label: $t('human') },
                                { value: 'external', label: $t('external') },
                            ]"
                        />
                    </div>

                    <div class="mb-3">
                        <Checkbox
                            id="daily-prizes-active"
                            name="showDailySettings"
                            :label="$t('dailyPrizes')"
                            value="on"
                            :model-value="dailyPrizesActive"
                            :checked="showDailySettings"
                            @change="
                                (event) => {
                                    dailyPrizesActive = event.target.checked;
                                }
                            "
                        />

                        <Checkbox
                            id="weekly-prizes-active"
                            name="showWeeklySettings"
                            :label="$t('weeklyPrizes')"
                            value="on"
                            :model-value="weeklyPrizesActive"
                            :checked="showWeeklySettings"
                            @change="
                                (event) => {
                                    weeklyPrizesActive = event.target.checked;
                                }
                            "
                        />

                        <Checkbox
                            id="monthly-prizes-active"
                            name="showMonthlySettings"
                            :label="$t('monthlyPrizes')"
                            value="on"
                            :model-value="monthlyPrizesActive"
                            :checked="showMonthlySettings"
                            @change="
                                (event) => {
                                    monthlyPrizesActive = event.target.checked;
                                }
                            "
                        />

                        <Checkbox
                            id="main-prize-active"
                            name="showMainPrizeSettings"
                            :label="$t('mainPrize')"
                            value="on"
                            :model-value="mainPrizeActive"
                            :checked="showMainPrizeSettings"
                            @change="
                                (event) => {
                                    mainPrizeActive = event.target.checked;
                                }
                            "
                        />
                    </div>

                    <div v-if="dailyPrizesActive" class="mb-3">
                        <h2 class="mb-3">{{ $t('dailyPrizes') }}</h2>

                        <div v-for="prize in apiPrizes.dailyPrizes" :key="prize.id">
                            <div class="row">
                                <div class="col-6">
                                    <Checkbox
                                        :id="'daily-prize-' + prize.id"
                                        :name="prize.name"
                                        :label="prize.name"
                                        value="on"
                                        :checked="
                                            apiPrizes.dailyPrizes[prize.name]
                                                ? apiPrizes.dailyPrizes[prize.name].checked
                                                : false
                                        "
                                    />
                                </div>

                                <div class="col-6">
                                    <NumberInput
                                        :id="'daily-prize-number-' + prize.id"
                                        :name="'daily-' + prize.name + '-number'"
                                        :label="$t('numberOfPrizes')"
                                        :value="
                                            apiPrizes.dailyPrizes[prize.name]
                                                ? apiPrizes.dailyPrizes[prize.name].number
                                                : 0
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="weeklyPrizesActive" class="mb-3">
                        <h2 class="mb-3">{{ $t('weeklyPrizes') }}</h2>

                        <div v-for="prize in apiPrizes.weeklyPrizes" :key="prize.id">
                            <div class="row">
                                <div class="col-6">
                                    <Checkbox
                                        :id="'weekly-prize-' + prize.id"
                                        :name="prize.name"
                                        :label="prize.name"
                                        :checked="
                                            apiPrizes.weeklyPrizes[prize.name]
                                                ? apiPrizes.weeklyPrizes[prize.name].checked
                                                : false
                                        "
                                    />
                                </div>

                                <div class="col-6">
                                    <NumberInput
                                        :id="'weekly-prize-number-' + prize.id"
                                        :name="'weekly-' + prize.name + '-number'"
                                        :label="$t('numberOfPrizes')"
                                        :value="
                                            apiPrizes.weeklyPrizes[prize.name]
                                                ? apiPrizes.weeklyPrizes[prize.name].number
                                                : 0
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="monthlyPrizesActive" class="mb-3">
                        <h2 class="mb-3">{{ $t('monthlyPrizes') }}</h2>

                        <div v-for="prize in apiPrizes.monthlyPrizes" :key="prize.id">
                            <div class="row">
                                <div class="col-6">
                                    <Checkbox
                                        :id="'monthly-prize-' + prize.id"
                                        :name="prize.name"
                                        :label="prize.name"
                                        :checked="
                                            apiPrizes.monthlyPrizes[prize.name]
                                                ? apiPrizes.monthlyPrizes[prize.name].checked
                                                : false
                                        "
                                    />
                                </div>

                                <div class="col-6">
                                    <NumberInput
                                        :id="'monthly-prize-number-' + prize.id"
                                        :name="'monthly-' + prize.name + '-number'"
                                        :label="$t('numberOfPrizes')"
                                        :value="
                                            apiPrizes.monthlyPrizes[prize.name]
                                                ? apiPrizes.monthlyPrizes[prize.name].number
                                                : 0
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="mainPrizeActive" class="mb-3">
                        <h2 class="mb-3">{{ $t('mainPrize') }}</h2>

                        <div v-for="prize in apiPrizes.mainPrize" :key="prize.id">
                            <div class="row">
                                <div class="col-6">
                                    <Checkbox
                                        :id="'main-prize-' + prize.name"
                                        :name="prize.name"
                                        :label="prize.name"
                                        :checked="
                                            apiPrizes.mainPrize[prize.name]
                                                ? apiPrizes.mainPrize[prize.name].checked
                                                : false
                                        "
                                    />
                                </div>

                                <div class="col-6">
                                    <NumberInput
                                        :id="'main-prize-number-' + prize.name"
                                        :name="'main-' + prize.name + '-number'"
                                        :label="$t('numberOfPrizes')"
                                        :value="
                                            apiPrizes.mainPrize[prize.name] ? apiPrizes.mainPrize[prize.name].number : 0
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary">{{ $t('submit') }}</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
    const dailyPrizesActive = ref(false);
    const monthlyPrizesActive = ref(false);
    const weeklyPrizesActive = ref(false);
    const mainPrizeActive = ref(false);

    const props = defineProps({
        id: {
            type: String,
            default: undefined,
        },
        campaignName: {
            type: String,
            default: '',
        },
        campaignDescription: {
            type: String,
            default: '',
        },
        campaignStart: {
            type: String,
            default: '',
        },
        campaignEnd: {
            type: String,
            default: '',
        },
        drawType: {
            type: String,
            default: '',
        },
        showDailySettings: {
            type: Boolean,
            default: false,
        },
        showWeeklySettings: {
            type: Boolean,
            default: false,
        },
        showMonthlySettings: {
            type: Boolean,
            default: false,
        },
        showMainPrizeSettings: {
            type: Boolean,
            default: false,
        },
    });

    // TODO: Get Prize checkboxes
    const apiPrizes = {
        dailyPrizes: [
            {
                id: 1,
                name: 'Daily prize1',
                value: 'dayly-prize1',
                number: 0,
                checked: false,
            },
            {
                id: 2,
                name: 'Daily prize2',
                value: 'daily-prize2',
                number: 0,
            },
        ],

        weeklyPrizes: [
            {
                id: 1,
                name: 'Weekly prize1',
                value: 'weekly-prize1',
                number: 0,
            },
            {
                id: 2,
                name: 'Weekly prize2',
                value: 'weekly-prize2',
                number: 0,
            },
        ],

        monthlyPrizes: [
            {
                id: 1,
                name: 'Monthly prize1',
                value: 'monthly-prize1',
            },
            {
                id: 2,
                name: 'Monthly prize2',
                value: 'monthly-prize2',
            },
        ],

        mainPrize: [
            {
                name: 'Main prize1',
                value: 'main-prize1',
                number: 0,
            },
            {
                name: 'Main prize2',
                value: 'main-prize2',
                number: 0,
            },
        ],
    };

    const schema = object({
        campaignName: string().min(1),
        campaignDescription: string().min(1),
        campaignStart: string().min(1),
        campaignEnd: string().min(1),
        drawType: union([literal('auto'), literal('human'), literal('external')]),
        showDailySettings: string().optional(),
        // TODO: Add prizes schema
    });

    const { handleSubmit } = useForm({
        validationSchema: toTypedSchema(schema),
    });

    const onSubmit = handleSubmit(async (values) => {
        console.log(values);
        // useEvent('showToast', { title: 'Success', message: 'Campaign created successfully' });
        // await navigateTo('/campaign');
    });

    onMounted(() => {
        if (props.showDailySettings) {
            dailyPrizesActive.value = true;
        }

        if (props.showWeeklySettings) {
            weeklyPrizesActive.value = true;
        }

        if (props.showMonthlySettings) {
            monthlyPrizesActive.value = true;
        }

        if (props.showMainPrizeSettings) {
            mainPrizeActive.value = true;
        }
    });
</script>
