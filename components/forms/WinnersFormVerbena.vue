<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>{{ $t('drawWinner') }}</h1>
                </div>
                <div class="col-12">
                    <label for="campaign" class="form-label">{{ $t('campaign') }}</label>
                    <select id="campaign" v-model="entryStart" class="form-select">
                        <option v-for="option in data" :key="option.campaign_id" :value="option.entry_start">
                            {{ option.campaign_name }}
                        </option>
                    </select>

                    <form v-if="entryStart" @submit="onSubmit">
                        <WeekPicker
                            id="drawing-year"
                            name="drawing_date"
                            :label="$t('drawingDate')"
                            :required="true"
                            :max-date="previousSunday"
                            :min-date="new Date(entryStart)"
                        />

                        <button type="submit" :class="{ disabled: isSubmitting }" class="btn btn-primary">
                            {{ $t('submit') }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const { t } = useI18n();
    const runtimeConfig = useRuntimeConfig();
    const client = useSanctumClient();
    const entryStart = ref(null);

    const schema = object({
        drawing_date: date().transform((value) => {
            let now = new Date(value);
            let onejan = new Date(now.getFullYear(), 0, 1);
            let week = Math.ceil(((now.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
            return { year: now.getFullYear(), week: week };
        }),
    });

    const previousSunday = new Date();
    previousSunday.setDate(previousSunday.getDate() - previousSunday.getDay());

    const { handleSubmit, isSubmitting, setErrors } = useForm({
        validationSchema: toTypedSchema(schema),
    });

    const { data } = useAsyncData(async () => {
        try {
            const response = await client(`${runtimeConfig.public.adminUrl}campaigns`);
            return response;
        } catch (error) {
            console.log(error);
        }
    });

    const onSubmit = handleSubmit(async (values) => {
        try {
            await client(`${runtimeConfig.public.adminUrl}drawing/weekly`, {
                method: 'POST',
                body: {
                    drawing_year: values.drawing_date.year,
                    drawing_week: values.drawing_date.week,
                },
            });

            await navigateTo('/winners');
            useEvent('showToast', {
                title: t('success'),
                message: t('winnerDrawn'),
            });
        } catch (error) {
            handleFormErrors(
                error,
                (errors) => {
                    Object.keys(errors).forEach((key) => {
                        setErrors({ [key]: errors[key] });
                    });
                },
                (feedback) => {
                    useEvent('showToast', {
                        title: t(feedback.title),
                        message: feedback.message,
                        type: 'error',
                    });
                },
            );
        }
    });
</script>
