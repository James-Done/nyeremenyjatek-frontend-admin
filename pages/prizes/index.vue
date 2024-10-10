<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>{{ $t('prizes') }}</h1>

                    <div class="pt-3 pb-3">
                        <NuxtLink to="/prizes/create" class="btn btn-primary"> {{ $t('addPrize') }} </NuxtLink>
                    </div>
                </div>

                <div class="col-12">
                    <TableComponent :columns="columns" :rows="prizes">
                        <template #name="{ row }">
                            {{ row.name }}
                        </template>
                        <template #description="{ row }">
                            {{ row.description }}
                        </template>
                        <template #image="{ row }">
                            <img :src="row.image" alt="Kép" />
                        </template>
                        <template #delete="{ row }">
                            <button class="btn btn-danger" @click="deletePrize(row.id)">{{ $t('delete') }}</button>
                        </template>
                        <template #edit="{ row }">
                            <NuxtLink :to="`/prizes/edit/${row.id}`" class="btn btn-primary">{{ $t('edit') }}</NuxtLink>
                        </template>
                    </TableComponent>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const { t } = useI18n();
    const columns = ref([
        { key: 'image', label: t('image') },
        { key: 'name', label: t('name') },
        { key: 'description', label: t('description') },
        { key: 'delete', label: t('delete') },
        { key: 'edit', label: t('edit') },
    ]);

    const prizes = ref([
        { id: 1, name: 'Első díj', description: 'Ez az első díj', image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Második díj', description: 'Ez a második díj', image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Harmadik díj', description: 'Ez a harmadik díj', image: 'https://via.placeholder.com/150' },
    ]);

    const deletePrize = (id) => {
        prizes.value = prizes.value.filter((prize) => prize.id !== id);
    };
</script>
