<template>
    <div>
        <div v-if="rows && rows.length">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th v-for="column in columns" :key="column.key" scope="col">{{ column.label }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in rows" :key="row.id">
                        <td v-for="column in columns" :key="column.key" class="align-middle">
                            <slot :name="column.key" :row="row" />
                        </td>
                    </tr>
                </tbody>
            </table>

            <div v-if="lastPage > 1" class="col-12">
                <div class="d-flex mt-2 justify-content-center">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item">
                                <button
                                    class="page-link"
                                    aria-label="Previous"
                                    @click="
                                        () => {
                                            if (currentPage <= 1) {
                                                return;
                                            }

                                            currentPage = currentPage - 1;
                                            emit('refresh', currentPage);
                                        }
                                    "
                                >
                                    <span aria-hidden="true">&laquo;</span>
                                </button>
                            </li>

                            <li class="page-item">
                                <button
                                    class="page-link"
                                    :class="{ active: currentPage === 1 }"
                                    @click="
                                        () => {
                                            currentPage = 1;
                                            emit('refresh', 1);
                                        }
                                    "
                                >
                                    1
                                </button>
                            </li>

                            <li v-if="currentPage > 3" class="page-item">...</li>

                            <li v-if="currentPage > 2" class="page-item">
                                <button
                                    class="page-link"
                                    :class="{ active: currentPage === currentPage - 1 }"
                                    @click="
                                        () => {
                                            currentPage = currentPage - 1;
                                            emit('refresh', currentPage);
                                        }
                                    "
                                >
                                    {{ currentPage - 1 }}
                                </button>
                            </li>

                            <li v-if="currentPage !== 1 && currentPage !== lastPage" class="page-item">
                                <button
                                    class="page-link"
                                    :class="{ active: currentPage === currentPage }"
                                    @click="
                                        () => {
                                            currentPage = currentPage;
                                            emit('refresh', currentPage);
                                        }
                                    "
                                >
                                    {{ currentPage }}
                                </button>
                            </li>

                            <li v-if="currentPage < lastPage - 1" class="page-item">
                                <button
                                    class="page-link"
                                    :class="{ active: currentPage === currentPage + 1 }"
                                    @click="
                                        () => {
                                            currentPage = currentPage + 1;
                                            emit('refresh', currentPage);
                                        }
                                    "
                                >
                                    {{ currentPage + 1 }}
                                </button>
                            </li>

                            <li v-if="currentPage < lastPage - 2" class="page-item">...</li>

                            <li class="page-item">
                                <button
                                    class="page-link"
                                    :class="{ active: currentPage === lastPage }"
                                    @click="
                                        () => {
                                            currentPage = lastPage;
                                            emit('refresh', lastPage);
                                        }
                                    "
                                >
                                    {{ lastPage }}
                                </button>
                            </li>

                            <li class="page-item">
                                <button
                                    class="page-link"
                                    aria-label="Next"
                                    @click="
                                        () => {
                                            if (currentPage >= lastPage) {
                                                return;
                                            }
                                            currentPage = currentPage + 1;

                                            emit('refresh', currentPage);
                                        }
                                    "
                                >
                                    <span aria-hidden="true">&raquo;</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

        <div v-else class="text-center p-4">
            <p>{{ $t('noData') }}</p>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        columns: {
            type: Array,
            default: () => [],
        },
        rows: {
            type: Array,
            default: () => [],
        },
        lastPage: {
            type: Number,
            default: 1,
        },
        limit: {
            type: Number,
            default: 10,
        },
    });

    const emit = defineEmits(['refresh']);
    let currentPage = ref(1);
</script>
