class Utils {
    getDataByKeyValue (keyValue, list, { keyField = 'id', childrenField = 'children' } = {}) {
        if (!list || !list.length) return
        let current = undefined
        for (let item of list) {
            if (item[keyField] === keyValue) {
                current = item
                break
            }
            if (item[childrenField] && item[childrenField].length) {
                current = this.getDataByKeyValue(keyValue, item[childrenField], { keyField, childrenField })
                if (current) break
            }
        }
        return current
    }

    isEmpty (val, includeEmptyString = true) {
        const emptyList = [null, undefined, NaN]
        if (includeEmptyString) emptyList.push('')
        return emptyList.some(item => Object.is(item, val))
    }
}

export default new Utils()