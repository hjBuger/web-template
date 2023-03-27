class Canvas {
    
    constructor (options) {
        this.options = {
            ...(options || {})
        }
        this.options.height = this.options.rowHeight * this.options.row
        this.options.container.width = this.options.width
        this.options.container.height = this.options.height
        this.options.container.style.height = this.options.height + 'px'
        this.options.container.style.width = this.options.width + 'px'

        this.ctx = this.options.container.getContext("2d")
    }
    draw () {
        this.drawRow()
        this.drawColumn()

        return {
            rows: this.rows,
            columns: this.columns
        }
    }
    drawRow () {
        this.ctx.beginPath()
        this.ctx.lineWidth = 1
        this.ctx.strokeStyle = '#dddddd'
        this.rows = []
        for (let i = 0; i < this.options.row + 1; i++) {
            if (i === this.options.row) {
                this.ctx.moveTo(0.5, i * this.options.rowHeight - 0.5)
                this.ctx.lineTo(this.options.width - 0.5, i * this.options.rowHeight - 0.5)
            } else {
                this.ctx.moveTo(0.5, i * this.options.rowHeight + 0.5)
                this.ctx.lineTo(this.options.width - 0.5, i * this.options.rowHeight + 0.5)
            }
            if (i > 0) {
                this.rows.push({
                    start: (i - 1) * this.options.rowHeight,
                    end: i * this.options.rowHeight,
                    height: this.options.rowHeight
                })
            }
        }

        this.ctx.moveTo(0.5, 0.5)
        this.ctx.lineTo(0.5, this.options.height + 0.5)
        this.ctx.moveTo(this.options.width - 0.5, 0.5)
        this.ctx.lineTo(this.options.width - 0.5, this.options.height + 0.5)
        this.ctx.stroke()
    }
    drawColumn () {
        this.ctx.beginPath()
        this.ctx.lineWidth = 1
        this.ctx.strokeStyle = '#dddddd'
        let x = 50
        let width = Math.floor((this.options.width - x) / this.options.column)
        x = this.options.width - this.options.column * width

        this.ctx.moveTo(x + 0.5, 0.5)
        this.ctx.lineTo(x + 0.5, this.options.height + 0.5)

        this.indexColumn = { start: 0, end: x }
        this.columns = []

        for (let i = 0; i < this.options.column + 1; i++) {
            if (i === this.options.column) {
                this.ctx.moveTo(x - 0.5 + i * width, 0.5)
                this.ctx.lineTo(x - 0.5 + i * width, i * this.options.height + 0.5)
            } else {
                this.ctx.moveTo(x + 0.5 + i * width, 0.5)
                this.ctx.lineTo(x + 0.5 + i * width, i * this.options.height + 0.5)
            }
            if (i > 0) {
                this.columns.push({
                    start: x + (i - 1) * width,
                    end: x + i * width,
                    width
                })
            }
        }

        this.ctx.stroke()
    }
}

export default Canvas