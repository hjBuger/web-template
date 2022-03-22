<template>
    <div class="layout-row">
        <div class="layout-row-title" v-if="title">{{title}}：</div>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>
<style lang="less">
    .layout-row{
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        overflow: hidden;
        color: #333333;
        & + .layout-row{
            margin-top: 10px;
        }
        .layout-row-title{
            font-weight: bold;
            margin-right: 10px;
        }
    }
</style>
