export default {
    inject: ['sapiSimpleMark'],
    props: {
        item: {
            type: Object,
            default () {
                return {}
            }
        },
        index: {
            type: Number
        }
    },
    computed: {
        // 匹配的状态
        status () {
            return this.sapiSimpleMark.getStatus(this.item.status)
        },
        // 是否水平
        horizontal () {
            return this.sapiSimpleMark.type === 'horizontal'
        },
        contentShowType () {
            return this.sapiSimpleMark.contentShowType
        },
        // mark尺寸
        dotSize () {
            return this.item.dotSize || this.status.dotSize || this.sapiSimpleMark.dotSize
        },
        // mark最大尺寸
        maxDotSize () {
            return this.sapiSimpleMark.maxDotSize
        },
        // 包裹层样式控制
        wrapStyle () {
            return {
                [this.horizontal ? 'paddingTop' : 'paddingLeft']: (this.maxDotSize + 12) + 'px',
                [this.horizontal ? 'width' : 'minHeight']: this.sapiSimpleMark.itemGap + 'px'
            }
        },
        // label样式控制
        labelStyle () {
            const outSideStyle = {
                ...(this.sapiSimpleMark.labelStyle || {}),
                ...(this.status.labelStyle || {}),
                ...(this.item.labelStyle || {})
            }
            const style = {
                lineHeight: this.dotSize + 'px',
            }
            if (this.item.clickable) {
                style.cursor = 'pointer'
            }
            if (this.horizontal) {
                style.width = this.maxDotSize + 'px'
                style.lineHeight = null
            }
            return {
                ...style,
                ...outSideStyle
            }
        },
        // 偏移量
        deviation () {
            return (this.maxDotSize - this.dotSize) / 2
        },
        //  mark背景色
        statusColor () {
            return this.item.statusColor || this.status.color
        },
        // icon样式配置
        iconStyle () {
            return {
                ...(this.sapiSimpleMark.iconStyle || {}),
                ...(this.status.iconStyle || {}),
                ...(this.item.iconStyle || {})
            }
        },
        // icon样式控制
        itemIconStyle () {
            const style = {
                ...(this.iconStyle || {}),
                left: this.deviation + 'px',
                width: this.dotSize + 'px',
                height: this.dotSize + 'px',
                background: this.statusColor
            }
            if (this.horizontal) {
                style.top = this.deviation + 'px'
            }
            return style
        },
        // 线条颜色
        lineColor () {
            return this.item.lineColor || this.status.lineColor || (this.sapiSimpleMark.lineColorInherit ? this.statusColor : this.sapiSimpleMark.lineColor)
        },
        // 线条显示
        lineVisible () {
            return this.item.hasOwnProperty('lineVisible') ? this.item.lineVisible : this.status.hasOwnProperty('lineVisible') ?  this.status.lineVisible : this.sapiSimpleMark.lineVisible
        },
        // 线条样式控制
        lineStyle () {
            const lineColor = this.lineColor
            const lineType = this.item.lineType || this.status.lineType || this.sapiSimpleMark.lineType
            const direction = this.horizontal ? 'right' : 'bottom'
            const style = {
                left: Math.round(this.dotSize / 2 + this.deviation) + 'px',
                transform: `translate${this.horizontal ? 'Y' : 'X'}(-${Math.round(this.sapiSimpleMark.lineWidth / 2)}px)`,
                [this.horizontal ? 'height' : 'width']: this.sapiSimpleMark.lineWidth + 'px'
            }

            if (this.horizontal) {
                style.left = Math.round(this.maxDotSize / 2) + 'px'
                style.top = Math.round(this.dotSize / 2 + this.deviation) + 'px'
            }

            if (lineColor) {
                style.background = lineColor
            }

            if (lineType) {
                const lineTypeMap = {
                    solid: `${lineColor}`,
                    dashed: `repeating-linear-gradient(to ${direction}, transparent 0px, transparent 5px, ${lineColor} 5px, ${lineColor} 10px)`,
                    dotted: `repeating-linear-gradient(to ${direction}, transparent 0px, transparent 2px, ${lineColor} 2px, ${lineColor} 4px)`,
                }
                if (lineTypeMap[lineType]) style.background = lineTypeMap[lineType]
            }
            return style
        },
        // 内容处理
        content () {
            if (this.$utils.isEmpty(this.item.content)) return ''
            return this.$utils.safeHtml(this.item.content)
        },
        // 是否可点击
        clickable () {
            return this.item.hasOwnProperty('clickable') ? this.item.clickable : this.status.hasOwnProperty('clickable') ?  this.status.clickable : this.sapiSimpleMark.clickable
        },
        // 点击方法
        clickFn () {
            return this.item.hasOwnProperty('clickFn') ? this.item.clickFn : this.status.hasOwnProperty('clickFn') ?  this.status.clickFn : null
        },
        // 图标
        icon () {
            return this.item.icon || this.status.icon || this.sapiSimpleMark.icon || ''
        }
    },
    methods: {
        // 点击事件
        itemClick () {
            if (!this.clickable) return
            if (this.clickFn && this.$utils.isFunction(this.clickFn)) {
                return this.clickFn(this.item)
            }
            this.sapiSimpleMark.$emit('item-click', this.item)
        },
        createContent (h, tipTemplate) {
            if (this.contentShowType === 'tip' && !tipTemplate || !!this.sapiSimpleMark.renderTemplate && !this.content) return ''
            return (
                <div class="sapi-simple-mark_item-content">
                    {this.sapiSimpleMark.renderTemplate ? this.sapiSimpleMark.renderTemplate({ item: this.item, data: this.item.data || {}, $index: this.index }) : this.content}
                </div>
            )
        },
        createLabel (h) {
            const realStyle = {
                ...this.labelStyle
            }
            const className = `sapi-simple-mark_item-label ${this.clickable && this.sapiSimpleMark.clickableClass ? this.sapiSimpleMark.clickableClass : ''}`
            const content = !this.horizontal ? this.item.label : (this.item.label.split('') || []).map(text => <div>{text}</div>)

            return <div class={className} style={realStyle} onClick={this.itemClick}>{content}</div>
        },
        createOptions (h) {
            if (!this.item.options || !this.item.options.length) return ''
            return (
                <div class="sapi-simple-mark_item-options">
                    {
                        (this.item.options || []).map(option => (
                            <div class="sapi-simple-mark_item-options-item">{option.label ? `${option.label}：` : ''}{option.value}</div>
                        ))
                    }
                </div>
            )
        },
        createLine (h) {
            if (!this.lineVisible) return ''
            return <div class="sapi-simple-mark_item-line" style={this.lineStyle}></div>
        }
    },
    created () {
        this.sapiSimpleMark.setMaxDotSize(this.dotSize)
    },
    render (h) {
        // icon渲染
        const IconHolder = this.sapiSimpleMark.createIcon(h, this.icon, this.itemIconStyle, this.contentShowType === 'tip' ? this.createContent : null)
        // label渲染
        const ItemLabel = this.createLabel(h)
        // 内容渲染
        const ItemContent = this.createContent(h)
        // 其他渲染数据
        const ItemOptions = this.createOptions(h)
        // 
        const ItemLine = this.createLine(h)

        return (
            <div class="sapi-simple-mark_item" style={this.wrapStyle}>
                {IconHolder}
                {ItemLabel}
                <div class="sapi-simple-mark_content-block">
                    {ItemContent}
                    {ItemOptions}
                </div>
                {ItemLine}
            </div>
        )
    }
}