<template>
    <div class="router-auto-layout">
        <!-- 头部 -->
        <header class="router-auto-layout-header">
            <h1 class="router-auto-layout-title">
                <slot name="title-prefix"></slot>
                <slot name="title">
                    {{title}} / {{menuName}}
                </slot>
            </h1>
            <!-- 子视图菜单 -->
            <div class="router-auto-layout-menus">
                <router-auto-menus
                    :current-router-name="currentRouterName"
                    :router-name="routerName"
                    :more-text="moreText"
                    :fold-limit="foldLimit"
                    @menu-click="handleMenuClick"
                ></router-auto-menus>
            </div>
        </header>

        <!-- 子视图 -->
        <div class="router-auto-layout-view">
            <el-scrollbar class="el-scrollbar_style-handle">
                <div class="scroll-content-wrap">
                    <slot>
                        <router-view></router-view>
                    </slot>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            // 标题
            title: {
                type: String,
                default: ''
            },
            // 路由名称
            routerName: {
                type: String,
                default: ''
            },
            // 更多文本
            moreText: {
                type: String,
                default: '更多菜单'
            },
            // 子菜单折叠界限
            foldLimit: {
                type: Number,
                default: 7
            }
        },
        data () {
            return {
                currentRouterName: '',
                menuName: ''
            }
        },
        methods: {
            handleMenuClick (menu) {
                this.menuName = menu.label || menu.name
            }
        },
        mounted () {
            this.currentRouterName = this.$route.name
        }
    }
</script>
<style lang="less">
    .router-auto-layout{
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        text-align: left;
        .router-auto-layout-header{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 50px;
            padding: 0 15px;
            box-sizing: border-box;
            border-bottom: 1px solid #edeaea;
            flex-shrink: 0;
            background: #458aff;
            text-shadow: 1px 1px 0px #eeeeee;
            color: #e7541c;
            list-style-type: none;
            user-select: none;
            margin-bottom: 10px;
        }
        .router-auto-layout-title{
            font-size: 20px;
            font-weight: bold;
            padding: 0;
            margin: 0 10px 0 0;
            flex-shrink: 0;
            display: flex;
            align-items: center;
        }
        .router-auto-layout-view{
            width: 100%;
            flex: auto;
            overflow: hidden;
            .scroll-content-wrap{
                width: 100%;
                padding: 0 15px;
                box-sizing: border-box;
            }
        }
    }
</style>
