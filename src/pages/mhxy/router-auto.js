import { createRouter } from '@/router/utils'
const config = {
    name: 'mhxy',
    path: `/mhxy`
}

// 查当前目录下的非index.vue开头的.vue文件
const requireComponent = require.context(
    // 其组件目录的相对路径
    './',
    // 是否查询其子目录
    false,
    // 匹配基础组件文件名的正则表达式
    /^(?!\.\/index\.vue).*\.vue$/
)

// 查当前目录及子目录下的index文件
const requireComponentChild = require.context(
    './',
    true,
    /index\.(vue|js)$/
)

const router = createRouter(config, requireComponent, requireComponentChild)

export default router
