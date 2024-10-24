<template>
    <div>
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div
                id="liveToast"
                class="toast"
                :class="{ show: show }"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div class="toast-header">
                    <strong class="me-auto">
                        {{ title }}
                    </strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    {{ message }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const { $bs } = useNuxtApp();

    defineProps({
        show: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        message: {
            type: String,
            default: '',
        },
    });

    onMounted(() => {
        try {
            new $bs.Toast('#liveToast', {
                delay: 5000,
            });
        } catch (e) {
            console.log('Bootstrap error: ', e);
        }
    });
</script>
