import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

export function handleRequire (engine) {
    return engine.keys().map(path => ({
        engine,
        path
    }))
}

export function handleArray(arr, key = '') {
    for(let i=0; i<arr.length; i++){
        for(let j = i + 1; j<arr.length; j++){
            if(arr[i][key] === arr[j][key]){
                arr.splice(j,1);
                j--;
            }
        }
    }
    return arr;
}

export function createRouter (config, requireComponent, requireComponentChild) {
    const requireComponentList = handleRequire(requireComponent)
    const requireComponentChildList = handleRequire(requireComponentChild)
    const files = handleArray([...requireComponentList, ...requireComponentChildList], 'path')
    const router = {
        name: config.name,
        path: config.path ? config.path : `/${config.name}`,
        component: null,
		children: [],
        meta: {
            ...(config.meta || {})
        }
    }

    for (let file of files) {
        // 获取组件配置
        const componentConfig = file.engine(file.path)

        // 获取和目录深度有关的文件名，如./test/index.vue => test, ./test1/test2/index.vue => test1-test2
        let fileName = file.path.replace(/^\.\//, '').replace(/\//g, '-').replace(/\.\w+$/, '').replace(/-index$/, '')

        // 处理当前文件的index.vue
        if (fileName === 'index') {
            router.component = componentConfig.default || componentConfig
            continue
        }

        // 获取组件的 PascalCase 命名
        const camelCaseName = camelCase(fileName)
        const routerName = upperFirst(camelCaseName)
        const routerModel = {
            path: camelCaseName,
            name: `${router.name}${routerName}`,
            component: componentConfig.default || componentConfig
        }
        router.children.push(routerModel)
    }
    const menus = router.children.map(item => ({
        name: item.name,
        path: item.path,
        label: item.component.menuLabel
    }))

    router.meta.menus = menus

    return router
}