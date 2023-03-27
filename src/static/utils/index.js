import { safeHtml } from './install/sanitize-html.js'

class Utils {
    // 根据key值获取数据
    getDataByKeyValue (keyValue, list, { key = 'id', children = 'children', all = false } = {}) {
        if (!list || !list.length) return null
        let current = null
        if (all) current = []
        for (let item of list) {
            if (Object.is(item[key], keyValue)) {
                if (all) {
                    current.push(item)
                } else {
                    current = item
                    break
                }
            }
            if (item[children] && item[children].length) {
                const childCurrent = this.getDataByKeyValue(keyValue, item[children], { key, children, all })
                if (childCurrent) {
                    if (all) {
                        current.push(...childCurrent)
                    } else {
                        current = childCurrent
                        break
                    }
                }
            }
        }
        return all ? current.length ? current : null : current
    }

    isEmpty (val, includeEmptyString = true) {
        const emptyList = [null, undefined, NaN]
        if (includeEmptyString) emptyList.push('')
        return emptyList.some(item => Object.is(item, val))
    }

    isObject (val) {
        return typeof val === 'object' && val !== null
    }

    isPlainObject (val) {
        return this.oType(val) === 'Object'
    }

    isArray (val) {
        return this.oType(val) === 'Array'
    }

    isBoolean (val) {
        return this.oType(val) === 'Boolean'
    }
    
    isString (val) {
        return this.oType(val) === 'String'
    }

    isPromise (val) {
        return this.oType(val) === 'Promise'
    }

    isNumber (val) {
        return this.oType(val) === 'Number'
    }

    isFunction (val) {
        return this.oType(val) === 'Function'
    }

    isNull (val) {
        return Object.is(null, val)
    }

    isUndefined (val) {
        return Object.is(undefined, val)
    }

    isNaN (val) {
        return Object.is(NaN, val)
    }

    isHtmlElement (val) {
        return /^HTML\w*Element$/.test(this.oType(val))
    }

    oType (val) {
        return Object.prototype.toString.call(val).replace(/^\[object\s+(\w+)\]$/, '$1')
    }

    // html转码
    safeHtml (val) {
        return safeHtml(val)
    }

    // 树形数据拉平
    flatTree (data, { key = 'id', children = 'children', dataMap = {}, dataList = [], each, parentKeys = [] } = {}) {
        for (let i = 0, item; item = data[i++];) {
            if (Object.prototype.toString.call(each) === '[object Function]') {
                item = each(item) || item
            }

            dataMap[item[key]] = {
                key: item[key],
                item,
                parentKeys: [...parentKeys]
            }
    
            dataList.push(item)
    
            if (item[children] && item[children].length) {
                this.flatTree(item[children], { key, children, dataMap, dataList, each, parentKeys: [...parentKeys, item[key]] })
            }
        }
    
        return { dataMap, dataList }
    }

    // 边界位置矫正
    positionAdjust (el) {
        const position = el.getBoundingClientRect()
        const winWidth = window.innerWidth
        const winHeight = window.innerHeight
        let left = position.left
        let top = position.top
        
        if (position.left + position.width > winWidth) {
            left = winWidth - position.width
        }

        if (position.left < 0) left = 0

        if (position.top < 0) top = 0

        if (position.top + position.height > winHeight) {
            top = winHeight - position.height
        }

        return { left, top }
    }

    // 获取Cookie
    getCookie (name) {
        const attrMap = document.cookie.split(';')
        const model = {}

        for (let attrStr of attrMap) {
            const attr = attrStr.trim()
            const index = [...attr].findIndex(item => item === '=')
            if (index !== -1) {
                model[attr.substring(0, index)] = attr.substring(index + 1)
            }
        }

        return name ? model[name] : model
    }

    // 做错误处理的JSON.parse
    parse (val, { defaultVal, errorFlag = 'Utils.parse error', error } = {}) {
        try {
            defaultVal = JSON.parse(val)
        } catch (e) {
            if (this.isFunction(error)) {
                error(e)
            } else {
                console.error(`[${errorFlag}] `, e)
            }
        }

        return defaultVal
    }

    // 取值方法
    getter (target, path = '') {
        path = (path + '').trim()
        if (!path) return target

        const paths = path.split('.')
        let currentModel = target

        for (let p of paths) {
            try {
                currentModel = currentModel[p]
            } catch (e) {
                currentModel = undefined
            }
            if (this.isUndefined(currentModel)) break
        }

        return currentModel
    }
}

export default new Utils()