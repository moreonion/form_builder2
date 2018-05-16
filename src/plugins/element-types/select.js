import bus from '../../bus'
import {ELEMENT_UPDATE} from '../../events'

export default {
  type: 'select',

  preview: {
    props: {
      element: Object, // The Node instance holding the preview.
      dragged: Boolean // Is the component or a parent being dragged?
    },
    mounted() {
      bus.$on(ELEMENT_UPDATE, this.updatePreview)
    },
    beforeDestroy() {
      this.$off(ELEMENT_UPDATE, this.updatePreview)
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
    methods: {
      updatePreview() {
        $(`.mfb-element-${this.element.id} select`).selecter('destroy')
        setTimeout(() => {
          $(`.mfb-element-${this.element.id} select`).selecter()
        }, 10)
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

  config: {
    props: {
      element: Object
    },
    methods: {
      addOption() {
        this.element.options.push({value: '', label: ''})
      },
      deleteOption(index) {
        this.element.options.splice(index, 1)
      }
    },
    template: `<el-form ref="form" :model="element" @submit.native.prevent>
                 <el-form-item label="Label">
                   <el-input v-model="element.label" />
                 </el-form-item>
                 <el-button size="small" @click="addOption">Add option</el-button>
                 <el-row :gutter="10" v-for="(option, index) in element.options" :key="index" style="margin-top: 0.5rem;">
                   <el-col :span="9">
                     <el-input v-model="option.value" placeholder="Value" size="small" />
                   </el-col>
                   <el-col :span="9">
                     <el-input v-model="option.label" placeholder="Label" size="small" />
                   </el-col>
                   <el-col :span="4">
                     <el-button type="danger" @click="deleteOption(index)" size="small">Delete</el-button>
                   </el-col>
                 </el-row>
               </el-form>`
  },

  acceptsChild(tree, parent, child, index) {
    return false
  },

  acceptsParent(tree, parent, child, index) {
    return true
  }
}
