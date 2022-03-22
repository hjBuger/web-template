<template>
    <div class="test5-wrap">
        <sapi-public-selector
            v-model="selectList"
            :data="source"
            :multiple="false"
            placeholder="请选择"
            style="width: 250px;"
            :collapse-tags="false"
        ></sapi-public-selector>
    </div>
</template>
<script>
    export default {
        menuLabel: '测试5',
        data() {
            return {
                selectList: ['1', '2', '3', '4'],
                source: [
                    {
                        itemId: '1',
                        itemName: '1111111111111111111111111111111111111111111111111111111111'
                    },
                    {
                        itemId: '2',
                        itemName: '222'
                    },
                    {
                        itemId: '3',
                        itemName: '333'
                    },
                    {
                        itemId: '4',
                        itemName: '444',
                        children: [
                            {itemId: '4-1', itemName: '4-111'},
                            {itemId: '4-2', itemName: '4-222'},
                            {
                                itemId: '4-3',
                                itemName: '4-333',
                                children: [
                                    {itemId: '4-3-1',itemName: '4-3-1'},
                                    {itemId: '4-3-2',itemName: '4-3-2'}
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        watch: {
        },
        methods: {
        }
    }
</script>
<style lang="less">
    .test5-wrap{
        line-height: 32px;
        margin-top: 50px;
        border-radius: 6px;
        text-align: left;
        padding: 0 10px;
    }
</style>
