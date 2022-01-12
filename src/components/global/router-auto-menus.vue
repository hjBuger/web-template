<template>
    <div v-show="menus.length" class="router-auto-menus">
        <router-link :to="{ name: menu.name }" v-for="menu in menus" :key="menu.name">{{menu.label || menu.name}}</router-link>
    </div>
</template>
<script>
    export default {
        props: {
            name: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                menus: []
            }
        },
        created () {
            const matched = this.$route.matched
            const current = matched.find(item => item.name === this.name)
            if (current) this.menus = current.meta.menus
        }
    }
</script>
<style lang="less">
    .router-auto-menus{
        & > a {
            display: inline-block;
            text-decoration: none;
            & + {
                margin-left: 8px;
            }
        }
    }
</style>
