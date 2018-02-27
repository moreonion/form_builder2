import bus from '../../bus'
import {IntermediateNode} from './nodes/base/intermediate'
import {
  BUILDER_REFS_REQ, BUILDER_REFS_REQD,
  BUILDER_BEFOREMOUNT, BUILDER_NODE_TRACED,
  RefsRequestedPayload
} from './events'
import {doc, findAncestorByClassName} from '../../dom'

export default {
  props: {
    rootNode: {
      type: IntermediateNode,
      required: false
    }
  },
  beforeMount() {
    doc.addEventListener('mousemove', this.onMousemove)
    bus.$on(BUILDER_REFS_REQ, this.onReqRefs)

    bus.$emit(BUILDER_BEFOREMOUNT)
  },
  beforeDestroy() {
    doc.removeEventListener('mousemove', this.onMousemove)
    bus.$off(BUILDER_REFS_REQ, this.onReqRefs)
  },
  methods: {
    onReqRefs(reqPayload) {
      bus.$emit(BUILDER_REFS_REQD, new RefsRequestedPayload(reqPayload.node, this.$refs))
    },
    onMousemove(event) {
      const elemAtPoint = doc.elementFromPoint(event.clientX, event.clientY)
      const dragNode = findAncestorByClassName(elemAtPoint, 'drag-node')
      bus.$emit(BUILDER_NODE_TRACED, dragNode)
    }
  },
  render(h) {
    /* All model checks must be applied before. Builder
     * assumes valid model.
     * E.g. Children of root node must be 'page' nodes
     */
    return (
      <div style="margin-left: 32px">
        {this.rootNode.children.map(child => child.renderFn(h))}
      </div>)
  }
}
