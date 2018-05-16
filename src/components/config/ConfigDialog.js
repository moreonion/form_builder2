import Vue from 'vue'
import {mapState} from 'vuex'
import bus from '../../bus'
import {ELEMENT_UPDATE} from '../../events'

import {componentName} from '../../config/plugins'
import {clone} from '../../utils'

export default {
  name: 'ConfigDialog',
  data() {
    return {
      show: false,
      element: null
    }
  },
  computed: {
    title() {
      return 'Configure field'
    },
    configComponent() {
      var name = this.element ? componentName(this.element.type, 'config') : null
      if (name && !Vue.options.components[name]) {
        name = componentName('missing', 'config')
      }
      return name
    },
    ...mapState('config', ['originalNode'])
  },
  mounted() {
  },
  beforeDestroy() {
  },
  watch: {
    originalNode(val) {
      if (val) {
        this.element = clone(val)
        this.show = true
      } else {
        this.show = false
        this.element = null
      }
    }
  },
  methods: {
    handleClose() {
      this.$store.commit('config/leaveNode')
    },
    handleSave() {
      const originalNode = this.originalNode
      this.$store.commit('config/updateNode', {editedNode: this.element})
      bus.$emit(ELEMENT_UPDATE, originalNode)
    }
  },
  template: `<el-dialog :title="title" :visible="show" width="40%" :before-close="handleClose">
               <component :is="configComponent" :element.sync="element" />
               <span slot="footer" class="dialog-footer">
                 <el-button @click="handleClose">Cancel</el-button>
                 <el-button type="primary" @click="handleSave">Save</el-button>
               </span>
             </el-dialog>`
}
