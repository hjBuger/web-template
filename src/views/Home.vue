<template>
    <div class="home">
        <div class="textarea-box" ref="textareaBox"></div>
    </div>
</template>

<script>

export default {
	name: 'Home',
	components: {},
	data() {
		return {
			text: '测试水电费水电费水电费水电费水电费水电费水电费第三个人恒发了个空壳了开发规划开发规划没收到顾客十大歌手的鬼地方个健康韶关市武诶就是点击就是返回IU维护维护我以二级女生的能搜到分类秀尔我以为女生看你打谁来看看放假哦 地方科技师范了空数据的方式来快递费就是独立分开交水电费可视对讲逢狼时刻的方式来东方饭店可视对讲弗兰克打了个'
		}
	},
	methods: {
		// 缩略
		ellipsis (el, contentText) {
			let fontSize = parseInt(this.getStyle(el, 'fontSize'))
			let lineHeight = this.handleLineHeight(el)
			let contentSize = this.getContentSize(el)
			console.log(fontSize, lineHeight)
			el.innerHTML = contentText
			this.handleText(el, contentText, fontSize, lineHeight, contentSize)
		},
		// 处理文本
		handleText (el, contentText, fontSize, lineHeight, contentSize) {
			let scrollH = el.scrollHeight
			let estimateRowTexts = 0;
			let estimateRows = 0;
			let estimateTexts = 0;
			let estimateContent = 0;
			let surplus = 0;
			let standardText = ''
			if (scrollH > contentSize.height) {
				// 预估每行字数
				estimateRowTexts = Math.floor(contentSize.contentW / fontSize)
				// 预估行数
				estimateRows = Math.floor(contentSize.contentH / lineHeight)
				// 预估字数
				estimateTexts = estimateRowTexts * estimateRows
				estimateContent = contentText.substring(0, estimateTexts)
				surplus = contentText.substring(estimateTexts)
				el.innerHTML = estimateContent
				console.log(estimateRowTexts, estimateRows, contentSize.contentH, lineHeight)
			}
			if (el.scrollHeight > contentSize.height) standardText = this.handleUnstandard(el, contentText, estimateRows, estimateRowTexts, contentSize.height)
			this.handleStandard(el, contentText, standardText, contentSize.height)
		},
		handleStandard (el, contentText, standardText, height) {
			console.log(el.scrollHeight, height)
		},
		handleUnstandard (el, contentText, estimateRows, estimateRowTexts, height) {
			let currentRow = estimateRows - 1
			let texts = ''
			for (let i = currentRow; i > 0; i--) {
				texts = i * estimateRowTexts
				el.innerHTML = contentText.substring(0, texts)
				if (el.scrollHeight <= height) break
			}
			return texts
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
		this.$nextTick(function () {
			this.ellipsis(this.$refs.textareaBox, this.text)
		})
	}
}
</script>
<style lang="less">
	.textarea-box{
		width: 250px;
		height: 100px;
		box-sizing: border-box;
		padding: 10px;
		border-radius: 4px;
		box-shadow: 0 0 3px rgba(0, 0, 0, .6);
		margin: 25px auto;
		text-align: left;
		// font-size: 14px;
		// line-height: 20px;
		// overflow: hidden;
		// box-sizing: border-box;
	}
</style>
