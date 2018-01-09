import {AbstractNode} from './abstract'

export const NODE_TYPE_WRAPPER = 'wrapper'

export class WrapperNode extends AbstractNode {
  constructor(child) {
    super()
    this.child = child
    this.type = NODE_TYPE_WRAPPER
  }

  renderNode(h) {
    return <div>{this.child.renderNode(h)}</div>
  }
}
