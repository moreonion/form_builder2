import faArrowsAlt from '@fortawesome/fontawesome-free-solid/faArrowsAlt'
import {DnDMdArea} from 'mo-vue-dnd'

import './drag.scss'

import {IntermediateNode} from '../intermediate'

export const NODE_TYPE_DRAG = 'drag'

export class DragNode extends IntermediateNode {
  constructor(child) {
    super([child])
    this.type = NODE_TYPE_DRAG
    this.hover = false
  }

  renderFn(h, payload) {
    const classSettings = {
      'drag-node': true,
      'dn-hover': this.hover
    }
    return (
      <div class={classSettings}>
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
