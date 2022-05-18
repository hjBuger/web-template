<template>
    <div>
        <div class="test-block">
            <sapi-simple-mark
                title="计划节点_模拟"
                type="horizontal"
                line-color="#458aff"
                :data="list"
                :show-status-bar="true"
                :gap="65"
                :dot-size="12"
                :status-map="statusMap"
                :extend-config="extendConfig"
                :props="props"
                @item-click="itemClick"
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
                // 数据源
                list: [],
                // 状态匹配
                statusMap: [
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
                ],
                // 字段匹配
                props: {
                    label: 'name',
                    value: 'id',
                    status: 'status'
                }
            }
        },
        methods: {
            // 扩展配置
            extendConfig (item, index) {
                let config = {}
                if (item.lcb) {
                    config = {
                        icon: 'el-icon-s-flag',
                        labelStyle: {
                            fontWeight: 'bold',
                            color: '#333333'
                        },
                        dotSize: 16
                    }
                }
                return config
            },
            // 获取数据源
            loadData () {
                this.list = [
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
            },
            // 点击方法
            itemClick (item) {
                console.log('itemClick: ', item)
            }
        },
        mounted () {
            this.loadData()
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
