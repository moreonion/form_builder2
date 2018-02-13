import faArrowsAlt from '@fortawesome/fontawesome-free-solid/faArrowsAlt'
import {DnDHandle} from 'mo-vue-dnd'

import './drag.scss'

import {IntermediateNode} from '../intermediate'

export const NODE_TYPE_DRAG = 'drag'

export class DragNode extends IntermediateNode {
  constructor(child) {
    super([child])
    this.type = NODE_TYPE_DRAG
  }

  renderFn(h, payload) {
    const classSettings = {
      'drag-node': true,
      'drag-node--hover-state': this.hover
    }
    return (
      <div class={classSettings}>
        <DnDHandle container={payload}>
          <div class="drag-handle hover-handle">
            <fa-icon icon={faArrowsAlt}/>
          </div>
        </DnDHandle>
        <div class="edit-btn hover-handle">Edit</div>
        <div class="child-wrapper">{this.children[0].renderFn(h)}</div>
      </div>)
  }

  toString() {
    return {
      type: this.type,
      path: this.path,
      child: this.children[0].toString()
    }
  }
}
