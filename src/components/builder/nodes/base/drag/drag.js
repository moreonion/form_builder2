import faArrowsAlt from '@fortawesome/fontawesome-free-solid/faArrowsAlt'
import {DnDHandle} from 'mo-vue-dnd'
import {IntermediateNode} from '../intermediate'

import './drag.scss'

export const NODE_TYPE_DRAG = 'drag'

export class DragNode extends IntermediateNode {
  constructor(child) {
    super([child])
    this.type = NODE_TYPE_DRAG
    this.hover = false
  }

  mouseenterHandler(event) {
    this.hover = true
  }

  mouseleaveHandler(event) {
    this.hover = false
  }

  renderNode(h, payload) {
    const classSettings = {
      'drag-node': true,
      'drag-node--hover-state': this.hover
    }
    return (
      <div class={classSettings}
        onMouseenter={this.mouseenterHandler.bind(this)}
        onMouseleave={this.mouseleaveHandler.bind(this)}>
        <DnDHandle container={payload}>
          <div class="drag-handle hover-handle">
            <fa-icon icon={faArrowsAlt}/>
          </div>
        </DnDHandle>
        <div class="edit-btn hover-handle">Edit</div>
        <div class="child-wrapper">{this.children[0].renderNode(h)}</div>
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
