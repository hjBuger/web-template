<template>
    <div class="test4-wrap">
        <el-input v-model="keyValue"></el-input>
    </div>
</template>
<script>
    export default {
        menuLabel: '测试4',
        data() {
            return {
                list: [
                    {
                        id: '1',
                        label: '测试测试1',
                        remark: 'r',
                        test: '',
                        test2: '',
                        children: [
                            {
                                id: '1-1',
                                label: '测试测试1-1',
                                remark: 't',
                                test: '',
                                test2: '',
                            },
                            {
                                id: '1-2',
                                label: '测试测试1-2',
                                remark: 'k',
                                test: '',
                                test2: '',
                            },
                            {
                                id: '1-3',
                                label: '测试测试1-3',
                                remark: 'r',
                                test: '',
                                test2: '',
                            }
                        ]
                    },
                    {id: '2', label: '测试测试2', remark: 'r', test: '', test2: ''},
                    {id: '3', label: '测试测试3', remark: 't', test: '', test2: ''},
                    {id: '4', label: '测试测试4', remark: 'k', test: '', test2: ''}
                ],
                keyValue: ''
            }
        },
        watch: {
            keyValue (val) {
                this.search(val)
            }
        },
        methods: {
            search (val) {
                const list = this.$utils.getDataByKeyValue(val, this.list, { keyField: 'remark', all: true })
                console.log('list: ', list)
            }
        }
    }
</script>
<style lang="less">
    .test4-wrap{
        line-height: 32px;
        margin-top: 50px;
        border-radius: 6px;
        text-align: left;
        padding: 0 10px;
    }
</style>
