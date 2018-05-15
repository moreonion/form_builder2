/**
 * This is the plugin for the `fieldset` element type.
 *
 * Supported config attributes:
 * legend {string} - The fieldset’s legend.
 */

export default {
  /** The unique identifier of this element type. */
  type: 'fieldset',

  /** The preview vue component. */
  preview: {
    props: {
      element: Object // the Node instance holding the preview
    },
    render(h) {
      return (
        <fieldset class='mfb-element-fieldset'>
          <legend>{ this.element.legend }</legend>
          { this.$slots.default }
        </fieldset>
      )
    }
  },

  /** The config form vue component. */
  config: null,

  /**
    * Accepts or rejects a child.
    *
    * @param {Node} tree - The root node of the current tree.
    * @param {Node} parent - The element of this plugin’s type.
    * @param {Node} child - The child that is about to be added.
    * @param {int} index - The position where the child would be in the parent.
    * @return {boolean}
    */
  acceptsChild(tree, parent, child, index) {
    return true
  },

  /**
    * Accepts or rejects a parent.
    *
    * @param {Node} tree - The root node of the current tree.
    * @param {Node} parent - The parent that should hold the element.
    * @param {Node} child - The element of this plugin’s type that is to be added to the parent.
    * @param {int} index - The position where the child would be in the parent.
    * @return {boolean}
    */
  acceptsParent(tree, parent, child, index) {
    return true
  }
}
