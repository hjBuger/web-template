<template>
    <img ref="img" v-bind="$attrs" :src="innerSrc">
</template>

<script>
    export default {
        props: {
            src: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                loadingSrc: '',
                innerSrc: ''
            }
        },
        watch: {
            src: {
                immediate: true,
                handler (val) {
                    if (val) {
                        this.innerSrc = this.loadingSrc
                        this.setSrc(val)
                    } else {
                        this.innerSrc = ''
                    }
                }
            }
        },
        methods: {
            setSrc (src) {
                let img = new Image()

                img.onload = () => {
                    this.innerSrc = src
                    img = null
                }

                img.onerror = e => {
                    console.error(e)
                    img = null
                }

                img.src = src
            }
        }
    }
</script>