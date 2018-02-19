import {AbstractNode} from './abstract'

export const NODE_TYPE_INTERMEDIATE = 'intermediate'

export class IntermediateNode extends AbstractNode {
  constructor(initChildren=[]) {
    super()
    this.type = NODE_TYPE_INTERMEDIATE
    this.children = initChildren
  }

  setChildren(children) {
    this.children = children
  }

  renderFn(h) {
    return this.children.map(child => child.renderFn(h))
  }

  toString() {
    return {
      type: this.type,
      children: this.children.map(child => child.toString())
    }
  }
}
