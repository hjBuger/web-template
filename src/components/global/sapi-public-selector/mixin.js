export default {
    props: {
        // 绑定值
        value: {
            type: [String, Array, Number],
            default: ''
        },
        // 选中值的对象数组
        // 在懒加载的情况下，如果数据未加载又已选中(即初始化列表不存在已选中数据),则会匹配这个对象获取相应数据
        // 可为一般数组、树形数组，要求字段跟props对应
        valueOption: {
            type: Array,
            default () {
                return []
            }
        },
        // 渲染数据
        data: {
            type: Array,
            default () {
                return []
            }
        },
        // 占位
        placeholder: {
            type: String,
            default: '请选择'
        },
        // 架构标题, 如不配置，则隐藏
        subTitle: {
            type: String,
            default: '数据列表'
        },
        // 字段配置
        props: {
            type: Object,
            default () {
                return {}
            }
        },
        // 弹出组件配置
        popoverOptions: {
            type: Object,
            default () {
                return {}
            }
        },
        // 是否可清除
        clearable: {
            type: Boolean,
            default: true
        },
        // 组件禁用
        disabled: {
            type: Boolean,
            default: false
        },
        // item禁选方法, item => true
        itemDisabled: {
            type: Function
        },
        // 自定义模板: (item) => html
        contentRender: {
            type: Function
        },
        // 渲染完成自动选择第一个数据节点，如果第一个节点禁选则无效
        autoSelectFirst: {
            type: Boolean,
            default: false
        },
        // 公共的存储localStorage, sessionStorage(多选无效)
        storage: {
            type: String,
            default: 'localStorage'
        },
        // 存储作用域：page：页面公用储存（与路由挂钩）、web：网站公用储存(多选无效)
        storageScope: {
            type: String,
            default: 'web'
        },
        // 保存Storage的key值, 公用组件，不设默认，需要传入私有的key值，否则不储存(多选无效)
        storageKey: {
            type: String,
            default: ''
        },
        // 显示历史选择数量( <= 储存历史选择数量 )(多选无效)
        showStorageCount: {
            type: [Number, String],
            default: 3
        },
        // 储存历史选择数量(多选无效)
        storageCount: {
            type: [Number, String],
            default: 10
        },
        // 渲染完成自动选择第一个历史数据
        autoSelectHistory: {
            type: Boolean,
            default: false
        },
        // 退出登录是否清楚缓存数据(多选无效)
        signOutClear: {
            type: Boolean,
            default: true
        },
        // 是否树形
        tree: {
            type: Boolean,
            default: true
        },
        // 是否懒加载
        lazy: {
            type: Boolean,
            default: false
        },
        // 懒加载时必需配置
        lazyLoad: {
            type: Function
        },
        // 全部展开，只用于非懒加载
        expandAll: {
            type: Boolean,
            default: false
        },
        // 展开到层级，只用于非懒加载
        expandLevel: {
            type: [String, Number],
            default: 1
        },
        // 点击label节点时是否展示/收缩子节点，默认false
        expandWithClick: {
            type: Boolean,
            default: false
        },
        // 树形缩进
        indent: {
            type: [String, Number],
            default: 16
        },
        // 有子级是否能选中
        activeHasChild: {
            type: Boolean,
            default: true
        },
        // 是否多选
        multiple: {
            type: Boolean,
            default: false
        },
        // 是否显示勾选框
        showCheckbox: {
            type: Boolean,
            default: false
        },
        // 多选数量限制
        count: {
            type: [Number, String],
            default: 0
        },
        // 多选时合并label
        collapseTags: {
            type: Boolean,
            default: true
        },
        // 合并label是否显示tooltip
        collapseShowTooltip: {
            type: Boolean,
            default: true
        },
        // tooltip配置
        tooltipOptions: {
            type: Object,
            default () {
                return {}
            }
        },
        // 是否可搜索
        filterable: {
            type: Boolean,
            default: true
        },
        // 搜索触发方式, input(输入触发)、enter(enter触发)、all(两种触发)
        filterTrigger: {
            type: String,
            default: 'all'
        },
        // 搜索占位文本
        filterPlaceholder: {
            type: String,
            default: '请输入关键字搜索'
        },
        // 是否远程搜索
        remote: {
            type: Boolean,
            default: false
        },
        /**
         * 远程搜索方法(远程搜索必须)
         * @params { String } searchValue: 关键字
         * @params { Function } resolve: 回调方法
         * (searchValue, resolve) => resolve([])
         * */
        remoteMethod: {
            type: Function
        },
        // 远程搜索展示loading
        loading: {
            type: Boolean,
            default: false
        },
        // element的loading配置参数text、spinner、background、customClass
        loadingConfig: {
            type: Object,
            default () {
                return {}
            }
        },
        // 分页,树形不支持分页
        total: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 0
        },
        pageNum: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            // 默认参数配置
            defaultProps: {
                itemId: 'itemId',
                itemName: 'itemName',
                children: 'children',
                disabled: 'disabled',
                hasChild: 'hasChild',
                parentItemId: 'parentItemId',
                parentItemName: 'parentItemName',
                // 分组字段，树形只会给第一级分组，如果整体配置分组，数据又不传分组字段，则被分配到其他（other）
                itemGroupId: 'itemGroupId',
                itemGroupName: 'itemGroupName'
            },
            // Popover默认配置
            defaultPopoverOptions: {
                width: 300,
                trigger: 'click',
                placement: 'bottom-start',
                popperClass: '',
                arrowOffset: 35
            },
            // Loading默认配置
            defaultLoadingConfig: {
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.2)',
                customClass: ''
            },
            // Tooltip默认配置
            defaultTooltipOptions: {
                contentWidth: 200,
                contentMaxHeight: 300,
                effect: 'light',
                popperClassName: ''
            }
        }
    },
    computed: {
        realProps () {
            return {
                ...this.defaultProps,
                ...(this.props || {})
            }
        },
        realPopoverOptions () {
            const popoverOptions = this.popoverOptions || {}
            return {
                ...this.defaultPopoverOptions,
                ...popoverOptions,
                popperClass: `sapi-public-selector_popover ${popoverOptions.popperClass ? `${popoverOptions.popperClass}` : ''}`
            }
        },
        realLoadingConfig () {
            return {
                ...this.defaultLoadingConfig,
                ...(this.loadingConfig || {})
            }
        },
        realTooltipOptions () {
            return {
                ...this.defaultTooltipOptions,
                ...(this.tooltipOptions || {})
            }
        }
    },
    methods: {
        /** *
        * 派发事件
        * @params { String } eventName: 事件名称
        * @params { Any } payload: 负载
        * change：选择改变事件, 树形多选并且懒加载只会传出当前选中的节点数据
        * clear：清空事件
        * item-click：item点击事件, 只要点击就会触发
        * show：popover显示时触发
        * after-enter：popover显示动画播放完毕后触发
        * hide：popover隐藏时触发
        * after-leave：popover隐藏动画播放完毕后触发
        * **/
        dispatchEvent (eventName, payload) {
            this.$emit(eventName, payload)
        }
    }
}
