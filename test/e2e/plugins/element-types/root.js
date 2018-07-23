export default {
  type: 'root',
  preview: {
    props: {
      element: Object
    },
    render (h) {
      return (
        <div class='mfb-element-root'>
          <div class="mfb-element-children">{ this.$slots.default }</div>
        </div>
      )
    }
  },
  config: null,
  acceptsChild (tree, parent, child, index) {
    return child.type === 'page'
  },
  acceptsParent (tree, parent, child, index) {
    return false
  },
  acceptsDeletion (tree, element) {
    return false
  }
}
