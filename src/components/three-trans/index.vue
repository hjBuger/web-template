<template>
    <div class="three-trans-wrap" :style="wrapStyle">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: Number,
            default: 360
        },
        height: {
            type: Number,
            default: 200
        }
    },
    data () {
        return {
            list: {}
        }
    },
    computed: {
        wrapStyle () {
            return {
                width: this.width + 'px',
                height: this.height + 'px'
            }
        }
    },
    created () {

    },
    mounted () {

    }
}
</script>

<style lang="less">
    .three-trans-wrap{
        margin: 200px auto 0;
        border: 1px solid red;
        border-radius: 4px;
        box-shadow: 0 3px 9px #979292;
        overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        position: relative;

        transform-style: preserve-3d;
        perspective: 800;
        backface-visibility: hidden;
        position: relative;

        .three-trans-item{
            width: 100%;
            height: 100%;
            overflow: hidden;
            transition: 1s;
            position: relative;
            z-index: 10;

            img {
                display: block;
                width: 100%;
                height: 100%;
                margin: 0 auto;
                background: none;
                outline: none;
                object-fit: cover;
                overflow: hidden;
            }
        }
        .trans-item-0 {
            transform: translateY(-100%) rotateX(-90deg);
            transform-origin: bottom;

        }
        .trans-item-1 {
            transform: translateY(-100%) rotateX(0deg) translateZ(0);
            z-index: 100;
        }
        .trans-item-2 {
            transform: translateY(-100%) rotateX(90deg);
            transform-origin: top;

        }
        .trans-item-3 {
            transform: translateY(-300%)  rotateX(180deg) translateZ(-200px);
        }
    }
</style>