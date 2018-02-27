import faArrowsAlt from '@fortawesome/fontawesome-free-solid/faArrowsAlt'
import {DnDMdArea} from 'mo-vue-dnd'

import './drag.scss'

import bus from '../../../../../bus'
import {IntermediateNode} from '../intermediate'
import {
  BUILDER_NODE_TRACED, BUILDER_REFS_REQ,
  BUILDER_REFS_REQD, BUILDER_BEFOREMOUNT,
  RequestRefsPayload
} from '../../../events'

export const NODE_TYPE_DRAG = 'drag'

export class DragNode extends IntermediateNode {
  constructor(child) {
    super([child])
    this.type = NODE_TYPE_DRAG
    this.hover = false
    this.refId = `dn-${this.id}`
    this.refs = null

    this.addListeners()
  }

  addListeners() {
    bus.$on(BUILDER_BEFOREMOUNT, this.onBuilderBM.bind(this))
    bus.$on(BUILDER_REFS_REQD, this.onRefs.bind(this))
    bus.$on(BUILDER_NODE_TRACED, this.onHover.bind(this))
  }

  onBuilderBM() {
    bus.$emit(BUILDER_REFS_REQ, new RequestRefsPayload(this))
  }

  onRefs(payload) {
    if(payload.node === this) {
      this.refs = payload.refs
    }
  }

  onHover(elem) {
    this.hover = this.refs? elem === this.refs[this.refId]: false
  }

  destroy() {
    bus.$off(BUILDER_BEFOREMOUNT, this.onBuilderBM.bind(this))
    bus.$off(BUILDER_REFS_REQD, this.onRefs.bind(this))
    bus.$off(BUILDER_NODE_TRACED, this.onHover.bind(this))

    this.children.map(child => child.destroy())
  }

  renderFn(h, payload) {
    const classSettings = {
      'drag-node': true,
      'dn-hover': this.hover
    }

    return (
      <div ref={this.refId} class={classSettings}>
        <DnDMdArea class="drag-handle hover-handle">
          <fa-icon icon={faArrowsAlt}/>
        </DnDMdArea>
        <div class="edit-btn hover-handle">Edit</div>
        <div class="child-wrapper">{this.children[0].renderFn(h)}</div>
      </div>)
  }

  toString() {
    return {
      id: this.id,
      type: this.type,
      hover: this.hover,
      child: this.children[0].toString()
    }
  }
}
