<template>
    <div class="test6-wrap">
        <el-button @click="tableToExcel">下载</el-button>
    </div>
</template>
<script>
    import htmlToExcel from './files/test6_excel'
    import XLSX from 'xlsx'
    export default {
        menuLabel: '测试6',
        data() {
            return {
                tableData: [],
                
            }
        },
        watch: {
        },
        methods: {
            tableToExcel () {
                var worksheet = XLSX.utils.aoa_to_sheet([
                    ['standardName', 'id', 'createTime'],
                    ['${standardName}', '${id}', '${createTime}']
                ])
                this.openDownloadDialog(this.sheet2blob(worksheet), `下载1.xlsx`);
            },
            openDownloadDialog(url, saveName) {
                if (typeof url == 'object' && url instanceof Blob) {
                    url = URL.createObjectURL(url); // 创建blob地址
                }
                var aLink = document.createElement('a');
                aLink.href = url;
                aLink.download = saveName || ''
                var event;
                if (window.MouseEvent) event = new MouseEvent('click');
                else {
                    event = document.createEvent('MouseEvents');
                    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                }
                aLink.dispatchEvent(event);
            },
            sheet2blob (sheet, sheetName = 'sheet1') {
                const workbook = {
                    SheetNames: [sheetName],
                    Sheets: {}
                }
                // 生成excel的配置项
                workbook.Sheets[sheetName] = sheet

                const opts = {
                    // 要生成的文件类型
                    bookType: 'xlsx',
                    // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
                    bookSST: false,
                    type: 'binary'
                }

                // 字符串转ArrayBuffer
                const s2ab = s => {
                    const buf = new ArrayBuffer(s.length)
                    const view = new Uint8Array(buf)
                    for (let i = 0; i != s.length; ++i) {
                        view[i] = s.charCodeAt(i) & 0xFF
                    }
                    return buf
                }

                const file = XLSX.write(workbook, opts)
                const blob = new Blob([s2ab(file)], {
                    type: "application/octet-stream"
                })

                return blob
            }
        }
    }
</script>
<style lang="less">
    .test6-wrap{
        line-height: 32px;
        margin-top: 50px;
        border-radius: 6px;
        text-align: left;
        padding: 0 10px;
    }
</style>
