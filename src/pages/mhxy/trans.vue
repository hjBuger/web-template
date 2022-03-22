<template>
    <div>
        <layout-row title="单价计算">
            <layout-column>
                <el-input size="small" v-model.number="inputVal"></el-input>
            </layout-column>
        </layout-row>
    </div>
</template>
<script>
    export default {
        menuLabel: '转换',
        data () {
            return {
                inputVal: null
            }
        },
        methods: {
            // 获取单价
            getUnitPrice (price, lv, base = 2) {
                return price / Math.pow(base, lv - 1)
            },
            // 指定锻造级别需要的单位数量
            getUnitCount (lv, base = 2) {
                if (lv <= 1 ) return 1
                return Array.from({ length: lv }).reduce((rs, item, index) => rs + Math.pow(base, index), 0)
            }
        },
        mounted () {
        },
        beforeDestroy () {
        }
    }
</script>
