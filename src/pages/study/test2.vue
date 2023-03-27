<template>
    <div class="study-test1">
        <div class="test-box">
            <div class="test-box-main">
                <div v-contextmenu="{ list: contextmenuList }">测试测试测试</div>
            </div>
            <div class="btn-bar">
                <div class="btn-bar-item" @click="itemClik('vue')">vue</div>
                <div class="btn-bar-item" @click="itemClik('js')">js</div>
                <div class="btn-bar-item" @click="itemClik('css')">css</div>
            </div>
        </div>
    </div>
</template>
<script>
    import contextmenu from './components/contextmenu'
    export default {
        menuLabel: '测试2',
        components: {},
        mixins: [contextmenu],
        data() {
            return {
                test: null,
                list: ['vue', 'js', 'css'],
                contextmenuList: [
                    {
                        id: '1',
                        icon: 'el-icon-s-tools',
                        text: '1111',
                        click: () => {
                            console.log('1111')
                        }
                    },
                    {
                        id: '2',
                        icon: 'el-icon-setting',
                        text: '2222',
                        click: () => {
                            console.log('2222')
                        }
                    },
                    {
                        id: '3',
                        icon: 'el-icon-s-goods',
                        text: '3333',
                        click: () => {
                            console.log('3333')
                        }
                    }
                ]
            }
        },
        methods: {
            itemClik (type) {
                if (this.list.includes(type)) {
                    const index = this.list.findIndex(item => item === type)
                    this.list.splice(index, 1)
                } else {
                    this.list.push(type)
                }
            }
        },
        created () {
        },
        mounted () {
        },
        beforeDestroy () {

        }
    }
</script>
<style lang="less">
    .study-test1{
        width: 100%;
        height: 500px;
        position: relative;

        .test-box{
            width: 1000px;
            height: 350px;
            margin: 20px auto 0;
            border: 1px solid #000000;
        }
        .test-box-main{

        }
        .btn-bar{
            display: flex;
            margin-top: 20px;
        }
        .btn-bar-item{
            margin-right: 10px;
            padding: 3px 5px;
            cursor: pointer;
            background: rgba(0,0,0,.3);
            color: #ffffff;
            cursor: pointer;
        }
    }
</style>
