<template>
    <div>
        <div>{{content}}</div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            content: {
                type: String,
                default: 'test'
            }
        },
        data () { 
            return {
                visible: true
            }
        },
        watch: {
            content (val) {
                this.$emit('ev-test', val)
            }
        }
    }
</script>
<style lang="less">
</style>
