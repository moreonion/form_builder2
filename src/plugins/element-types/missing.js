/**
 * This plugin is applied if a plugin for an element type cannot be found.
 */

export default {
  type: 'missing',
  preview: {
    props: {
      element: Object
    },
    render(h) {
      // If there are no children from the beginning, don’t show the slot.
      const slot = this.element.children.length ? <div class="mfb-element-children">{ this.$slots.default }</div> : null
      return (
        <div class='mfb-element-missing'>
          <p>Oops. Unfortunately I didn’t find a component for the plugin '{this.element.type}'</p>
          { slot }
        </div>
      )
    }
  },
  config: {
    props: {
      element: Object
    },
    template: `<p>Unfortunately I didn’t find a config component for a '{{element.type}}'.</p>`
  },
  acceptsChild(tree, parent, child, index) {
    return false // if there is no plugin for the parent type, assume it doesn’t like children
  },
  acceptsParent(tree, parent, child, index) {
    return true // if there is no plugin for the dragged type, assume you can drop it anywhere
  }
}
