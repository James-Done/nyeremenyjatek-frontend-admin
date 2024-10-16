<template>
    <div>
        <AccountForm />
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: 'user-role',
    });
</script>
