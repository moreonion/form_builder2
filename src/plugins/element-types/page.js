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
  config: {
    props: {
      element: Object
    },
    template: `<el-form ref="form" :model="element" @submit.native.prevent>
                 <el-form-item label="Page title">
                   <el-input v-model="element.title" />
                 </el-form-item>
               </el-form>`
  },
  acceptsChild(tree, parent, child, index) {
    return true
  },
  acceptsParent(tree, parent, child, index) {
    return parent.type === 'root'
  }
}
