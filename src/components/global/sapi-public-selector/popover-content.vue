<template>
    <div
        class="sapi-public-selector_popover-content"
        :class="{multiple: PUBLIC_SELECTOR.multiple}"
        v-loading="PUBLIC_SELECTOR.loading && PUBLIC_SELECTOR.loadingVisible"
        :element-loading-text="realLoadingConfig.text"
        :element-loading-spinner="realLoadingConfig.spinner"
        :element-loading-background="realLoadingConfig.background"
        :element-loading-custom-class="realLoadingConfig.customClass"
    >
        <!-- 搜索 -->
        <div class="public-selector-search" v-if="PUBLIC_SELECTOR.filterable">
            <el-input
                ref="searchInput"
                :placeholder="PUBLIC_SELECTOR.filterPlaceholder"
                prefix-icon="el-icon-search"
                v-model="searchValue"
                clearable
                size="small"
                @keyup.enter.native="enterSearch"
            ></el-input>
        </div>
        <!-- 历史 -->
        <content-history v-if="showHistory"></content-history>
        <!-- 内容 -->
        <content-tree></content-tree>
    </div>
</template>
<script>
    import ContentTree from './tree'
    import ContentHistory from './history'
    export default {
        components: {
            ContentTree,
            ContentHistory
        },
        inject: {
            PUBLIC_SELECTOR: {
                default: null
            }
        },
        props: {
            data: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        data () {
            return {
                searchValue: null
            }
        },
        computed: {
            realLoadingConfig () {
                return this.PUBLIC_SELECTOR.realLoadingConfig
            },
            showHistory () {
                return false
            }
        },
        methods: {
            focus () {
                this.$refs.searchInput && this.$refs.searchInput.focus()
            },
            enterSearch () {

            }
        }
    }
</script>
<style lang="less">
    .sapi-public-selector_popover-content{
        .public-selector-search{
            display: flex;
            align-items: center;
            height: 35px;
            border-bottom: 1px solid #dcdfe6;
            .el-input__inner {
                border: 0;
            }
        }
        .sapi-public-selector_content-tree{
            width: 100%;
            // overflow: hidden;
        }
        .sapi-public-selector_tree-item{
            width: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 12px 0 12px;
            line-height: 32px;
            transition: .25s;
            cursor: pointer;
            &:hover{
                background: rgba(69,138,255,.1);
            }
            .create-level-style(@index)when(@index > 0){
                .create-level-style(@index - 1);
                &[tree-level=~"'@{index}'"]{
                    padding-left: 12px * @index;
                }
            }
            .create-level-style(10);
        }

        .sapi-public-selector_tree-item-template{
            flex: auto;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: keep-all;
            white-space: nowrap;
        }
    }
</style>
