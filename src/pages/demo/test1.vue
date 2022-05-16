<template>
    <div>
        <div class="test-block">
            <sapi-status-mark
                :data="markData"
                title="计划节点"
                line-type="dashed"
                content-show-type="normal"
                type="horizontal"
                :show-status-bar="true"
                :status-bar-reverse="true"
                :gap="150"
                line-color-inherit
                :status-map="options"
                :line-visible="true"
            >
                <template #statusBarPrefix>
                    <el-button>点击</el-button>
                </template>
                <template #statusBarSuffix>
                    <el-button>点击</el-button>
                </template>
                <template v-slot="props">
                    <div style="color:red;">{{props.item.label}}</div>
                    <div style="color:red;">{{props.data.name}}</div>
                    <div style="color:red;">{{props.$index}}</div>
                    测试新的组件标题测试新的组件标题测试新的组件标题测试新的组件标题
                </template>
            </sapi-status-mark>
        </div>
    </div>
</template>
<script>
    export default {
        menuLabel: '测试1',
        data () {
            return {
                markData: [
                    {
                        label: '拿地',
                        // labelStyle: {
                        //     fontWeight: 'bold',
                        //     fontSize: '16px'
                        // },
                        value: '11',
                        status: '1',
                        content: `2022-05-10`,
                        clickable: true,
                        data: {
                            name: 'hhhhhhhhhhhhhh'
                        },
                        clickFn: (item) => {
                            console.log('item: ', item)
                        }
                    },
                    {
                        label: '项目立项会',
                        value: '22',
                        status: '2',
                        content: '22222'
                    },
                    {
                        label: '项目预备会',
                        value: '33',
                        status: '3',
                        content: '33333'
                    },
                    {
                        label: '项目启动会',
                        value: '44',
                        status: '2',
                        content: '44444'
                    },
                    {
                        label: '总包开工',
                        value: '55',
                        status: '5',
                        content: '55555'
                    },
                    {
                        label: '总包开工2',
                        value: '66',
                        status: '4',
                        content: '66666'
                    },
                ],
                options: [
                    {
                        label: '未开始',
                        value: '1',
                        color: 'gray',
                        icon: 'el-icon-monitor',
                        iconStyle: {
                            borderRadius: '4px'
                        },
                        dotSize: 24,
                        lineType: 'solid'
                    },
                    {
                        label: '进行中',
                        value: ['2', '5'],
                        color: 'red',
                        icon: {
                            type: 'text',
                            content: '进'
                        }
                    },
                    {
                        label: '已完成',
                        value: '3,4',
                        color: 'green',
                        icon: {
                            type: 'img',
                            content: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdingyue.ws.126.net%2F2020%2F0515%2F465567a6j00qadpfz001cc000hs00b4c.jpg&refer=http%3A%2F%2Fdingyue.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654769533&t=64e379f7a431131b5bcd1e1571d19213'
                        },
                        lineType: 'solid'
                    }
                ]
            }
        }
    }
</script>
<style lang="less">
    .test-block{
        width: 700px;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 1px 9px #3f3e3e;
        margin: 20px auto 0;
    }
</style>
