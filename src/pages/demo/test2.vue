<template>
    <div>
        <three-trans>
            <three-trans-item :class="'trans-item-' + index" v-for="(item, index) in realList" :key="item.id" :img="item.img"></three-trans-item>
        </three-trans>
        <el-button @click="prev">prev</el-button>
        <el-button @click="next">next</el-button>
    </div>
</template>
<script>
    import ThreeTrans from '@/components/three-trans'
    import ThreeTransItem from '@/components/three-trans/item'

    export default {
        menuLabel: '测试2',
        components: {
            ThreeTrans,
            ThreeTransItem
        },
        data () {
            return {
                list: Array.from({length: 8}).map((item, i) => ({
                    id: i,
                    img: () => import(`../../static/images/test${i+1}.jpg`)
                })),
                index: 0
            }
        },
        computed: {
            realList () {
                const current = this.list[this.index]
                const prevIndex = this.index - 1 >= 0 ? this.index - 1 : this.list.length - 1
                const prev = this.list[prevIndex]
                const nextIndex1 = (this.index + 1) % 8
                const nextIndex2 = (this.index + 2) % 8
                const next1 = this.list[nextIndex1]
                const next2 = this.list[nextIndex2]

                return [prev, current, next1, next2]
            }
        },
        methods: {
            prev () {
                this.index = this.index - 1 >= 0 ? this.index - 1 : this.list.length - 1
            },
            next () {
                this.index = (this.index + 1) % 8
            }
        }
    }
</script>
