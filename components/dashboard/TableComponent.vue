<template>
    <div>
        <div v-if="rows.length">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th v-for="column in columns" :key="column.key" scope="col">{{ column.label }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in displayedRows" :key="row.id">
                        <td v-for="column in columns" :key="column.key" class="align-middle">
                            <slot :name="column.key" :row="row" />
                        </td>
                    </tr>
                </tbody>
            </table>

            <div v-if="rows.length > limit" class="col-12">
                <div class="d-flex mt-2 justify-content-center">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item">
                                <button
                                    class="page-link"
                                    href="#"
                                    aria-label="Previous"
                                    @click="currentPage = currentPage > 1 ? currentPage - 1 : currentPage"
                                >
                                    <span aria-hidden="true">&laquo;</span>
                                </button>
                            </li>
                            <li v-for="n in pageCount" :key="n" class="page-item">
                                <button
                                    class="page-link"
                                    :class="{ active: currentPage === n }"
                                    href="#"
                                    @click="currentPage = n"
                                >
                                    {{ n }}
                                </button>
                            </li>

                            <li class="page-item">
                                <button
                                    class="page-link"
                                    href="#"
                                    aria-label="Next"
                                    @click="currentPage = currentPage < pageCount ? currentPage + 1 : currentPage"
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
    const props = defineProps({
        columns: {
            type: Array,
            default: () => [],
        },
        rows: {
            type: Array,
            default: () => [],
        },
        limit: {
            type: Number,
            default: 10,
        },
    });

    let currentPage = ref(1);

    let displayedRows = computed(() => {
        const start = (currentPage.value - 1) * props.limit;
        const end = currentPage.value * props.limit;
        return props.rows.slice(start, end);
    });

    let pageCount = computed(() => {
        return Math.ceil(props.rows.length / props.limit);
    });
</script>
