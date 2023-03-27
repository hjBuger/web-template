<template>
    <div class="study-test5">
        <div class="test-box">
            <el-button @click="toggle">按钮</el-button>
            <el-button @click="footer">底部</el-button>
            <el-button @click="header">头部</el-button>
        </div>
    </div>
</template>
<script>
    import Contextmenu from '@/components/contextmenu/directive.js'
    export default {
        menuLabel: '测试5',
        data() {
            return {
                test: null,
                contextmenu: null
            }
        },
        methods: {
            toggle () {
                this.contextmenu.toggle()
            },
            footer () {
                this.contextmenu.setScopedSlots('footer', props => {
                    return this.$createElement('b', '测试footer')
                })
            },
            header () {
                this.contextmenu.setScopedSlots('header', props => {
                    return this.$createElement('b', '测试header')
                })
            }
        },
        created () {
            this.contextmenu = new Contextmenu()
            console.log('contextmenu: ', this.contextmenu)
        },
        mounted () {
            
        },
        beforeDestroy () {

        }
    }
</script>
<style lang="less">
    .study-test5{
        width: 100%;
        height: 500px;
        position: relative;

        .test-box{
            width: 1000px;
            height: 350px;
            margin: 20px auto 0;
            border: 1px solid #000000;
        }
    }
</style>
