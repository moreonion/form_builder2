export default class IntermediateNode {
  constructor(initChildren=[]) {
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
}
