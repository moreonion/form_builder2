// Common interface for all builder nodes
export default class AbstractNode {
  constructor() {
    this.type = 'abstract'
    this.path = null
  }
  // abstract: override in subclasses
  renderNode() {
    return <div></div>
  }

  toString() {
    return {
      type: this.type,
      path: this.path
    }
  }
}
