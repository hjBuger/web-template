<template>
    <div class="home">
		<!-- <sapi-sort-list v-model="list" :use-drag-handle="false" drag-icon="el-icon-menu" :border="true" @sort-end="sortEnd">
			<sapi-sort-row
				v-for="(item, index) in list"
				:index="index"
				:key="index"
				:item="item"
			>
				{{item.value}}
			</sapi-sort-row>
		</sapi-sort-list> -->
		首页
    </div>
</template>

<script>
import VCT from '@/static/js/vmConstructor'
export default {
	name: 'Home',
	components: {},
	data() {
		return {
			list: [
				{id: 1, value: 1},
				{id: 2, value: 2},
				{id: 3, value: 3},
				{id: 4, value: 4},
				{id: 5, value: 5},
				{id: 6, value: 6}
			],
			params: {},
			testText: ''
		}
	},
	created () {
		this.VCT = new VCT()
		console.log('VCT: ', this.VCT)
	}
}
</script>
<style lang="less">

</style>
