import bus from '../../bus'
import {DRAGGABLE_HOVER} from '../../events'

import faArrowsAlt from '@fortawesome/fontawesome-free-solid/faArrowsAlt'

export default {
  name: 'Draggable',
  props: ['element'],
  data () {
    return {
      hovered: false,
      faArrowsAlt
    }
  },
  computed: {
    dragged () {
      return this.$store.state.builder.draggedNode === this.element
    }
  },
  mounted () {
    bus.$on(DRAGGABLE_HOVER, this.updateHoverState)
  },
  beforeDestroy () {
    bus.$off(DRAGGABLE_HOVER, this.updateHoverState)
  },
  methods: {
    updateHoverState ({el}) {
      this.hovered = (el === this.$el)
    },
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
