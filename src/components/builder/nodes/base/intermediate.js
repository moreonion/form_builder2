import AbstractNode from '../base/abs-node'

export default class IntermediateNode extends AbstractNode {
  constructor(initChildren=[]) {
    super()
    this.children = [...initChildren]
  }

  addChild(index, child) {
    this.children.splice(index, 0, child)
  }

  removeChild(child) {
    const index = children.findIndex(c => c === child)
    if(index !== -1) {
      this.children.splice(index, 1)
    }
  }

  renderNode() {
    return this.children(child => child.renderNode())
  }
}
