export default {
  type: 'page',
  name: 'Page',

  preview: {
    props: {
      element: Object
    },
    render (h) {
      return (
        <section class="mfb-element-test-page">
          <h1>{this.element.label}</h1>
          <div class={`mfb-element-children ${this.element.wrapperCls}`}>{ this.$slots.default }</div>
        </section>
      )
    }
  },
  config: {
    props: {
      element: Object
    },
    template: `
      <el-form ref="form" :model="element" @submit.native.prevent>
        <el-form-item class="test-page-label" label="Page title">
          <el-input v-model="element.label" />
        </el-form-item>
      </el-form>
      `
  },
  acceptsChild (tree, parent, child, index) {
    return true
  },
  acceptsParent (tree, parent, child, index) {
    return parent.type === 'root'
  },
  acceptsDeletion (tree, element) {
    return tree.children.length > 1
  }
}
