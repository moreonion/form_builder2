/**
 * This is the plugin for the `root` element type.
 */

export default {
  type: 'root',
  preview: {
    props: {
      element: Object
    },
    render(h) {
      return (
        <div class='mfb-element-root'>
          <p>I am the root and have { this.element.children.length } children.</p>
          <div class="mfb-element-children">{ this.$slots.default }</div>
        </div>
      )
    }
  },
  config: null,
  acceptsChild(tree, parent, child, index) {
    return child.type === 'page'
  },
  acceptsParent(tree, parent, child, index) {
    return false
  }
}
