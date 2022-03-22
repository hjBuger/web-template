export default function htmlToExcel (options) {
    let settings = {
        //导出文件名
        fileName:'unTitle',
        data: [],
        thead: [],
        tbody: []
    }
    settings = Object.assign({},settings,JSON.parse(JSON.stringify(options)))

    if(!settings.data.length > 0) return false

    //生成thead
    let theadHtml = ''
    for(let i=0 ; i < settings.thead.length ; i++ ){
        theadHtml += `<th height="40" width="120" align="center">${settings.thead[i]}</th>`
    }
    let thead = `
        <thead>
            <tr>${theadHtml}</tr>
        </thead>
    `

    //生成tbody
    let tbodyHtml = ''
    for(let i=0 ; i < settings.data.length ; i++ ){
        let tr = ''
        for(let j = 0; j < settings.tbody.length ; j++){
            tr += `<td height="40" width="120" align="center">${settings.data[i][settings.tbody[j]]}</td>`
        }
        tbodyHtml += `<tr>${tr}</tr>`
    }
    let tbody = `
        <tbody>${tbodyHtml}</tbody>
    `

    //生成table
    let table = `<table border="1" cellspacing="0">${thead + tbody}</table>`

    // 包装成一个完整的HTML文档，设置 charset 为 urf-8 以防止中文乱码
    let html = `
        <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40" >
            <head>
                <meta charset="utf-8" />
                <meta name="ProgId" content="Excel.Sheet" />
                <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
            </head>
            <body>
                ${table}
            </body>
        </html>
    `

    // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
    let blob = new Blob([html], { type: 'application/x-xls' })

    //生成一个a标签
    let a = document.createElement('a')
    a.style.display = 'none'

    // 利用URL.createObjectURL()方法为 a 元素生成 blob URL
    a.href = URL.createObjectURL(blob)

    // 设置文件名
    a.download = `${settings.fileName}.xlsx`

    //触发点击事件
    document.body.appendChild(a)
    a.click()

    //移除
    document.body.removeChild(a)
}