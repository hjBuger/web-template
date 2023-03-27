<template>
    <div class="canvas-table-wrap">
        <div class="canvas-table-container">
            <canvas ref="canvasBox" width="100" height="100" class="canvas-box"></canvas>
        </div>
        <div class="canvas-table-grid">
            <div class="canvas-table-grid_header">
                <div class="canvas-table-grid_header-item" v-for="(item, index) in header" :key="'header_' + index" :style="getHeaderItemStyle(index)">
                    {{item}}
                </div>
            </div>
            <div class="canvas-table-grid_body"></div>
            <div class="canvas-table-grid_content"></div>
        </div>
    </div>
</template>

<script>
    import Canvas from './canvas'
    export default {
        props: {
            width: {
                type: Number,
                default: 0
            },
            height: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                tableConfig: {
                    rows: [],
                    columns: []
                },
                header: ['周一 02-27', '周二 02-28', '周三 02-29', '周四 03-02', '周五 03-03']
            }
        },
        methods: {
            getHeaderItemStyle (index) {
                const row = this.tableConfig.rows[0]
                const col = this.tableConfig.columns[index]
                if (!row || !col) return {}

                return {
                    width: col.width + 'px',
                    height: row.height + 'px',
                    left: col.start + 'px',
                    top: row.start + 'px'
                }
            }
        },
        mounted () {
            this.tableConfig = new Canvas({
                container: this.$refs.canvasBox,
                width: this.width || parseInt(this.$el.offsetWidth),
                rowHeight: 40,
                row: 19,
                column: 5
            }).draw()
        }
    }
</script>

<style lang="less">
    .canvas-table-wrap{
        position: relative;
        .canvas-table-container{

        }
        .canvas-table-grid{

        }
        .canvas-table-grid_header,
        .canvas-table-grid_body,
        .canvas-table-grid_content{
            width: 0;
            height: 0;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 200;
        }
        .canvas-table-grid_content{
            z-index: 300;
        }
        .canvas-table-grid_header-item{
            position: absolute;
            left: 0;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: bold;
        }
    }
</style>