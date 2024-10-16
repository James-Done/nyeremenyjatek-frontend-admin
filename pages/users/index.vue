<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>{{ $t('users') }}</h1>
                <div class="pt-3 pb-3">
                    <NuxtLink to="/users/form" class="btn btn-primary"> {{ $t('addUser') }} </NuxtLink>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <TableComponent :columns="columns" :rows="users">
                    <template #id="{ row }">
                        {{ row.id }}
                    </template>
                    <template #username="{ row }">
                        {{ row.username }}
                    </template>
                    <template #email="{ row }">
                        {{ row.email }}
                    </template>
                    <template #delete="{ row }">
                        <button
                            :class="{ disabled: deleteDisabled }"
                            class="btn btn-danger"
                            @click="deleteUser(row.id)"
                        >
                            {{ $t('delete') }}
                        </button>
                    </template>
                </TableComponent>
            </div>
        </div>
    </div>
</template>

<script setup>
    const config = useRuntimeConfig();
    const { t } = useI18n();
    const client = useSanctumClient();
    const runtimeConfig = useRuntimeConfig();

    let deleteDisabled = ref(false);
    const columns = [
        { key: 'id', label: 'Id' },
        { key: 'username', label: t('userName') },
        { key: 'email', label: 'Email' },
        { key: 'delete', label: t('delete') },
    ];

    const { data: users, refresh: refreshUsers } = useAsyncData(async () => {
        const response = await client(`${runtimeConfig.public.adminUrl}users`);

        console.log(response);

        return response;
    });

    const deleteUser = async (id) => {
        deleteDisabled.value = true;
        await $fetch(`${config.public.apiBase}users/${id}`, {
            method: 'DELETE',
        }).catch((err) => {
            throw new Error(err);
        });

        refreshUsers();
        deleteDisabled.value = false;
    };
</script>
