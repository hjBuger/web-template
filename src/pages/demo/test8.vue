<template>
    <div class="demo-test-8-wrap">
        <img class="test3d" @transitionend="transitionend" src="@/static/images/test1.jpg" alt="" :style="test3dStyle">
        <el-button @click="changeRotateX">change</el-button>
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
            return {
                rotateX: 0,
                rotateY: 0
            }
        },
        computed: {
            test3dStyle () {
                return {
                    transform: `translateY(0) translateX(0px) rotateX(${this.rotateX}deg) rotateY(0deg) rotateZ(0deg) translateZ(100px)`,
                    transformOrigin: 'cneter'
                }
            }
        },
        methods: {
            changeRotateX () {
                this.rotateX += 45
            },
            transitionend () {
                console.log(12222)
            }
        },
    }
</script>
<style lang="less">
    .demo-test-8-wrap{
        margin: 200px auto 0;
        border: 1px solid red;
        border-radius: 4px;
        box-shadow: 0 3px 9px #979292;
        // overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        position: relative;

        transform-style: preserve-3d;
        perspective: 800;
        backface-visibility: hidden;
        position: relative;


        .test3d{
            display: block;
            width: 360px;
            height: 200px;
            margin: 0 auto;
            background: none;
            outline: none;
            object-fit: cover;
            overflow: hidden;
            transition: 0.5s;
        }
    }
</style>
