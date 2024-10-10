<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <NotificationSuccessForm :id="id" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const route = useRoute();
    const id = route.params.id;
</script>
