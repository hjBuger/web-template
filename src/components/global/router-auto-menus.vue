<script>
    export default {
        props: {
            // 路由名称
            routerName: {
                type: String,
                default: ''
            },
            // 子菜单折叠界限
            foldLimit: {
                type: Number,
                default: 7
            },
            // 当前路由名称
            currentRouterName: {
                type: String,
                default: ''
            },
            // 更多文本
            moreText: {
                type: String,
                default: '更多菜单'
            }
        },
        data () {
            return {
                menus: [],
                activeId: ''
            }
        },
        methods: {
            // 获取折叠菜单模板
            getDropdownTemplate (list, h) {
                const ids = list.map(menu => menu.name)
                const menus = list.map(menu => h('el-dropdown-item', {
                    class: {
                        'router-auto-menus_dropdown-item': true,
                        'router-auto-menus_btn-active': menu.name === this.activeId
                    },
                    key: menu.name,
                    nativeOn: {
                        click: () => this.menuClick(menu)
                    }
                }, menu.label || menu.name))

                const child = h('el-dropdown-menu', {slot: 'dropdown'}, menus)
                const holder= h('span', {
                    class: ['router-auto-menus_dropdown-more', {
                        'router-auto-menus_btn-active': ids.includes(this.activeId)
                    }],
                    attrs: {
                        title: this.moreText
                    }
                }, [h('i', { class: 'el-icon-more' })])

                return h('el-dropdown', {
                    class: 'router-auto-menus_dropdown',
                    props: {
                        size: 'small',
                        placement: 'bottom-end',
                        trigger: 'click'
                    }
                }, [holder, child])
            },
            // 获取一般菜单模板
            getMenuTemplate (list, h) {
                return list.map(menu => h('a', {
                    class: ['router-auto-menus_btn', {
                        'router-auto-menus_btn-active': menu.name === this.activeId
                    }],
                    on: {
                        click: () => this.menuClick(menu)
                    }
                }, menu.label || menu.name))
            },
            // 获取模板
            getTemplate (h) {
                const overLimit = this.menus.length > this.foldLimit
                const template = []
                if (overLimit) {
                    // 一般菜单
                    const menus = this.menus.filter((item, index) => index < (this.foldLimit - 1))
                    const normalTemplate = this.getMenuTemplate(menus, h)
                    template.push(...normalTemplate)

                    // 折叠菜单
                    const dropdownMenus = this.menus.filter((item, index) => index >= (this.foldLimit - 1))
                    const dropdownTemplate = this.getDropdownTemplate(dropdownMenus, h)
                    dropdownTemplate && template.push(dropdownTemplate)
                } else {
                    const normalTemplate = this.getMenuTemplate(this.menus, h)
                    template.push(...normalTemplate)
                }
                return h('div', { class: 'router-auto-menus' }, template)
            },
            // 菜单点击
            menuClick (menu) {
                this.activeId = menu.name
                this.$emit('menu-click', menu)
                if (this.$route.name !== menu.name) this.toView(menu.name)
            },
            // 路由切换
            toView (name) {
                this.$router.push({
                    name
                })
            }
        },
        created () {
            // 初始化菜单数据
            const matched = this.$route.matched
            const current = matched.find(item => item.name === this.routerName)
            if (current) this.menus = current.meta.menus

            // 初始化选中菜单
            let currentMenu = this.menus.find(item => item.name === this.currentRouterName)
            if (!currentMenu) currentMenu = this.menus[0]
            this.menuClick(currentMenu)
        },
        render (h) {
            return this.getTemplate(h)
        }
    }
</script>
<style lang="less">
    .router-auto-menus_btn-mixin{
        font-size: 14px;
        color: rgba(255,255,255,.5);
        cursor: pointer;
        text-shadow: none;
        text-decoration: none;
        font-style: normal;
        user-select: none;
        &.router-auto-menus_btn-active{
            color: rgba(255,255,255,1);
        }
    }
    .router-auto-menus{
        & > a {
            display: inline-block;
            text-decoration: none;
            & + {
                margin-left: 8px;
            }
        }
        .router-auto-menus_btn{
            .router-auto-menus_btn-mixin;
            & + .router-auto-menus_btn,
            & + .router-auto-menus_dropdown{
                margin-left: 10px;
            }
        }
        .router-auto-menus_dropdown-more{
            .router-auto-menus_btn-mixin;
        }
    }
    .router-auto-menus_dropdown-item.router-auto-menus_btn-active{
        .router-auto-menus_btn-mixin;
        &.router-auto-menus_btn-active{
            color: #458aff;
        }
    }
</style>
