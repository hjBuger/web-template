<script>
    import MarkItem from './mark-item.js'
    export default {
        components: {
            MarkItem
        },
        provide () {
            return {
                sapiSimpleMark: this
            }
        },
        props: {
            // 竖向-vertical, 横向-horizontal
            type: {
                type: String,
                default: 'vertical'
            },
            /**
             * 数据源data，以下是item的构造属性
             * 
             * data {object} 原始数据对象
             * label {string} 标题
             * value {string|number} 标记值, 如id
             * content {string} 内容
             * status {string|number} 状态值
             * statusName {string} 状态名称
             * statusColor {string} 状态颜色
             * 
             * labelStyle {object} 标题样式控制 { color: red }
             * icon {string|object} 图标，传字符串默认为类名控制的图标
             *  --img类型时,content支持:
             *      -- 图片路径
             *      -- 服务器储存对象{fileId: '', filePath: '', ...}
             *      -- base64
             *  {
             *      type: 'icon', // icon、text、img
	         *      content: 'el-icon-monitor'
             *  }
             * iconStyle {object} 图标容器样式控制 { borderRadius: '4px' }
             * lineColor {string} 线条颜色
             * lineType {string} 线条类型：solid-实线、dotted-点线、dashed-虚线
             * lineVisible {boolean} 线条显示
             * dotSize {number} mark点尺寸
             * clickable {boolean} 是否可点击
             * clickFn {function} 独立的点击方法
             * 
            */
            data: {
                type: Array,
                default () {
                    return []
                }
            },
            // 标题
            title: {
                type: String,
                default: ''
            },
            // 内容区显示类型：正常显示-normal、tip显示-tip
            contentShowType: {
                type: String,
                default: 'normal'
            },
            // type为vertical时有效，用来限制高度，生成滚动
            height: {
                type: [String, Number],
                default: ''
            },
            // 显示状态栏
            showStatusBar: {
                type: Boolean,
                default: false
            },
            // 状态栏的显示位置控制
            statusBarReverse: {
                type: Boolean,
                default: false
            },
            // 两点间间隙, type为horizontal为固定间距，type为vertical为最小间距
            gap: {
                type: Number,
                default: 100
            },
            // 标题样式控制
            labelStyle: {
                type: Object,
                default: null
            },
            // 全局图标
            icon: {
                type: [String, Object],
                default: ''
            },
            // 图标容器样式控制
            iconStyle: {
                type: Object,
                default: null
            },
            // 线条颜色
            lineColor: {
                type: String,
                default: '#909399'
            },
            // 线条颜色继承状态颜色
            lineColorInherit: {
                type: Boolean,
                default: false
            },
            // solid-实线、dotted-点线、dashed-虚线
            lineType: {
                type: String,
                default: 'solid'
            },
            // 线条宽度
            lineWidth: {
                type: Number,
                default: 2
            },
            // 线条显示
            lineVisible: {
                type: Boolean,
                default: true
            },
            // mark点尺寸
            dotSize: {
                type: Number,
                default: 16
            },
            // clickable 可点击
            clickable: {
                type: Boolean,
                default: true
            },
            // 可点击项标题的控制类名
            clickableClass: {
                type: String,
                default: ''
            },
            /** 
             * 状态匹配数据
             * {
             *      statusName: '未开始',
             *      status: '1', // 支持多状态值: 1或1,2,3或[1,2,3]
             *      statusColor: 'red'
             * 
             *      labelStyle {object} 标题样式控制 { color: red }
             *      icon {string|object} 图标，传字符串默认为类名控制的图标
             *          --img类型时,content支持:
             *          -- 图片路径
             *          -- 服务器储存对象{fileId: '', filePath: '', ...}
             *          -- base64
             *          {
             *              type: 'icon', // icon、text、img
	         *              content: 'el-icon-monitor'
             *          }
             *      iconStyle {object} 图标容器样式控制 { borderRadius: '4px' }
             *      lineColor {string} 线条颜色
             *      lineType {string} 线条类型：solid-实线、dotted-点线、dashed-虚线
             *      dotSize mark点尺寸,
             *      clickable false
             *      clickFn {function} 独立的点击方法
             *      visible 是否在状态栏显示，不配置默认显示，配置为false则不显示
             *      lineVisible {boolean} 线条显示
             * }
             */
            statusMap: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        data () {
            return {
                maxDotSize: 0
            }
        },
        computed: {
            itemGap () {
                return this.gap + this.maxDotSize
            },
            scroll () {
                return this.type === 'vertical' && !!this.height || this.type === 'horizontal'
            },
            contentStyle () {
                const style = {}
                if (this.type === 'vertical' && this.height) {
                    style.height = /px|%|em|rem|pt|vh|calc/.test(this.height) ? this.height : this.height + 'px'
                }
                return style
            },
            // 默认作用域插槽作为模板
            renderTemplate () {
                return this.$scopedSlots.default || null
            },
            // 状态栏数据项
            statusBarOptions () {
                return this.statusMap.filter(item => {
                    return item.hasOwnProperty('visible') ? item.visible : true
                }).map(item => {
                    const iconStyle = this.getIconStyle(item)
                    return {
                        ...item,
                        createIcon: (h) => this.createIcon(h, item.icon, iconStyle)
                    }
                })
            },
            // 是否水平
            horizontal () {
                return this.sapiSimpleMark.type === 'horizontal'
            }
        },
        methods: {
            // 获取状态设置
            getStatus (val) {
                return this.statusMap.find(item => this.checkIncludes(item.value, val)) || {
                    label: null,
                    value: null,
                    color: null,
                    icon: null,
                    iconStyle: null,
                    dotSize: null
                }
            },
            // 检测包含
            checkIncludes (list, val) {
                if (this.$utils.isString(list)) list = list.split(',')
                if (this.$utils.isNumber(list)) list = [list]
                const listMap = list.reduce((rs, item) => {
                    rs[item] = true
                    return rs
                }, {})
                return !!listMap[val]
            },
            // 设置最大点尺寸
            setMaxDotSize (val) {
                this.maxDotSize = Math.max(this.maxDotSize, val)
            },
            // 生成内容
            createContent (h) {
                const mark = this.createMark(h)
                const content = this.scroll ? [<el-scrollbar class="el-scrollbar_style-handle"><div class="sapi-status-mark_content-wrap">{mark}</div></el-scrollbar>] : mark
                const contentItem = <div class="sapi-status-mark_content">{content}</div>
                return mark.length ? [contentItem] : []
            },
            // 生成标记item
            createMark (h) {
                return (this.data || []).map((item, index) => <mark-item item={item} index={index} key={item.value}></mark-item>)
            },
            // 生成头部
            createHeader (h) {
                const header = []
                if (this.title) {
                    header.push(<div class="sapi-status-mark_title">{this.title}</div>)
                }
                if (this.showStatusBar && this.statusBarOptions.length || this.$scopedSlots.statusBarPrefix || this.$scopedSlots.statusBarSuffix) {
                    const style = {}
                    if (this.statusBarReverse) style.justifyContent = 'flex-end'
                    const StatusBarContent = !this.showStatusBar || !this.statusBarOptions.length ? '' : (
                        <div class="sapi-status-mark_statusBar-content">
                            {
                                (this.statusBarOptions || []).map(option => (
                                    <div class="sapi-status-mark_statusBar-item">
                                        {option.createIcon(h)}
                                        <div class="sapi-status-mark_statusBar-item-label">{option.label}</div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                    const StatusBarPrefix = !this.$scopedSlots.statusBarPrefix ? '' : (
                        <div class="sapi-status-mark_statusBar-prefix">{this.$scopedSlots.statusBarPrefix()}</div>
                    )
                    const StatusBarSuffix = !this.$scopedSlots.statusBarSuffix ? '' : (
                        <div class="sapi-status-mark_statusBar-suffix">{this.$scopedSlots.statusBarSuffix()}</div>
                    )
                    header.push(
                        <div class="sapi-status-mark_statusBar" style={style}>
                            {StatusBarPrefix}
                            {StatusBarContent}
                            {StatusBarSuffix}
                        </div>
                    )
                }
                const headerItem = <div class="sapi-status-mark_header">{header}</div>

                return header.length ? [headerItem] : []
            },
            // 获取icon
            getIcon (h, icon) {
                if (this.$utils.isString(icon)) {
                    return <i class={icon}></i>
                }
                if (this.$utils.isObject(icon)) {
                    if (icon.type === 'icon') return <i class={icon.content}></i>
                    if (icon.type === 'text') return <i class="sapi-status-mark_item-mark-text">{icon.content}</i>
                    if (icon.type === 'img') {
                        if (this.$utils.isString(icon.content)) return <img src={icon.content}></img>
                        if (this.$utils.isObject(icon.content)) return <img src={this.getImgUrl(icon.content)}></img>
                    }
                }
                return []
            },
            // 获取文件服务地址
            getImgUrl (file) {
                const path = file.thumbPath || file.filePath || file.relativePath
                const hasHttp = new RegExp(`^(http://|https://|${this.$webConfig.filePreviewPath}/)`).test(path)
                return hasHttp ? path : this.$webConfig.filePreviewPath.replace(/(\/)+$/, '') + '/' + path.replace(/^(\/)+/, '')
            },
            // 生成icon
            createIcon (h, icon, style, createContent) {
                const IconHolder = this.getIcon(h, icon)
                // icon渲染
                const ItemIcon = (
                    <div class="sapi-status-mark_item-mark-inner">
                        {IconHolder}
                    </div>
                )
                if (createContent) {
                    const content = createContent(h, true)
                    if (content) {
                        style.cursor = 'help'
                        return (
                            <div class="sapi-status-mark_item-mark" style={style}>
                                <el-tooltip placement="right" effect="light" popper-class="sapi-status-mark_tip">
                                    <div slot="content">{content}</div>
                                    {ItemIcon}
                                </el-tooltip>
                            </div>
                        )
                    }
                }
                return (
                    <div class="sapi-status-mark_item-mark" style={style}>
                        {ItemIcon}
                    </div>
                )
            },
            // 获取状态栏icon样式
            getIconStyle (status) {
                const style = {
                    ...(this.iconStyle || {}),
                    ...(status.iconStyle || {}),
                    width: (status.dotSize || this.dotSize) + 'px',
                    height:(status.dotSize || this.dotSize) + 'px',
                    background: status.color
                }
                return style
            }
        },
        render (h) {
            const header = this.createHeader(h)
            const content = this.createContent(h)
            return (
                <div class={`sapi-status-mark sapi-status-mark_${this.type}`} style={this.contentStyle}>
                    {header}
                    {content}
                </div>
            )
        }
    }
</script>
<style lang="less">
    .sapi-status-mark{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .sapi-status-mark_header{
            width: 100%;
            flex-shrink: 0;
            margin-bottom: 25px;
        }
        .sapi-status-mark_title{
            width: 100%;
            font-size: 20px;
            line-height: 24px;
            overflow: hidden;
            margin-bottom: 10px;
        }
        .sapi-status-mark_statusBar{
            width: 100%;
            display: flex;
            color: #999999;
            font-size: 12px;
            align-content: center;
        }
        .sapi-status-mark_statusBar-prefix,
        .sapi-status-mark_statusBar-suffix{
            flex-shrink: 0;
        }
        .sapi-status-mark_statusBar-prefix{
            & + .sapi-status-mark_statusBar-content,
            & + .sapi-status-mark_statusBar-suffix{
                margin-left: 15px;
            }
        }
        .sapi-status-mark_statusBar-content{
            display: flex;
            & + .sapi-status-mark_statusBar-suffix{
                margin-left: 15px;
            }
        }
        .sapi-status-mark_statusBar-item{
            display: flex;
            align-items: center;
            user-select: none;
            overflow: hidden;
            .sapi-status-mark_item-mark{
                position: relative;
                top: 0;
                left: 0;
            }
            .sapi-status-mark_statusBar-item-status{
                width: 12px;
                height: 12px;
                border-radius: 50%;
            }
            .sapi-status-mark_statusBar-item-label{
                margin-left: 4px;
            }
            & + .sapi-status-mark_statusBar-item{
                margin-left: 15px;
            }
        }
        .sapi-status-mark_content{
            max-width: 100%;
            flex: auto;
            overflow: hidden;
        }
        .sapi-status-mark_item{
            width: 100%;
            box-sizing: border-box;
            position: relative;
            padding-bottom: 20px;
            padding-right: 10px;
            // overflow: hidden;
            &:last-of-type{
                .sapi-status-mark_item-line{
                    display: none;
                }
            }
        }
        .sapi-status-mark_item-mark,
        .sapi-status-mark_item-line{
            position: absolute;
            top: 0;
            left: 0;
        }
        .sapi-status-mark_item-mark{
            z-index: 10;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: #ffffff;
            overflow: hidden;
            *{
                font-style: normal;
            }
        }
        .sapi-status-mark_item-mark-inner{
            width: 100%;
            height: 100%;
            transform: scale(0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            & > img{
                max-width: 100%;
                max-height: 100%;
                object-fit: cover;
                display: block;
                background: none;
                border: none;
                outline: none;
                user-select: none;
                margin: 0 auto;
            }
        }
        .sapi-status-mark_item-label,
        .sapi-status-mark_item-content,
        .sapi-status-mark_item-options{
            width: 100%;
            font-size: 14px;
        }
        .sapi-status-mark_item-label{
            color: #303133;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: keep-all;
            white-space: nowrap;
            user-select: none;
        }

        .sapi-status-mark_item-content{
            margin-top: 10px;
            color: #909399;
            line-height: 18px;
        }

        .sapi-status-mark_item-options{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            color: #909399;
            margin-top: 10px;
            line-height: 18px;
        }
        .sapi-status-mark_item-line{
            z-index: 5;
            height: 100%;
            background: #909399;
            transform: translateX(-50%);
        }
        &.sapi-status-mark_vertical{

        }
        &.sapi-status-mark_horizontal{
            width: 100%;
            .sapi-status-mark_content-wrap{
                display: flex;
                flex-flow: nowrap;
                flex-direction: row;
                padding-bottom: 18px;
            }
            .sapi-status-mark_item{
                display: flex;
                flex-direction: row;
                flex-shrink: 0;
                width: auto;
            }
            .sapi-status-mark_item-label{
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-flow: wrap;
                flex-shrink: 0;
                flex-direction: column;
                margin-right: 10px;
            }
            .sapi-status-mark_content-block{
                flex: auto;
                max-width: 100%;
                overflow: hidden;
            }
            .sapi-status-mark_item-content{
                margin-top: 0;
                max-width: 100%;
                overflow: hidden;
                *{
                    word-break: break-word;
                    white-space: normal;
                }
            }
            .sapi-status-mark_item-line{
                width: 100%;
            }
        }
    }
    .el-tooltip__popper.sapi-status-mark_tip{
        max-width: 300px;
        line-height: 18px;
        color: #909399;
        font-size: 14px;
    }
</style>
