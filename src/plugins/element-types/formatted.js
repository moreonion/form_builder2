/**
 * This is the plugin for the `formatted` element type.
 *
 * Supported config attributes:
 * data {string} - The text data.
 */

export default {
  type: 'formatted',
  preview: {
    props: {
      element: Object
    },
    render(h) {
      const preview = h('div', {
        domProps: {
          innerHTML: this.element.data
        }
      })
      return (
        <div class='mfb-element-formatted'>
          <h3>Formatted Text</h3>
          {preview}
        </div>
      )
    }
  },
  config: {
    props: {
      element: Object
    },
    data() {
      return {
        editorInstance: null
      }
    },
    mounted() {
      this.editorInstance = CKEDITOR.replace($(`.mfb-element-${this.element.id} textarea`)[0])
    },
    methods: {
      cancelCallback(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(() => {
            this.editorInstance.destroy()
            done()
          })
          .catch(() => {})
      },
      saveCallback(done) {
        this.element.data = this.editorInstance.getData()
        this.editorInstance.destroy()
        done()
      }
    },
    template: `<div :class="'mfb-element-formatted mfb-element-' + this.element.id">
               <textarea>{{element.data}}</textarea>
               </div>`
  },
  acceptsChild(tree, parent, child, index) {
    return false
  },
  acceptsParent(tree, parent, child, index) {
    return true
  }
}
