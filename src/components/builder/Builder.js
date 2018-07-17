import bus from '../../bus'
import {DRAGGABLE_HOVER} from '../../events'
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
    onMousemove (event) {
      function findAncestor (el, cls) {
        while (el.classList && !el.classList.contains(cls)) {
          el = el.parentNode
        }
        return el
      }
      // Emit `DRAGGABLE_HOVER` if mouse hovers over a draggable or its children
      bus.$emit(DRAGGABLE_HOVER, {el: findAncestor(event.target, 'mfb-draggable')})
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
