import {AbstractNode} from './abstract'

export const NODE_TYPE_INTERMEDIATE = 'intermediate'

export class IntermediateNode extends AbstractNode {
  constructor(initChildren=[]) {
    super()
    this.type = NODE_TYPE_INTERMEDIATE
    this.children = [...initChildren]
  }

  setChildren(children) {
    this.children = children
    encodePath(this, this.path)
  }

  addChild(index, child) {
    this.children.splice(index, 0, child)
    encodePath(this, this.path)
  }

  pushChild(child) {
    this.children.push(child)
    encodePath(this, this.path)
  }

  removeChildByIndex(i) {
    this.children.splice(i, 1)
    encodePath(this, this.path)
  }

  removeChild(child) {
    const index = children.findIndex(c => c === child)
    if(index !== -1) {
      this.children.splice(index, 1)
    }
    encodePath(this, this.path)
  }

  renderFn(h) {
    return this.children.map(child => child.renderFn(h))
  }

  toString() {
    return {
      type: this.type,
      path: this.path,
      children: this.children.map(child => child.toString())
    }
  }
}
