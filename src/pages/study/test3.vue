<template>
    <div class="study-test3">
        <div class="test-box">
            <el-button @click="full">全屏</el-button>
            <simple-resize @fullscreenchange="fullscreenchange" ref="simpleResize" class="test3-resize-box" direction="leftTop" :dis="10">
                <div class="test-r">22222</div>
            </simple-resize>
        </div>
    </div>
</template>
<script>
    export default {
        menuLabel: '测试3',
        components: {},
        data() {
            return {
                test: null
            }
        },
        methods: {
            full () {
                this.$refs.simpleResize.fullscreen()
            },
            fullscreenchange (status, ev) {
                console.log('status: ', status)
                console.log('ev: ', ev)
            }
        },
        created () {},
        mounted () {},
        beforeDestroy () {}
    }
</script>
<style lang="less" scoped>
    .study-test3{
        width: 100%;
        min-height: 500px;
        position: relative;

        .test-box{
            width: 1000px;
            min-height: 350px;
            margin: 20px auto 0;
            border: 1px solid #000000;
            padding: 20px;
            background: #ffffff;
        }
        .test3-resize-box{
            width: 200px;
            height: 200px;
            position: absolute;
            right: 0;
            bottom: 0;
        }
        .test-r{
            width: 100%;
            height: 100%;
            border: 1px solid yellowgreen;
        }
    }
</style>
