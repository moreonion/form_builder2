import bus from '../../bus'
import {MOUSE_HOVER} from '../../events'
import {Node} from './node'

import {DnDItems} from 'mo-vue-dnd' // eslint-disable-line no-unused-vars

import {BUILDER_DND_OPTIONS, BUILDER_DND_GROUP} from '../../config/dnd'
import {componentName} from '../../config/plugins'

import dropHandler from './drop.js'

import './Builder.scss'

export default {
  name: 'Builder',
  mounted () {
    document.addEventListener('mousemove', this.onMousemove)
  },
  beforeDestroy () {
    document.removeEventListener('mousemove', this.onMousemove)
  },
  methods: {
    /**
     * Handle mouse movements at document level.
     * Emit `MOUSE_HOVER` and pass the element hovered at the moment.
     * @param {Event} event The native event.
     */
    onMousemove (event) {
      bus.$emit(MOUSE_HOVER, {target: event.target})
    }
  },
  props: {
    rootNode: {
      type: Node
    }
  },
  render (h) {
    const slots = {default: props => props.item.renderFn(h)}
    const ElementPreview = componentName(this.rootNode.type) // eslint-disable-line no-unused-vars

    return (
      <ElementPreview element={this.rootNode}>
        <DnDItems group={BUILDER_DND_GROUP} dropHandler={dropHandler}
          items={this.rootNode.children} onUpdate={this.rootNode.setChildren.bind(this.rootNode)}
          options={BUILDER_DND_OPTIONS} scopedSlots={slots} keyFn={item => item.id}/>
      </ElementPreview>
    )
  }
}
