const xlsxLazy = () => import('xlsx')
export default (Vue) => {
    Vue.$xlsxLazy = xlsxLazy
}