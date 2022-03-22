<template>
    <div class="layout-column">
        <slot></slot>
    </div>
</template>
<style lang="less">
    .layout-column{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        overflow: hidden;
        & + .layout-column{
            margin-left: 10px;
        }
    }
</style>
