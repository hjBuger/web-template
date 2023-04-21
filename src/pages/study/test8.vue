<template>
    <div class="screen-test">
        <header class="screen-header"></header>
        <div class="screen-content">
            <aside class="screen-aside screen-aside-left"></aside>
            <aside class="screen-aside screen-aside-right"></aside>
            
            <section class="screen-viewport">
                
            </section>
        </div>
    </div>
</template>
<script>
    export default {
        menuLabel: '测试8',
        data() {
            return {
                
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
    .screen-test{
        width: 100%;
        height: 650px;
        overflow: hidden;
        background: #c7c9c9;
        display: flex;
        flex-direction: column;

        .screen-header{
            flex-shrink: 0;
            width: 100%;
            height: 86px;
            background: yellowgreen;

        }
        .screen-content{
            flex: auto;
            position: relative;
        }

        .screen-aside{
            position: absolute;
            top: 0;
            width: 0;
            height: 100%;
            width: 190px;
            background: rgb(23, 220, 238);
            z-index: 15;
        }
        .screen-aside-left{
            left: 0;
        }
        .screen-aside-right{
            right: 0;
        }

        .screen-viewport{
            z-index: 10;
            width: 100%;
            height: 100%;
            position: relative;
        }
    }
</style>
