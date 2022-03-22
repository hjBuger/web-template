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
    oType (val) {
        return Object.prototype.toString.call(val).replace(/^\[object\s+(\w+)\]$/, '$1')
    }
}

export default new Utils()