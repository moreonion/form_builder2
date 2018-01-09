import {WrapperNode} from '../wrapper'

export class DragNode extends WrapperNode {

  renderNode(h) {
    return (
      <div>
        <div>Drag handler</div>
        <div>Edit Btn</div>
        {this.child.renderNode(h)}
      </div>)
  }
}
