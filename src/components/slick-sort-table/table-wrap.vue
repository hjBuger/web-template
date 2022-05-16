<template>
    <ul class="slick-sort-table slick-sort-table_list-wrap">
        <slot></slot>
        <div class="slick-sort-table_empty-holder" v-if="!slickSortTable.value || !slickSortTable.value.length"></div>
    </ul>
</template>
<script>
    export default {
        inject: {
            slickSortTable: {
                default: null
            }
        }
    }
</script>
