export default {
    name: 'SimpleSortCell',
    inject: {
        SimpleSort: {
            default: null
        }
    },
    data () {
        return {
            createId: null
        }
    },
    methods: {
        dispatchCell () {
            this.SimpleSort && this.SimpleSort.$emit('$_simple-sort-cell_add', this)
        },
        removeCell () {
            this.SimpleSort.$emit('$_simple-sort-cell_remove', this.createId)
        }
    },
    created () {
        this.createId = this.$utils.guid()
        this.dispatchCell()
    },
    beforeDestroy () {
        this.removeCell()
    }
}