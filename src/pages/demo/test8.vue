<template>
    <div>
        <test-com></test-com>
    </div>
</template>
<script>
    export default {
        menuLabel: '测试8',
        components: {
            'test-com': {
                methods: {
                    test () {
                        console.log('233')
                    }
                },
                render (h) {
                    return h('div', { on: {
                        click: this.test
                    }}, 233)
                }
            }
        },
        data () {
            return {}
        }
    }
</script>
<style lang="less">
</style>
