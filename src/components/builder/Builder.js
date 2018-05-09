import bus from '../../bus'
import {IntermediateNode} from './nodes/base/intermediate'

import './builder.scss'

export default {
  mounted() {
    document.addEventListener('mousemove', this.onMousemove)
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.onMousemove)
  },
  methods: {
    onMousemove(event) {
      function findAncestor (el, cls) {
        while (el.classList && !el.classList.contains(cls)) {
          el = el.parentNode
        }
        return el
      }
      // Emit `draggable-hover` if mouse hovers over a draggable or its children
      bus.$emit('draggable-hover', {el: findAncestor(event.target, 'mfb-draggable')})
    }
  },
  props: {
    rootNode: {
      type: IntermediateNode
    }
  },
  render(h) {
    /* All model checks must be applied before. Builder
     * assumes valid model.
     * E.g. Children of root node must be 'page' nodes
     */
    return (
      <div>
        {this.rootNode.children.map(child => child.renderFn(h))}
      </div>)
  }
}
