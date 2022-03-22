<template>
    <div class="sapi-public-selector_popover-reference">
        <div class="popover-reference-list" :class="{'multiple-list': multiple && len}">
            <reference-holder></reference-holder>
        </div>
        <div class="popover-reference-btn" :class="{ 'hover-show-clear': !!len }">
            <i class="reference-btn-icon" :class="visible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
            <div class="reference-btn-clear" @click.stop="referenceBtnClick">
                <i class="el-icon-circle-close"></i>
            </div>
        </div>
    </div>
</template>
<script>
    import ReferenceHolder from './popover-reference-holder'
    export default {
        components: {
            ReferenceHolder
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            len: {
                type: Number,
                default: 0
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            referenceBtnClick () {
                if (!this.len) return
                this.$emit('clear')
            }
        }
    }
</script>
<style lang="less">
    // 用于混入的公共类
    .multiple-holder-wrap-mixin-class{
        flex: 0 1 auto;
        max-width: 100%;
        display: flex;
        overflow: hidden;
        align-items: center;
        margin: 2px 0 2px 6px;
        background-color: #f4f4f5;
        box-sizing: border-box;
        font-size: 12px;
        height: 24px;
        padding: 0 2px 0 8px;
        line-height: 22px;
        border: 1px solid #d9ecff;
        border-radius: 4px;
        &.multiple-holder-collapse-item{
            flex-shrink: 0;
            padding: 0 5px;
        }
        .multiple-holder-label{
            flex: 0 1 auto;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: keep-all;
            white-space: nowrap;
            user-select: none;
        }
        .multiple-holder-clear{
            position: relative;
            display: block;
            width: 14px;
            height: 14px;
            line-height: 14px;
            border-radius: 50%;
            margin-left: 5px;
            background: #ced2da;
            cursor: pointer;
            flex-shrink: 0;

            &:before,
            &:after{
                content: '';
                display: block;
                width: 8px;
                height: 1px;
                position: absolute;
                top: 50%;
                left: 50%;
                background: #909399;
                transform-origin: center;
                pointer-events: none;
            }
            &:before{
                transform: translate(-50%, -50%) rotate(-45deg);
            }
            &:after{
                transform: translate(-50%, -50%) rotate(45deg);
            }
            &:hover{
                background-color: #909399;
                &:before,
                &:after{
                    background-color: #ffffff;
                }
            }
        }
    }
    .sapi-public-selector_popover-reference{
        display: flex;
        align-items: stretch;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        line-height: 32px;
        font-size: 14px;
        cursor: pointer;
        overflow: hidden;
        color: #303133;
        .popover-reference-list{
            flex: auto;
            max-width: ~"calc(100% - 38px)";
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 0 0 12px;
            min-height: 32px;
            &.multiple-list{
                padding: 0;
            }
        }
        .popover-reference-btn{
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 12px;
            user-select: none;
            color: #c0c4cc;
            .reference-btn-clear{
                display: none;
                width: 100%;
                height: 100%;
                align-items: center;
                justify-content: center;
            }
            &.hover-show-clear:hover{
                .reference-btn-icon{
                    display: none;
                }
                .reference-btn-clear{
                    display: flex;
                }
            }
        }
        .popover-reference-holder{
            display: flex;
            width: 100%;
            max-width: 100%;
            align-items: center;
            color: inherit;
            overflow: hidden;
            &.popover-reference-holder-empty{
                color: #cccccc;
                user-select: none;
            }
            &.popover-reference-holder-multiple{
                flex-flow: wrap;
                &.popover-reference-multiple-collapse{
                    flex-flow: nowrap;
                }
            }
        }
        .multiple-holder-wrap{
            .multiple-holder-wrap-mixin-class;
        }
        .single-holder-wrap{
            display: block;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: keep-all;
            white-space: nowrap;
            user-select: none;
        }
    }
    .el-tooltip__popper{
        &.selector-tooltip{
            padding: 0;
            &.is-light{
                border-color: #e0dddd;
                box-shadow: 0 1px 5px rgba(0, 0, 0, .27);
                &[x-placement="right-start"] > .popper__arrow{
                    border-right-color: #cecdcd;
                }
            }
            .tooltip-content-wrap{
                width: 100%;
                padding: 10px 12px 27px;
                box-sizing: border-box;
            }
            .multiple-holder-wrap{
                .multiple-holder-wrap-mixin-class;
                margin: 2px 0 2px;
                .multiple-holder-label{
                    flex: auto;
                }
            }
        }
    }
</style>
