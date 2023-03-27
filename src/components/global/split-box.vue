<template>
    <div class="three-split-box">
        <div
            v-for="type in renderList"
            :key="type"
            class="three-split-box_item"
            v-show="realList.includes(type)" 
            :style="itemStyle[type]"
            :ref="type + 'Item'"
        >
            <div
                class="three-split-box_item-bar"
                :item-type="type"
                v-show="checkBarShow(type)"
            ></div>
            <div class="three-split-box_item-content">
               <slot :name="type + '-place'"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        list: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data() {
        return {
            renderList: ['vue', 'js', 'css'],
            itemSize: {
                vue: 0,
                js: 0,
                css: 0
            }
        }
    },
    computed: {
        realList () {
            return this.renderList.filter(item => this.list.includes(item))
        },
        itemStyle () {
            return {
                vue: this.vueStyle,
                js: this.jsStyle,
                css: this.cssStyle
            }
        },
        vueStyle () {
            return {
                width: /px|%/.test(this.itemSize.vue) ? this.itemSize.vue : parseInt(this.itemSize.vue) + 'px'
            } 
        },
        jsStyle () {
            return {
                width: /px|%/.test(this.itemSize.js) ? this.itemSize.js : parseInt(this.itemSize.js) + 'px'
            } 
        },
        cssStyle () {
            return {
                width: /px|%/.test(this.itemSize.css) ? this.itemSize.css : parseInt(this.itemSize.css) + 'px'
            } 
        }
    },
    watch: {
        list (val) {
            this.resetPlace()
        }
    },
    methods: {
        checkBarShow (type) {
            return !!this.realList.findIndex(item => item === type)
        },
        resetPlace () {
            this.realList.forEach(type => {
                this.itemSize[type] = (1 / this.realList.length * 100) + '%'
            })
        },
        bindResize () {
            const itemBars = document.querySelectorAll('.three-split-box_item-bar')
            const bars = Array.from(itemBars)
            bars.forEach(bar => {
                const type = bar.getAttribute('item-type')
                this.resizeOn(bar, type)
            })
        },
        resizeOn (el, type) {
            const downFn = ev => {
                const index = this.realList.findIndex(item => item === type)
                const preType = this.realList[index - 1]
                const preWidth = this.$refs[`${preType}Item`][0].offsetWidth
                const width = this.$refs[`${type}Item`][0].offsetWidth
                const disX = ev.clientX - el.offsetLeft

                const moveFn = ev1 => {
                    const L = ev1.clientX - disX
                    this.setItemSize(preType, preWidth, type, width, L)
                }

                const upFn = () => {
                    document.removeEventListener('mousemove', moveFn, false)
                    document.removeEventListener('mouseup', upFn, false)
                }

                document.addEventListener('mousemove', moveFn, false)
                document.addEventListener('mouseup', upFn, false)

                return false;
            }

            el.addEventListener('mousedown', downFn, false)

            this.$once('hook:beforeDestroy', () => {
                el.removeEventListener('mousedown', downFn, false)
            })
        },
        setItemSize(preType, preWidth, type, width, L) {
            this.itemSize[preType] = preWidth + L
            this.itemSize[type] = width - L
        }
    },
    mounted () {
        this.$nextTick(function () {
            this.resetPlace()
            this.bindResize()
        })
    }
}
</script>

<style lang="less">
    .three-split-box{
        display: flex;
        width: 100%;
        height: 100%;
        overflow: hidden;
        flex-wrap: nowrap;

        .three-split-box_item{
            box-sizing: border-box;
            padding: 0 3px;
            height: 100%;
            position: relative;
        }
        .three-split-box_item-bar{
            height: 100%;
            width: 6px;
            position: absolute;
            left: 0;
            top: 0;
            cursor: col-resize;
            background: rgba(0,0,0,.4);
            transform: translateX(-50%);
        }
        .three-split-box_item-content{
            height: 100%;
            width: 100%;
            background: yellowgreen;
        }
    }
</style>>