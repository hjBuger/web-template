<template>
    <div :class="['context-menu-wrap', { 'context-menu-wrap-boder': border }]" :style="wrapStyle" v-show="visible">
        <div
            class="context-menu-item"
            v-for="(item, index) in list"
            :key="item.id || item.value || index"
            @click="() => item.onClick && item.onClick(item, params)"
            @contextmenu.prevent="() => item.onClick && item.onClick(item, params)"
        >
            <i :class="item.icon" v-if="item.icon"></i>
            {{item.text}}
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                visible: false,
                position: null,
                list: [],
                border: true,
                params: {}
            }
        },
        computed: {
            wrapStyle () {
                return {
                    left: parseInt(this.realPosition.left || '0') + 'px',
                    top: parseInt(this.realPosition.top || '0') + 'px'
                } 
            },
            realPosition () {
                return this.position || { left: 0, top: 0 }
            }
        }
    }
</script>

<style lang="less">
    .context-menu-wrap{
        position: fixed;
        z-index: 2000;
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        box-sizing: border-box;

        .context-menu-item{
            display: flex;
            align-items: center;
            line-height: 30px;
            min-width: 120px;
            width: auto;
            padding: 0 20px;
            cursor: pointer;
            user-select: none;
            overflow: hidden;
            flex-wrap: nowrap;
            word-break: keep-all;
            white-space: nowrap;
            color: #666666;
            font-size: 14px;

            &:hover{
                background: #e6e6e6;
            }
            & > i{
                margin-right: 5px;
                flex-shrink: 0;
            }
        }

        &.context-menu-wrap-boder{
            border: 1px solid #e6e6e6;

            .context-menu-item{
                & + .context-menu-item{
                    border-top: 1px solid #e6e6e6;
                }
            }
        }
    }
</style>