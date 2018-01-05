import AbstractNode from '../base/abstract'

export default class IntermediateNode extends AbstractNode {
  constructor(initChildren=[]) {
    super()
    this.type = 'intermediate'
    this.children = [...initChildren]
  }

  addChild(index, child) {
    this.children.splice(index, 0, child)
  }

  pushChild(child) {
    this.children.push(child)
  }

  removeChildByIndex(i) {
    this.children.splice(i, 1)
  }

  removeChild(child) {
    const index = children.findIndex(c => c === child)
    if(index !== -1) {
      this.children.splice(index, 1)
    }
  }

  renderNode(h) {
    return this.children.map(child => child.renderNode(h))
  }
}
