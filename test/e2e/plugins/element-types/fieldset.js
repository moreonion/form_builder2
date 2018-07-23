export default {
  type: 'fieldset',
  name: 'Fieldset',

  preview: {
    props: {
      element: Object // the Node instance holding the preview
    },
    render (h) {
      return (
        <fieldset class='mfb-element-test-fieldset'>
          <legend>{ this.element.label }</legend>
          <div class={`mfb-element-children ${this.element.wrapperCls}`}>{ this.$slots.default }</div>
        </fieldset>
      )
    }
  },

  config: {
    props: {
      element: Object
    },
    template: `
      <el-form ref="form" :model="element" @submit.native.prevent>
        <el-form-item class="test-fieldset-label" label="Fieldset legend">
          <el-input v-model="element.label" />
        </el-form-item>
      </el-form>
      `
  },

  acceptsChild (tree, parent, child, index) {
    return true
  },

  acceptsParent (tree, parent, child, index) {
    return true
  },

  acceptsDeletion (tree, element) {
    return true
  }
}
