function* iterator(arr = [], children) {
	arr = [...arr]
	for (let item of arr) {
		yield item
		if (item && item[children] && item[children].length) {
			yield* iterator(item[children], children)
		}
	}
}

class TreeArray extends Array {
	constructor(arr, children = 'children') {
		super(...(arr || []))
		this.children = children
	}
	// 遍历器
	[Symbol.iterator] = function* () {
		yield* iterator(this, this.children)
	}
	// 获取父级，返回链式数据
	getParentChain (id) {}

	// 获取树形节点
	getTreeNode (id) {}

	// 模糊查询
	fuzzy (keyword) {}
}

export default TreeArray