export default {
  type: 'select',

  preview: {
    props: {
      element: Object, // The Node instance holding the preview.
      dragged: Boolean // Is the component or a parent being dragged?
    },
    beforeDestroy() {
      $(`.mfb-element-${this.element.id} select`).selecter('destroy')
    },
    watch: {
      dragged(val) {
        if (val) {
          $(`.mfb-element-${this.element.id} select`).selecter('destroy')
        } else {
          $(`.mfb-element-${this.element.id} select`).selecter()
        }
      }
    },
    render(h) {
      const options = this.element.options.map(opt => <option value={opt.value}>{opt.label}</option>)

      return (
        <div class={`mfb-element-select mfb-element-${this.element.id}`}>
          <p style="background: green;">{this.dragged ? 'DRAGGED' : null}</p>
          <label for={this.element.attributes.id}>{this.element.label}</label>
          <select name={this.element.attributes.name} id={this.element.attributes.id} class={this.element.attributes.cls}>
            {options}
          </select>
        </div>
      )
    }
  },

  config: null,

  acceptsChild(tree, parent, child, index) {
    return false
  },

  acceptsParent(tree, parent, child, index) {
    return true
  }
}
