<template>
    <div>
        <PrizeForm
            :id="id"
            :prize-name="prizeName"
            :prize-description="prizeDescription"
            :prize-quantity="prizeQuantity"
            :prize-type="prizeType"
            :prize-image="prizeImage"
        />
    </div>
</template>

<script setup>
    const route = useRoute();
    const id = route.params.id;
    // TODO: fetch prize data by id
    const prizeName = 'prizeName' + id.value;
    const prizeDescription = 'prizeDescription' + id.value;
    const prizeQuantity = 10;
    const prizeType = 'daily';
    const prizeImage = 'https://via.placeholder.com/150';
</script>
