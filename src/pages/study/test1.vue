<template>
    <div class="study-test1">
        <div class="test-box">
            <component-wrap component="split-box" :list="list" ref="wrap">
                <template v-slot:vue-place>
                    <div>
                        vue-place
                    </div>
                </template>
                <template v-slot:footer>
                    <div>
                        footer
                    </div>
                </template>
                <div>
                    main
                </div>
            </component-wrap>
            <!-- <split-box :list="list">
                <template #vue-place>
                    <t-dm></t-dm>
                </template>
                <template #js-place>
                    <t-dm1></t-dm1>
                </template>
                <template #css-place>
                    <t-dm2></t-dm2>
                </template>
            </split-box>
            <div class="btn-bar">
                <div class="btn-bar-item" @click="itemClik('vue')">vue</div>
                <div class="btn-bar-item" @click="itemClik('js')">js</div>
                <div class="btn-bar-item" @click="itemClik('css')">css</div>
            </div> -->
        </div>
    </div>
</template>
<script>
    import dm from './components/dm.vue'
    import dm1 from './components/dm1.vue'
    import dm2 from './components/dm2.vue'
    export default {
        menuLabel: '测试1',
        components: {
            't-dm': dm,
            't-dm1': dm1,
            't-dm2': dm2,
        },
        data() {
            return {
                test: null,
                list: ['vue', 'js', 'css']
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
            this.$nextTick(function () {
                // this.$refs.wrap.test()
                // this.$refs.wrap.resetPlace()
            })
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
