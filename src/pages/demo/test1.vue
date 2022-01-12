<template>
    <div>
        <el-button type="primary" @click="test">test</el-button>
        <el-button type="primary" @click="test2">test2</el-button>

        <div class="test-wrap"></div>
    </div>
</template>
<script>
    import VC from '@/static/js/vmConstructor'
    export default {
        menuLabel: '测试1',
        methods: {
            test () {
                // set测试
                this.VC.test.$set({
                    class: 'test-class',
                    props: {
                        content: '哈哈哈哈哈哈'
                    },
                    on: {
                        'ev-test':  val => {
                            console.log('接收到消息: ', val)
                        }
                    },
                    scopedSlots: h => {
                        return {
                            default: props => h('span', 'tttttt')
                        }
                    }
                })

                // class测试
                this.VC.test.$class('class1', true)
                this.VC.test.$class('class2 class3  class4')
                this.VC.test.$class({
                    class5: true
                })
                this.VC.test.$class([
                    'class6',
                    'class7 class8',
                    {
                        class9: true
                    }
                ])

                // props测试
                this.VC.test.$props('content', '123')
                this.VC.test.$props({
                    'content': 'test11111111'
                })

                // on测试
                this.VC.test.$on('ev-test', payload => {
                    console.log('payload: ', payload)
                })
                this.VC.test.$on({
                    'ev-test': payload => {
                        console.log('payload: ', 'cs')
                    },
                    input: val => {
                        this.visible = val
                    }
                })

                // scopedSlots测试
                this.VC.test.$scopedSlots(h => ({
                    default: props => h('span', 'scopedSlots测试')
                }))
            },
            test2 () {
                const test2 = this.VC.create({
                    id: 'test2',
                    component: () => import('@/components/test.vue'),
                    props: {
                        content: 'test2测试'
                    }
                })
                test2.$props('value', this.visible).$on('input', val => {
                    this.visible = val
                })
            }
        },
        mounted () {
            this.VC = new VC()
            this.VC.create({
                id: 'test',
                component: () => import('@/components/test.vue'),
                wrap: '.test-wrap'
            })
        },
        beforeDestroy () {
            // this.VC.clear()
            // this.VC = null
        }
    }
</script>
