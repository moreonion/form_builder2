/**
 * Draggable component.
 * Every element preview that can be dragged is wrapped by this component.
 */

import bus from '../../bus'
import {MOUSE_HOVER} from '../../events'

import faArrowsAlt from '@fortawesome/fontawesome-free-solid/faArrowsAlt'

export default {
  name: 'Draggable',
  props: ['element'],
  data () {
    return {
      hovered: false, // Is the mouse hovering over this draggable or one of its children?
      faArrowsAlt
    }
  },
  computed: {
    /**
     * @returns {boolean} Is this draggable being dragged?
     */
    dragged () {
      return this.$store.state.builder.draggedNode === this.element
    }
  },
  mounted () {
    // Listen to event emitted by the Builder component.
    bus.$on(MOUSE_HOVER, this.isHovered)
  },
  beforeDestroy () {
    bus.$off(MOUSE_HOVER, this.isHovered)
  },
  methods: {
    /**
     * Check if the hovered element belongs to this draggable and update
     * this.hovered accordingly.
     * @param {Object} payload Event payload.
     * @param {HTMLElement} payload.target DOM element that is hovered at the moment.
     */
    isHovered ({target}) {
      if (this.$el.contains(target)) {
        // The target could still be nested inside other draggables in
        // this draggable, so we travel up from the target to the first draggable.
        while (!target.classList.contains('mfb-draggable')) {
          target = target.parentNode
        }
      }
      this.hovered = this.$el === target
    },

    /**
     * Handle clicks on the Edit button.
     */
    editNode () {
      this.$store.commit('config/editNode', {node: this.element})
    },

    text (text) {
      switch (text) {
        case 'edit field': return Drupal.t('Edit')
      }
    }
  },
  template: `<div :class="{'mfb-draggable': true, 'mfb-draggable-hover': hovered}">
              <div :class="{'mfb-draggable-card': true}">
                <DnDMdArea class="mfb-draggable-handle">
                  <fa-icon :icon="faArrowsAlt"/>
                </DnDMdArea>
                <a href="#" class="mfb-draggable-edit-btn" @click="editNode">{{text('edit field')}}</a>
                <slot name="preview" :dragged="dragged" :hovered="hovered"/>
              </div>
            </div>`
}
