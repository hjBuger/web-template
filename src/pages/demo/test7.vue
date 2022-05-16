<template>
    <div>
        <slick-sort-table v-model="tableData"></slick-sort-table>
    </div>
</template>
<script>
    import SlickSortTable from '@/components/slick-sort-table'
    import SlickSortColumn from '@/components/slick-sort-table/slick-sort-column'
    export default {
        menuLabel: '测试7',
        components: {
            SlickSortTable,
            SlickSortColumn
        },
        data () {
            return {
                tableData: [
                    {
                        label: '1',
                        value: '1'
                    },
                    {
                        label: '2',
                        value: '2'
                    },
                    {
                        label: '3',
                        value: '3'
                    },
                    {
                        label: '4',
                        value: '4'
                    },
                    {
                        label: '5',
                        value: '5'
                    },
                    {
                        label: '6',
                        value: '6'
                    },
                    {
                        label: '7',
                        value: '7'
                    },
                    {
                        label: '8',
                        value: '8'
                    },
                    {
                        label: '9',
                        value: '9'
                    },
                    {
                        label: '10',
                        value: '10'
                    },
                    {
                        label: '11',
                        value: '11'
                    },
                    {
                        label: '12',
                        value: '22'
                    },
                    {
                        label: '13',
                        value: '13'
                    },
                    {
                        label: '14',
                        value: '14'
                    },
                    {
                        label: '15',
                        value: '15'
                    }
                ],
            }
        }
    }
</script>
<style lang="less">
</style>
