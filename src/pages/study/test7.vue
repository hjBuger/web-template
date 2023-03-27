<template>
    <div class="study-test7">
        <div class="test-box" v-contextmenu="{ list: list }">
        </div>
    </div>
</template>
<script>
    import * as demo from './files/demo'
    console.log('demo: ', demo)
    export default {
        menuLabel: '测试7',
        data() {
            return {
                test: null,
                list: [
                    { text: 1111 },
                    { text: 2222 },
                    { text: 3333 },
                    { text: 4444 },
                    { text: 5555 }
                ]
            }
        },
        methods: {
            testFn () {

            }
        },
        created () {
            this.testFn()
        },
        mounted () {

        },
        beforeDestroy () {

        }
    }
</script>
<style lang="less">
    .study-test7{
        width: 100%;
        // height: 500px;
        position: relative;

        .test-box{
            width: 100%;
            height: 350px;
            margin: 50px auto;
            border: 1px solid #000000;
        }
    }
</style>
