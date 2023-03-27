<template>
    <div class="study-test6">
        <div class="test-box">
            <canvas-table></canvas-table>
        </div>
    </div>
</template>
<script>
    export default {
        menuLabel: '测试6',
        data() {
            return {
                test: null,
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
    .study-test6{
        width: 100%;
        // height: 500px;
        position: relative;

        .test-box{
            width: 1000px;
            // height: 350px;
            margin: 50px auto;
            // border: 1px solid #000000;
        }
    }
</style>
