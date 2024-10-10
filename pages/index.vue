<template>
    <div>
        <h1>index</h1>
        <button @click="setLocale('en')">en</button>
        <button @click="setLocale('hu')">hu</button>
    </div>
</template>

<script setup>
    const { setLocale } = useI18n();
</script>
