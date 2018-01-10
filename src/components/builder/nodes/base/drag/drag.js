import faArrowsAlt from '@fortawesome/fontawesome-free-solid/faArrowsAlt'

import {IntermediateNode} from '../intermediate'

import './drag.scss'

export const NODE_TYPE_DRAG = 'drag'

export class DragNode extends IntermediateNode {
  constructor(child) {
    super([child])
    this.type = NODE_TYPE_DRAG
  }

  renderNode(h) {
    return (
      <div class="drag-node">
        <div class="drag-handle hover-handle">
          <fa-icon icon={faArrowsAlt}/>
        </div>
        <div class="edit-btn hover-handle">Edit</div>
        <div class="child-wrapper">{this.children[0].renderNode(h)}</div>
      </div>)
  }

  toString() {
    return {
      type: this.type,
      child: this.children[0].toString()
    }
  }
}
