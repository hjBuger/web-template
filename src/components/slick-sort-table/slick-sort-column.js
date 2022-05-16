import { ElementMixin } from 'vue-slicksort'
export default {
    mixins: [ElementMixin],
    props: {
        item: {
            type: Object,
            default () {
                return {}
            }
        },
        index: {
            type: Number,
            default: 0
        }
    },
    render (h) {
        return (
            <li class="slick-sort-column">
                <div class="slick-sort-column-label">{this.item.label}</div>
                <div class="slick-sort-column-value">{this.item.value}</div>
            </li>
        )
    }
}
