import {WrapperNode} from '../wrapper'

export const NODE_TYPE_DRAG = 'drag'

export class DragNode extends WrapperNode {
  constructor(child) {
    super(child)
    this.type = NODE_TYPE_DRAG
  }

  renderNode(h) {
    return (
      <div>
        <div>Drag handler</div>
        <div>Edit Btn</div>
        {this.child.renderNode(h)}
      </div>)
  }

  toString() {
    return {
      type: this.type,
      child: this.child.toString()
    }
  }
}
