/**
 * Config dialog component.
 */

import Vue from 'vue'
import {mapState} from 'vuex'
import bus from '../../bus'
import {ELEMENT_UPDATE} from '../../events'

import {componentName} from '../../config/plugins'
import {clone} from '../../utils'

export default {
  name: 'ConfigDialog',

  data () {
    return {
      show: false,  // Config dialog visibility.
      element: null // Copy of the element being configured.
    }
  },

  computed: {
    /**
     * @returns {string} The dialog title.
     */
    title () {
      return this.text('Configure field')
    },

    /**
     * @returns {string[]} Array of class strings for dialog wrapper.
     */
    wrapperClasses () {
      const cls = ['mfb-config-dialog']
      if (this.element) {
        cls.push('mfb-configuring-' + this.element.type)
      }
      return cls
    },

    /**
     * @returns {string} The name of the config component to show.
     */
    configComponent () {
      var name = this.element ? componentName(this.element.type, 'config') : null
      if (name && !Vue.options.components[name]) {
        name = componentName('missing', 'config')
      }
      return name
    },

    /** {(Node|null)} The node that is being edited. */
    ...mapState('config', ['originalNode'])
  },
  mounted () {
  },
  beforeDestroy () {
  },
  watch: {
    /**
     * If a node is being edited, copy it to the component data for editing
     * and show the dialog, otherwise reset this.element and hide the dialog.
     * @param {(Node|null)} val The node that is being edited.
     */
    originalNode (val) {
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
    /**
     * Callback called if the user tries to close the dialog.
     * Calls the cancelCallback or the closeCallback methods on the
     * config dialog if present and closes the dialog only if they call done().
     * @param {function} dialogDone Done function provided by the dialog component.
     * Call dialogDone() to close the dialog.
     */
    handleCancel (dialogDone) {
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
    /**
     * Call the saveCallback or the closeCallback methods on the
     * config dialog if present. If they call done(),
     * save the edited element back to the tree.
     * Emit ELEMENT_UPDATE.
     */
    handleSave () {
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

    text (text) {
      switch (text) {
        case 'Configure field': return Drupal.t('Configure field')
      }
    }
  },

  template: `<el-dialog
               :class="wrapperClasses"
               width="40%"
               :title="title"
               :visible="show"
               :close-on-click-modal="false"
               :before-close="handleCancel"
               >
               <component :is="configComponent" :element.sync="element" ref="config" />
               <span slot="footer" class="dialog-footer">
                 <el-button @click="handleCancel(function () {})">Cancel</el-button>
                 <el-button type="primary" @click="handleSave">Save</el-button>
               </span>
             </el-dialog>`
}
