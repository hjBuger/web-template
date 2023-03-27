<script>
export default {
    props: {
        // 通过配置预留扩展
        origin: {
            type: String,
            default: 'bottom'
        }
    },
    data () {
        return {
            // 通过配置预留扩展
            originMap: {
                bottom: 'fixedBottom'
            }
        }
    },
    methods: {
        resizeOn (el, target) {
            const downFn = ev => {
                const height = target.offsetHeight
                const width = target.offsetWidth
                const disX = ev.clientX - el.offsetLeft
                const disY = ev.clientY - el.offsetTop

                const moveFn = ev1 => {
                    const L = ev1.clientX - disX
                    const T = ev1.clientY - disY

                    this[this.originMap[this.origin]](target, { height, width, L, T })
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
        // 固定bottom的处理方法
        fixedBottom (target, { height, T }) {
            target.style.height = (height - T) + 'px'
        }
    },
    mounted () {
        this.$nextTick( function () {
            this.resizeOn(this.$refs.verticalDragItem, this.$refs.resizeBox)
        })
    },
    render (h) {
        const positionMap = {
            bottom: ['top', 'lef']
        }
        const position = positionMap[this.origin] || ['top', 'lef']
        const verticalDragItem = h('div', {
            style:{
                [position[0]]: 0,
                [position[1]]: 0,
                transform: `translateY(${position[0] === 'top' ? '-' : ''}50%)`
            },
            class: 'vertical-drag-item',
            ref: 'verticalDragItem'
        })

        return h('div', { class: 'resize-box', ref: 'resizeBox'}, [verticalDragItem, this.$slots.default])
    }
}
</script>

<style lang="less">
    .resize-box{
        width: 100%;
        height: 100px;
        border: 1px solid red;
        position: absolute;
        bottom: 0;

        .vertical-drag-item{
            width: 100%;
            height: 5px;
            position: absolute;
            cursor: row-resize;
            background: rgba(0,0,0,.3);
        }
    }
</style>