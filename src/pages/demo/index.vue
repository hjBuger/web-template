<template>
    <div>
        <h2>demo</h2>
        <!-- 子路由切换标签 -->
        <div class="router-tabs">
            <router-auto-menus name="demo"></router-auto-menus>
        </div>
        <!-- 子路由 -->
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        created () {}
    }
</script>
