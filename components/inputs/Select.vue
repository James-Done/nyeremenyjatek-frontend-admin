<template>
    <label :for="id" class="form-label">{{ label }}</label>
    <select :id="id" v-model="value" :class="{ 'is-invalid': errorMessage }" class="form-select" :required="required">
        <option v-for="option in options" :key="option" :value="option.value">{{ option.label }}</option>
    </select>
    <div v-if="errorMessage" class="invalid-feedback d-block">{{ errorMessage }}</div>
</template>

<script setup>
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
        options: {
            type: Array,
            default: () => [],
        },
        required: {
            type: Boolean,
            default: false,
        },
        value: {
            type: String,
            default: '',
        },
    });

    const { value, errorMessage } = useField(() => props.name);

    if (props.value) {
        value.value = props.value;
    }
</script>
