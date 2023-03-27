function flatTree (data, { key = 'id', children = 'children', dataMap = {}, dataList = [], each, parentKeys = [] } = {}) {
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
            flatTree(item[children], { key, children, dataMap, dataList, each, parentKeys: [...parentKeys, item[key]] })
        }
    }

    return { dataMap, dataList }
}
