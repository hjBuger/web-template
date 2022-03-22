import Vue from 'vue'
class DownloadExcel {
    XLSX = Vue.$xlsxLazy
    // 参数参考XLSX的aoa_to_sheet
    static aoa_to_sheet (data, opts, fileName) {
        const worksheet = XLSX.utils.aoa_to_sheet(data, opts)
        const workbook = DownloadExcel.sheetToBook({
            sheet1: worksheet
        })
        const blob = DownloadExcel.bookToBlob(workbook)
        DownloadExcel.export(blob, fileName)
    }

    static sheetToBook (Sheets) {
        const SheetNames = Object.keys(Sheets)
        return {
            SheetNames,
            Sheets
        }
    }

    static bookToBlob (workbook) {
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
        const blob = new Blob([s2ab(file)], { type: "application/octet-stream" })

        return blob
    }

    // 导出文件
    static export (blob, fileName) {
        fileName = `${fileName || Date.now()}.xlsx`

        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, fileName)
        } else {
            const aEl = document.createElement('a')
            document.body.appendChild(aEl)
            aEl.download = fileName
            aEl.href = window.URL.createObjectURL(blob)
            aEl.click()
            document.body.removeChild(aEl)
        }
    }
}

export default DownloadExcel