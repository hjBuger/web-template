<template>
    <div class="ellipsis-block" ref="ellipsisBlock" :title="ellipsisTitle" :style="blockStyle"></div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        },
        replaceNum: {
            type: [Number, String],
            default: 2
		},
		width: {
            type: [Number, String]
		},
		height: {
            type: [Number, String]
		}
    },
    data () {
        return {
            ellipsisTitle: ''
        }
	},
	computed: {
		blockStyle () {
			let style = {}
			if (this.width) style.width = parseInt(this.width) + 'px'
			if (this.height) style.height = parseInt(this.height) + 'px'
			return style 
		}
	},
    watch: {
        text (val) {
            this.update()
        }
    },
    methods: {
		// 更新
        update () {
            this.ellipsis(this.$refs.ellipsisBlock, this.text)
        },
        // 缩略
		ellipsis (el, contentText) {
			let fontSize = parseInt(this.getStyle(el, 'fontSize'))
			let lineHeight = this.handleLineHeight(el)
			let contentSize = this.getContentSize(el)
			el.innerHTML = contentText
			this.handleText(el, contentText, fontSize, lineHeight, contentSize)
		},
		// 处理文本
		handleText (el, contentText, fontSize, lineHeight, contentSize) {
			if (el.scrollHeight > contentSize.height) {
                // 文本字数
				let textNum = ''
				// 预估每行字数
				let estimateRowTexts = Math.floor(contentSize.contentW / fontSize)
				// 预估行数
				let estimateRows = Math.floor(contentSize.contentH / lineHeight)
				// 预估字数
                let estimateTexts = estimateRowTexts * estimateRows
                // 预估文本内容
				let estimateContent = contentText.substring(0, estimateTexts)
				el.innerHTML = estimateContent
				textNum = estimateTexts
				if (el.scrollHeight > contentSize.height) textNum = this.handleUnstandard(el, contentText, estimateRows, estimateRowTexts, contentSize.height)
				this.handleStandard(el, contentText, textNum, contentSize.height)
				this.ellipsisTitle = contentText
			} else {
				this.ellipsisTitle = ''
			}
		},
		// 处理达到标准
		handleStandard (el, contentText, textNum, height) {
			let len = contentText.length
			let currentLen = textNum
			for (let i = textNum + 1; i < len; i++) {
				let text = contentText.substring(0, i)
				el.innerHTML = text
				if (el.scrollHeight > height) {
					break
				}
				currentLen = i
			}
			let resultLen = currentLen - this.replaceNum
			el.innerHTML = contentText.substring(0, resultLen) + '...'
		},
		// 处理未达到标准
		handleUnstandard (el, contentText, estimateRows, estimateRowTexts, height) {
			let currentRow = estimateRows - 1
			let textNum = ''
			for (let i = currentRow; i > 0; i--) {
				textNum = i * estimateRowTexts
				el.innerHTML = contentText.substring(0, textNum)
				if (el.scrollHeight <= height) break
			}
			return textNum
		},
		// 处理行高
		handleLineHeight (el) {
			if (el === document) return 'normal'
			let lineHeight = this.getStyle(el, 'lineHeight')
			if (/em/.test(lineHeight)) lineHeight = this.handleLineHeight(el.parentNode)
			if (/px/.test(lineHeight)) lineHeight = parseInt(lineHeight)
			if (lineHeight === 'normal') lineHeight = 18
			return lineHeight
		},
		// 获取除去padding的尺寸
		getContentSize (el) {
			let paddingLeft = parseInt(this.getStyle(el, 'paddingLeft'))
			let paddingRight = parseInt(this.getStyle(el, 'paddingRight'))
			let paddingTop = parseInt(this.getStyle(el, 'paddingTop'))
			let paddingBottom = parseInt(this.getStyle(el, 'paddingBottom'))
			let width = el.offsetWidth
			let height = el.offsetHeight
			return {
				height,
				width,
				contentW: width - paddingLeft - paddingRight,
				contentH: height - paddingTop - paddingBottom
			}
		},
		//获取样式, currentStyle-ie
		getStyle (obj, attr) {
			return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr]
		}
    },
    mounted () {
        this.update()
    }
}
</script>

<style lang="less">
	.ellipsis-block{
		width: 100%;
		height: 100%;
		margin: 0 auto;
		text-align: left;
		font-size: inherit;
		line-height: inherit;
		color: inherit;
		overflow: hidden;
		box-sizing: border-box;
	}
</style>