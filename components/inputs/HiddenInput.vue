<template>
    <input v-model="value" :name="name" type="hidden" />
    <div v-if="errorMessage" class="invalid-feedback d-block">{{ errorMessage }}</div>
</template>

<script setup>
    const props = defineProps({
        name: {
            type: String,
            required: true,
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
