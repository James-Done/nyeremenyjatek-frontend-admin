<template>
    <label :for="id" class="form-label">{{ label }}</label>
    <input
        :id="id"
        v-model="value"
        :class="{ 'is-invalid': errorMessage }"
        type="number"
        class="form-control"
        :required="required"
    />
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
        required: {
            type: Boolean,
            default: false,
        },
        value: {
            type: Number,
            default: 0,
        },
    });

    const { value, errorMessage } = useField(() => props.name);

    if (props.value) {
        value.value = props.value;
    }
</script>
