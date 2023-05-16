<template>
    <div class="study-test9">
        <div class="test-box">
            <div v-simple-sortable="{ list: this.list, target: $refs.dm }">
                <div v-for="(item, index) in list" :key="item.name">[{{index}}]: {{item.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    import dm from './components/dm.vue'
    export default {
        menuLabel: '测试9',
        components: {
            dm
        },
        data() {
            return {
                test: null,
                list: [
                    { name: '1111' },
                    { name: '2222' },
                    { name: '3333' },
                    { name: '4444' },
                    { name: '5555' },
                ]
            }
        },
        methods: {

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
    .study-test9{
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
