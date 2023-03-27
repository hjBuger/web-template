<template>
    <div class="contextmenu-list-wrap" v-show="visible">
        <div class="contextmenu-list-item" v-for="item in menuList" :key="item.id" @click="item.click">
            <i :class="['contextmenu-list-icon', item.icon]"></i>
            {{item.text}}
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            menuList: [],
            visible: false
        }
    },
    watch: {
        menuList (newValue, oldValue) {
            console.log('menuList: ', this.menuList)
        }
    },
}
</script>

<style lang="less">
    .contextmenu-list-wrap{
        box-sizing: border-box;
        box-shadow: 0 0 9px rgba(0,0,0,.3);
        padding: 4px 10px;
        border-radius: 4px;
        position: fixed;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);

        .contextmenu-list-item{
            height: 32px;
            line-height: 32px;
            user-select: none;
            cursor: pointer;
            display: flex;
            align-items: center;

            & + .contextmenu-list-item{
                border-top: 1px solid #eeeeee;
            }
            .contextmenu-list-icon{
                display: block;
                width: 16px;
                height: 16px;
                margin-right: 5px;
            }
        }
    }
</style>>
