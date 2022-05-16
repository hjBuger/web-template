import { safeHtml } from './install/sanitize-html.js'
class Utils {
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
    oType (val) {
        return Object.prototype.toString.call(val).replace(/^\[object\s+(\w+)\]$/, '$1')
    }

    safeHtml (val) {
        return safeHtml(val)
    }
}

export default new Utils()