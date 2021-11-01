<template>
    <div class="sapi-sort-list sapi-sort-list_table-wrap">
        <slot></slot>
        <div class="sapi-sort-list_empty-holder" v-if="!value || !value.length"></div>
    </div>
</template>
<script>
    export default {
        inject: {
            sapiSortList: {
                default: null
            }
        },
        data () {
            return {}
        }
    }
</script>
