<template>
    <div class="three-trans-item">
        <img :src="realSrc" alt="">
    </div>
</template>
<script>
    export default {
        props: {
            img: {
                type: Function
            }
        },
        data() {
            return {
                realSrc: ''
            }
        },
        watch: {
            img: {
                immediate: true,
                handler (val) {
                    this.getImg(val)
                }
            }
        },
        methods: {
            async getImg (iconImportFn) {
                let img = await iconImportFn()
                this.realSrc = img.default || ''
            }
        }
    }
</script>
