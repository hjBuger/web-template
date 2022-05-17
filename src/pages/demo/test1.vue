<template>
    <div>
        <div class="test-block">
            <sapi-simple-mark
                :data="markData"
                title="计划节点_横向"
                line-type="dashed"
                content-show-type="normal"
                type="horizontal"
                :show-status-bar="true"
                :status-bar-reverse="true"
                :gap="150"
                line-color-inherit
                :status-map="statusMap"
                :line-visible="true"
                @item-click="itemClick"
            >
                <template #statusBarPrefix>
                    <el-button>点击</el-button>
                </template>
                <template #statusBarSuffix>
                    <el-button>点击</el-button>
                </template>
                <template v-slot="props">
                    <div style="color:red;">label：{{props.item.label}}</div>
                    <div style="color:blue;">原始数据名称：{{props.data.name}}</div>
                    <div style="color:green;margin-bottom: 10px;">序号：{{props.$index}}</div>
                    内容插槽测试...
                </template>
            </sapi-simple-mark>
            <sapi-simple-mark
                style="margin-top: 20px;"
                :data="markData"
                title="计划节点_竖向"
                line-type="dashed"
                content-show-type="normal"
                type="vertical"
                :show-status-bar="true"
                :status-bar-reverse="true"
                :gap="150"
                line-color-inherit
                :status-map="statusMap"
                :line-visible="true"
            >
                <template #statusBarPrefix>
                    <el-button>点击</el-button>
                </template>
                <template #statusBarSuffix>
                    <el-button>点击</el-button>
                </template>
                <template v-slot="props">
                    <div style="color:red;">label：{{props.item.label}}</div>
                    <div style="color:blue;">原始数据名称：{{props.data.name}}</div>
                    <div style="color:green;margin-bottom: 10px;">序号：{{props.$index}}</div>
                    内容插槽测试...
                </template>
            </sapi-simple-mark>
            <sapi-simple-mark
                :data="pomData"
                title="计划节点_模拟"
                content-show-type="normal"
                type="horizontal"
                :show-status-bar="true"
                :status-bar-reverse="true"
                :gap="65"
                line-color="#458aff"
                :status-map="pomStatusMap"
                :line-visible="true"
                @item-click="itemClick"
                :dot-size="12"
            >
                <template #statusBarSuffix>
                    <el-button>里程碑节点对比</el-button>
                </template>
            </sapi-simple-mark>
        </div>
    </div>
</template>
<script>
    export default {
        menuLabel: '测试1',
        data () {
            return {
                markData: [],
                pomData: [],
                // 状态匹配（对象）
                statusMap: {
                    1: {
                        label: '未开始',
                        color: 'gray',
                        icon: 'el-icon-monitor',
                        iconStyle: {
                            borderRadius: '4px',
                            fontSize: '16px'
                        },
                        dotSize:24,
                        lineType: 'solid'
                    },
                    ' 2 , 5 ': {
                        label: '进行中',
                        color: 'red',
                        icon: {
                            type: 'text',
                            content: '进'
                        }
                    },
                    '3 , 4': {
                        label: '已完成',
                        color: 'green',
                        icon: {
                            type: 'img',
                            content: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdingyue.ws.126.net%2F2020%2F0515%2F465567a6j00qadpfz001cc000hs00b4c.jpg&refer=http%3A%2F%2Fdingyue.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654769533&t=64e379f7a431131b5bcd1e1571d19213'
                        }
                    }
                },
                // 状态匹配（数组）
                statusMap2: [
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
                        }
                    }
                ],
                pomStatusMap: [
                    {
                        label: '正常',
                        value: 1,
                        color: '#458aff'
                    },
                    {
                        label: '提前',
                        value: 2,
                        color: '#5edb23'
                    },
                    {
                        label: '逾期完成',
                        value: 3,
                        color: '#ff7070'
                    },
                    {
                        label: '逾期未完成',
                        value: 4,
                        color: '#ffc86a'
                    },
                    {
                        label: '未到期',
                        value: 5,
                        color: '#bdbebf',
                        lineColor: '#bdbebf',
                        labelStyle: {
                            color: '#bdbebf'
                        }
                    }
                ]
            }
        },
        methods: {
            loadData () {
                // 数据源
                const demo = [
                    {id: '1', name: '拿地', status: 1, date: '2022-05-10'},
                    {id: '2', name: '项目立项会', status: 2, date: '2022-05-10'},
                    {id: '3', name: '项目预备会', status: 3, date: '2022-05-10'},
                    {id: '4', name: '项目启动会', status: 4, date: '2022-05-10'},
                    {id: '5', name: '总包开工', status: 5, date: '2022-05-10'},
                    {id: '6', name: '总包开工2', status: 3, date: '2022-05-10'}
                ]

                // 根据业务自由构造数据，底层组件只做数据渲染，不做逻辑处理
                const markData = demo.map(item => ({
                    data: item,
                    label: item.name,
                    value: item.id,
                    status: item.status,
                    content: item.date
                }))

                this.markData = markData
            },
            loadPomData () {
                // 数据源
                const demo = [
                    {id: '1', name: '拿地', status: 1, lcb: true},
                    {id: '2', name: '项目立项会', status: 1},
                    {id: '3', name: '项目预备会', status: 2},
                    {id: '4', name: '项目启动会', status: 3, lcb: true},
                    {id: '5', name: '规划方案批复', status: 3},
                    {id: '6', name: '取得工规证', status: 3, lcb: true},
                    {id: '7', name: '示范区开放', status: 4,},
                    {id: '8', name: '桩基开工', status: 3},
                    {id: '9', name: '总包开工', status: 3},
                    {id: '10', name: '住宅首次开盘', status: 5, lcb: true},
                    {id: '11', name: '全部达预售', status: 5},
                    {id: '12', name: '现金流回正', status: 5, lcb: true},
                    {id: '13', name: '竣工备案', status: 5, lcb: true},
                    {id: '14', name: '集中交付', status: 5, lcb: true},
                    {id: '15', name: '初始登记', status: 5},
                ]

                // 根据业务自由构造数据，底层组件只做数据渲染，不做逻辑处理
                const pomData = demo.map(item =>{
                    let config = {}
                    if (item.lcb) {
                        config = {
                            icon: 'el-icon-s-flag',
                            // icon: {
                            //     type: 'img',
                            //     content: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdingyue.ws.126.net%2F2020%2F0515%2F465567a6j00qadpfz001cc000hs00b4c.jpg&refer=http%3A%2F%2Fdingyue.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654769533&t=64e379f7a431131b5bcd1e1571d19213'
                            // },
                            labelStyle: {
                                fontWeight: 'bold',
                                color: '#333333'
                            },
                            dotSize: 16
                        }
                    }
                    return {
                        data: item,
                        label: item.name,
                        value: item.id,
                        status: item.status,
                        ...config
                    }
                })

                this.pomData = pomData
            },
            itemClick (item) {
                console.log('itemClick: ', item)
            }
        },
        mounted () {
            this.loadData()
            this.loadPomData()
        }
    }
</script>
<style lang="less">
    .test-block{
        width: 1000px;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 1px 9px #3f3e3e;
        margin: 20px auto;
    }
</style>
