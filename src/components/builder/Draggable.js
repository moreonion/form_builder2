import bus from '../../bus'
import {DnDMdArea} from 'mo-vue-dnd'

import faArrowsAlt from '@fortawesome/fontawesome-free-solid/faArrowsAlt'

export default {
  name: 'Draggable',
  data() {
    return {
      hover: false
    }
  },
  mounted() {
    bus.$on('draggable-hover', this.updateHoverState)
  },
  destroyed() {
    bus.$off('draggable-hover', this.updateHoverState)
  },
  methods: {
    updateHoverState({el}) {
      this.hover = (el === this.$el)
    }
  },
  render(h) {
    return (
      <div class={{'mfb-draggable': true, 'mfb-draggable-hover': this.hover}}>
        <div class={{'mfb-draggable-card': true}}>
          <DnDMdArea class="mfb-draggable-handle">
            <fa-icon icon={faArrowsAlt}/>
          </DnDMdArea>
          <div class="mfb-draggable-edit-btn">Edit</div>
          { this.$slots.default }
        </div>
      </div>
    )
  }
}
