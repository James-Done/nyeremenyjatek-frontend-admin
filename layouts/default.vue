<template>
    <div>
        <NuxtLoadingIndicator />
        <NavBar />
        <slot />

        <Toast :show="showToast" :title="toastTitle" :message="toastMessage" />
    </div>
</template>

<script setup>
    let showToast = ref(false);
    let toastTitle = ref('');
    let toastMessage = ref('');

    useListen('showToast', (user) => {
        showToast.value = true;
        toastTitle.value = user.title;
        toastMessage.value = user.message;

        setTimeout(() => {
            showToast.value = false;
        }, 1000);
    });
</script>
