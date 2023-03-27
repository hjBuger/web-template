<template>
    <div>
        <div class="demo-wrap" draggable-wrap @drop="drop" @dragover="allowDrop">
            <div id="test1" :class="{hover: dragoverId === 'test1'}" draggable-item draggable @drop.stop @dragstart="drag" @dragover="itemDragover">
                <div class="line" id="line1" :class="{hover: dragoverId === 'line1'}"  @drop.stop @dragover="itemDragover"></div>
                1
            </div>
            <div id="test2" :class="{hover: dragoverId === 'test2'}" draggable-item draggable @drop.stop @dragstart="drag" @dragover="itemDragover">
                <div class="line" id="line2" :class="{hover: dragoverId === 'line2'}"  @drop.stop @dragover="itemDragover"></div>
                2
            </div>
        </div>
        <div class="demo-wrap" draggable-wrap @drop="drop" @dragover="allowDrop"></div>
    </div>
</template>
<script>
    export default {
        menuLabel: '',
        data () {
            return {
                dragoverId: ''
            }
        },
        methods: {
            drag(ev) {
                ev.dataTransfer.setData("text", ev.target.id)
            },
            allowDrop(ev) {
                // return true
                ev.preventDefault()
            },
            itemDragover(ev) {
                this.dragoverId = ev.target.id
                console.log('dragoverId: ', this.dragoverId)
                return true
            },
            drop(ev) {
                ev.preventDefault()
                var data = ev.dataTransfer.getData("text")
                ev.target.appendChild(document.getElementById(data))
            }
        },
        created () {},
        mounted () {},
        beforeDestroy () {}
    }
</script>
<style lang="less" scoped>
    [draggable-wrap]{
        display: block;
        width: 300px;
        height: 200px;
        background: yellowgreen;
        margin: 0 auto 20px;;
    }
    [draggable-item]{
        display: block;
        width: 80px;
        height: 80px;
        background: red;
        position: relative;
    }
    .line{
        position: absolute;
        display: block;
        width: 80px;
        height: 80px;
        background: transparent;
        height: 5px;
        top: 0;
        left: 0;
        transform: translateY(-50%);
        &.hover{
            background: blue;
        }
    }
</style>