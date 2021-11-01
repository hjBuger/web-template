import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// 查当前目录下的非index.vue开头的.vue文件
const requireComponent = require.context(
    // 其组件目录的相对路径
    './',
    // 是否查询其子目录
    false,
    // 匹配基础组件文件名的正则表达式
    /^(?!\.\/index\.vue).*\.(vue|js)$/
)

// 查当前目录及子目录下的index.vue
const requireComponentChild = require.context(
    './',
    true,
    /index\.(vue|js)$/
)

let requireComponentList = handleRequire(requireComponent)
let requireComponentChildList = handleRequire(requireComponentChild)
let files = handleArray([...requireComponentList, ...requireComponentChildList], 'path')

for (let file of files) {
    // 获取组件配置
    const componentConfig = file.engine(file.path)

    // 获取和目录深度有关的文件名，如./test/index.vue => test, ./test1/test2/index.vue => test1-test2
    let fileName = file.path.replace(/^\.\//, '').replace(/\//g, '-').replace(/\.\w+$/, '').replace(/-index$/, '')
    // 忽略当前文件的index.vue
    if (fileName === 'index') continue

    // 获取组件的 PascalCase 命名
    const componentName = upperFirst(camelCase(fileName))
    // 全局注册组件
    Vue.component(
        componentName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default || componentConfig
    )
}

function handleRequire (engine) {
    return engine.keys().map(path => ({
        engine,
        path
    }))
}

function handleArray(arr, key = '') {
    for(let i=0; i<arr.length; i++){
        for(let j = i + 1; j<arr.length; j++){
            if(arr[i][key] === arr[j][key]){
                arr.splice(j,1);
                j--;
            }
        }
    }
    return arr; //可返回可不返回，因为已经直接改变原数组
}