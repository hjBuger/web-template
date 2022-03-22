<template>
    <div class="sapi-public-selector_tree-item-template" :title="label">{{label}}</div>
</template>
<script>
    export default {
        inject: {
            PUBLIC_SELECTOR: {
                default: null
            }
        },
        props: {
            item: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        computed: {
            realProps () {
                return this.PUBLIC_SELECTOR.realProps
            },
            label () {
                return this.item[this.realProps.itemName]
            }
        }
    }
</script>
