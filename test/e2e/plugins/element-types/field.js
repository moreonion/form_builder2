export default {
  type: 'field',
  name: 'field',

  preview: {
    props: {
      element: Object, // The Node instance holding the preview.
      dragged: Boolean // Is the component or a parent being dragged?
    },
    template: `
      <div class="mfb-element-test-field">
        <h3>Hello from {{element.label}}!</h3>
      </div>
      `
  },

  config: {
    props: {
      element: Object // This belongs to the ConfigDialog component, not to the store.
    },
    template: `
      <el-form ref="form" :model="element" @submit.native.prevent>
        <el-form-item class="test-field-label" label="Field legend">
          <el-input class="mfb-element-label" v-model="element.label" />
        </el-form-item>
        <el-form-item class="test-field-description-text" label="Description text">
          <el-input v-model="element.description.text" type="textarea" :rows="2" />
        </el-form-item>
      </el-form>
      `
  },

  acceptsChild (tree, parent, child, index) {
    return false
  },

  acceptsParent (tree, parent, child, index) {
    return true
  },

  acceptsDeletion (tree, element) {
    return true
  }
}
