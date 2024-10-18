<template>
    <div>
        <label :for="id" class="form-label">{{ label }}</label>

        <VueDatePicker
            :id="id"
            v-model="date"
            :auto-apply="true"
            class="form-control"
            :class="{ 'is-invalid': errorMessage }"
            :required="required"
            :enable-time-picker="false"
            :locale="locale"
            :min-date="minDate"
            :max-date="maxDate"
            :week-picker="true"
            format="ww-yyyy"
            @internal-model-change="
                () => {
                    if (date) {
                        handleChange(Object.values(date)[0]);
                    }
                }
            "
        />
        <div class="invalid-feedback">{{ errorMessage }}</div>
    </div>
</template>

<script setup>
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';
    const { locale } = useI18n();

    const date = ref();

    const props = defineProps({
        id: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            default: '',
        },
        required: {
            type: Boolean,
            default: false,
        },
        maxDate: {
            type: Date,
            required: true,
        },
        minDate: {
            type: Date,
            required: true,
        },
        value: {
            type: String,
            default: '',
        },
    });

    const { value, errorMessage, handleChange } = useField(() => props.name);

    if (props.value) {
        value.value = props.value;
    }
</script>
