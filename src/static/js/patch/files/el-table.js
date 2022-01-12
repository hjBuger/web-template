export default (Vue, ElementUI) => {
    const mixins = ElementUI.Table.mixins || []
    ElementUI.Table.mixins = mixins.concat([{
        provide () {
            return {
                elTable: this
            }
        }
    }])
}
