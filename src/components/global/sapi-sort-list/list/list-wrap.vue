<template>
    <ul class="sapi-sort-list sapi-sort-list_list-wrap">
        <slot></slot>
        <div class="sapi-sort-list_empty-holder" v-if="!sapiSortList.value || !sapiSortList.value.length"></div>
    </ul>
</template>
<script>
    export default {
        inject: {
            sapiSortList: {
                default: null
            }
        }
    }
</script>
