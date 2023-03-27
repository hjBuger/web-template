<script>
    export default {
        props: {
            // 方向：right/left/bottom/top/rightBottom/rightTop/leftBottom/leftTop
            // left和top方向上的拖拽，需要绝对定位，并且设置相对于right和bottom
            direction: {
                type: String,
                default: 'rightBottom'
            },
            // 偏差值，设置偏差值的目的是为了保证拉伸结束后鼠标在容器里
            dis: {
                type: Number,
                default: 0
            },
            // 最小宽度
            minWidth: {
                type: Number,
                default: 0
            },
            // 最小高度
            minHeight: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                containerWidth: null,
                containerHeight: null
            }
        },
        methods: {
            // 创建拖拽元素
            createDragItem (h) {
                const directionMap = {
                    rightBottom: 'right-bottom',
                    rightTop: 'right-top',
                    leftBottom: 'left-bottom',
                    leftTop: 'left-top'
                }
                const side = directionMap[this.direction] || this.direction
                
                return this.createBar(side, h)
            },
            createBar (side, h) {
                const sideMap = {
                    left: 'setWidth',
                    right: 'setWidth',
                    top: 'setHeight',
                    bottom: 'setHeight'
                }
                const resizeFn = sideMap[side] || 'setSize'

                return h('div', { 
                    class: `simple-resize-drag simple-resize-drag_${side}`,
                    attrs: {
                        'resize-fn': resizeFn
                    },
                    ref: 'dragItem'
                })
            },
            // 创建内容主体
            createMainItem (h) {
                return h('div', {class: 'simple-resize-main', ref: 'main'}, this.$slots.default)
            },
            // 绑定拉伸事件
            resizeOn (el, target) {
                if (!el) return
                const downFn = ev => {
                    this.$emit('resize-start')
                    const height = target.offsetHeight
                    const width = target.offsetWidth
                    const disX = ev.clientX - el.offsetLeft
                    const disY = ev.clientY - el.offsetTop
                    const resizeFn = el.getAttribute('resize-fn')

                    const moveFn = ev1 => {
                        const L = ev1.clientX - disX
                        const T = ev1.clientY - disY

                        this[resizeFn](target, { height, width, L, T })
                    }

                    const upFn = () => {
                        document.removeEventListener('mousemove', moveFn, false)
                        document.removeEventListener('mouseup', upFn, false)
                        this.resizeEnd()
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
            resizeEnd () {
                this.$emit('resize-end', {
                    width: this.containerWidth,
                    height: this.containerHeight
                })
            },
            setWidth (target, { width, L }) {
                let result = /right/i.test(this.direction) ? L + this.dis : width - L + this.dis
                if (this.minWidth && result < this.minWidth) result = this.minWidth
                this.containerWidth = result
                target.style.width = `${result}px`
            },
            setHeight (target, { height, T }) {
                let result = /bottom/i.test(this.direction) ? T + this.dis : height - T + this.dis
                if (this.minHeight && result < this.minHeight) result = this.minHeight
                this.containerHeight = result
                target.style.height = `${result}px`
            },
            setSize (target, option) {
                this.setHeight(target, option)
                this.setWidth(target, option)
            },
            // 全屏和取消全屏会对外发出fullscreenchange事件，true-全屏/false-取消
            fullscreen (openFn) {
                const main = this.$refs.main
                if (main) {
                    this.bindFullscreen(main)
                    main.requestFullscreen()
                }
            },
            // 绑定全屏事件
            bindFullscreen (el) {
                if (el.fullscreenchange_fn) return
                el.fullscreenchange_fn = ev => {
                    this.$emit('fullscreenchange', document.fullscreenElement === el, ev)
                }
                el.addEventListener('fullscreenchange', el.fullscreenchange_fn)
                this.$once('hook:beforeDestroy', () => {
                    el.removeEventListener('fullscreenchange', el.fullscreenchange_fn)
                    el.fullscreenchange_fn = null
                })
            }
        },
        mounted () {
            this.$nextTick( function () {
                if (!this.$refs.dragItem || !this.$refs.resizeBox) return
                this.containerWidth = this.$refs.resizeBox.offsetWidth
                this.containerHeight = this.$refs.resizeBox.offsetHeight
                this.resizeOn(this.$refs.dragItem, this.$refs.resizeBox)
            })
        },
        render (h) {
            const dragItem = this.createDragItem(h)
            const mainItem = this.createMainItem(h)

            return h('div', { class: 'simple-resize-wrap', ref: 'resizeBox' }, [dragItem, mainItem])
        }
    }
</script>

<style lang="less">
    .simple-resize-wrap{
        position: relative;
        background: inherit;
        .simple-resize-main{
            position: relative;
            z-index: 10;
            width: 100%;
            height: 100%;
            background: inherit;
        }
        .simple-resize-drag_left{
            width: 6px;
            height: 50%;
            left: 0;
            top: 50%;
            transform: translate(-50%, -50%);
            cursor: e-resize;
        }
        .simple-resize-drag_right{
            width: 6px;
            height: 50%;
            right: 0;
            top: 50%;
            transform: translate(50%, -50%);
            cursor: e-resize;
        }
        .simple-resize-drag_top{
            width: 50%;
            height: 6px;
            left: 50%;
            top: 0;
            transform: translate(-50%, -50%);
            cursor: n-resize;
        }
        .simple-resize-drag_bottom{
            width: 50%;
            height: 6px;
            left: 50%;
            bottom: 0;
            transform: translate(-50%, 50%);
            cursor: n-resize;
        }
        .simple-resize-drag_left-top{
            width: 10px;
            height: 10px;
            left: 0;
            top: 0;
            cursor: nw-resize;
        }
        .simple-resize-drag_left-bottom{
            width: 10px;
            height: 10px;
            left: 0;
            bottom: 0;
            cursor: ne-resize;
        }
        .simple-resize-drag_right-top{
            width: 10px;
            height: 10px;
            right: 0;
            top: 0;
            cursor: ne-resize;
        }
        .simple-resize-drag_right-bottom{
            width: 10px;
            height: 10px;
            right: 0;
            bottom: 0;
            cursor: nw-resize;
        }
        .simple-resize-drag{
            position: absolute;
            z-index: 15;
            user-select: none;
            opacity: 0;
            pointer-events: none;
            background: rgba(0,0,0,.3);

            :hover{
                opacity: 1;
                pointer-events: auto;
            }
        }

        &:hover{
            .simple-resize-drag{
                opacity: 1;
                pointer-events: auto;
            }
        }
    }
</style>