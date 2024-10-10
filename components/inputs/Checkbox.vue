<template>
    <div>
        <div class="form-check">
            <input
                :id="id"
                :class="{ 'is-invalid': errorMessage }"
                type="checkbox"
                class="form-check-input"
                :checked="checked"
                :name="name"
                @change="handleChange($event.target.checked)"
            />

            <label class="form-check-label" :for="id"> {{ label }}</label>

            <div v-if="errorMessage" class="invalid-feedback d-block">{{ errorMessage }}</div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        id: {
            type: String,
            default: '',
        },
        modelValue: {
            type: Boolean,
            default: null,
        },
        name: {
            type: String,
            default: '',
        },
        value: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        checked: {
            type: Boolean,
            default: false,
        },
    });

    const { name } = toRefs(props);
    const { checked, handleChange, errorMessage } = useField(name, undefined, {
        type: 'checkbox',
        checkedValue: props.value,
    });

    if (props.checked !== false) {
        handleChange(props.checked);
    }
</script>
