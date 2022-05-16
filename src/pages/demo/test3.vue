<template>
    <div class="test3-wrap">
        <el-button @click="editRowId = ''">clear</el-button>
        <el-table border :data="tableData" @row-dblclick="setEditRow" ref="table" row-key="id" :edit-row="editRowId">
            <el-table-column show-overflow-tooltip width="100" prop="label" label="名称"></el-table-column>
            <sapi-edit-column show-overflow-tooltip width="100" prop="label" label="名称"></sapi-edit-column>
            <el-table-column show-overflow-tooltip width="100" prop="label" label="名称"></el-table-column>
            <sapi-edit-column show-overflow-tooltip width="100" prop="label" label="名称"></sapi-edit-column>
            <el-table-column show-overflow-tooltip width="100" prop="label" label="名称"></el-table-column>
            <sapi-edit-column show-overflow-tooltip width="100" prop="label" label="名称"></sapi-edit-column>
            <sapi-edit-column show-overflow-tooltip width="100" prop="label" label="名称"></sapi-edit-column>
            <sapi-edit-column show-overflow-tooltip width="100" prop="label" label="名称">
                <template v-slot:input="props">
                    <el-input v-model="props.row.label"></el-input>
                </template>
            </sapi-edit-column>
            <sapi-edit-column show-overflow-tooltip prop="test" label="测试1" width="200">
                <template v-slot:header>
                    测试header插槽
                </template>
                <template v-slot:input="props">
                    <el-input v-model="props.row.test"></el-input>
                </template>
                <template v-slot="props">
                    {{props.row.test}}
                </template>
            </sapi-edit-column>
            <el-table-column show-overflow-tooltip width="100" prop="label" label="名称"></el-table-column>
            <sapi-edit-column show-overflow-tooltip width="100" prop="label" label="名称"></sapi-edit-column>
            <sapi-edit-column show-overflow-tooltip prop="test2" label="测试2" key="testKey">
                <template v-slot="props">
                    {{props.row.test2 || ''}}
                </template>
            </sapi-edit-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        menuLabel: '测试3',
        data() {
            return {
                tableData: [
                    {id: '1', label: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试', remark: '备注', test: '', test2: ''},
                    {id: '2', label: '测试测试测试测试测试测试测试测', remark: '备注2', test: '', test2: ''},
                    {id: '3', label: '测试测试测试测试测试测试测试测', remark: '备注2', test: '', test2: ''},
                    {id: '4', label: '测试测试测试测试测试测试测试测', remark: '备注2', test: '', test2: ''},
                    {id: '5', label: '测试测试测试测试测试测试测试测', remark: '备注2', test: '', test2: ''},
                    {id: '6', label: '测试测试测试测试测试测试测试测', remark: '备注2', test: '', test2: ''},
                    {id: '7', label: '测试测试测试测试测试测试测试测', remark: '备注2', test: '', test2: ''},
                    {id: '8', label: '测试测试测试测试测试测试测试测', remark: '备注2', test: '', test2: ''},
                    {
                        id: '9',
                        label: '测试测试测试测试测试测试测试测',
                        remark: '备注2',
                        test: '',
                        test2: '',
                        children: [
                            {id: '1-1', label: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试', remark: '备注', test: '', test2: ''},
                            {id: '1-2', label: '测试测试测试测试测试测试测试测', remark: '备注2', test: '', test2: ''},
                            {id: '1-3', label: '测试测试测试测试测试测试测试测', remark: '备注2', test: '', test2: ''},
                        ]
                    },
                ],
                editRowId: ''
            }
        },
        methods: {
            setEditRow (row) {
                this.editRowId = row.id
            }
        },
        beforeDestroy () {}
    }
</script>
<style lang="less">
    .test3-wrap{
        line-height: 32px;
        margin-top: 50px;
        border-radius: 6px;
        text-align: left;
        padding: 0 10px;
    }
</style>
