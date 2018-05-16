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
    handleCancel(dialogDone) {
      const done = () => {
        this.$store.commit('config/leaveNode')
        dialogDone()
      }
      if (typeof this.$refs.config.cancelCallback === 'function') {
        this.$refs.config.cancelCallback(done)
      } else if (typeof this.$refs.config.closeCallback === 'function') {
        this.$refs.config.closeCallback(done)
      } else {
        done()
      }
    },
    handleSave() {
      const done = () => {
        const originalNode = this.originalNode
        this.$store.commit('config/updateNode', {editedNode: this.element})
        bus.$emit(ELEMENT_UPDATE, originalNode)
      }
      if (typeof this.$refs.config.saveCallback === 'function') {
        this.$refs.config.saveCallback(done)
      } else if (typeof this.$refs.config.closeCallback === 'function') {
        this.$refs.config.closeCallback(done)
      } else {
        done()
      }
    },
  },
  template: `<el-dialog :title="title" :visible="show" width="40%" :before-close="handleCancel">
               <component :is="configComponent" :element.sync="element" ref="config" />
               <span slot="footer" class="dialog-footer">
                 <el-button @click="handleCancel(() => {})">Cancel</el-button>
                 <el-button type="primary" @click="handleSave">Save</el-button>
               </span>
             </el-dialog>`
}
