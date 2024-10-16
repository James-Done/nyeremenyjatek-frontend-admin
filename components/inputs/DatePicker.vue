<template>
    <div>
        <label :for="id" class="form-label">{{ label }}</label>

        <VueDatePicker
            :id="id"
            v-model="value"
            :auto-apply="true"
            class="form-control"
            :class="{ 'is-invalid': errorMessage }"
            :required="required"
            :enable-time-picker="false"
            :locale="locale"
            :max-date="maxDate"
        />
        <div class="invalid-feedback">{{ errorMessage }}</div>
    </div>
</template>

<script setup>
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';
    const { locale } = useI18n();

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
            type: String,
            default: '',
        },
        value: {
            type: String,
            default: '',
        },
    });

    const { value, errorMessage } = useField(() => props.name);

    if (props.value) {
        value.value = new Date(props.value);
    }
</script>
