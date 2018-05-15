/**
 * This is the plugin for the `page` element type.
 *
 * Supported config attributes:
 * title {string} - The title of the Page.
 */

export default {
  type: 'page',
  preview: {
    props: {
      element: Object
    },
    render(h) {
      return (
        <div class='mfb-element-page'>
          <h3>{ this.element.title } ({ this.element.id })</h3>
          <p>I am a page and have { this.element.children.length } children.</p>
          <div class="mfb-element-children">{ this.$slots.default }</div>
        </div>
      )
    }
  },
  config: null,
  acceptsChild(tree, parent, child, index) {
    return true
  },
  acceptsParent(tree, parent, child, index) {
    return parent.type === 'root'
  }
}
