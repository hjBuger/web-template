<template>
    <div v-show="value" class="contextmenu-list-wrap">
        <div class="header">
            <slot name="header"></slot>
        </div>
        测试contextmenu
        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            value(val) {
                console.log('value: ', val)
            }
        },
        created () {
            console.log('created')
        }
    }
</script>

<style lang="less">
    .contextmenu-list-wrap{
        position: fixed;
        z-index: 100;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }
</style>