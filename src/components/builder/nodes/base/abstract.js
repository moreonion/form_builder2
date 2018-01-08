// Common interface for all builder nodes
export default class AbstractNode {
  constructor() {
    this.type = 'abstract'
  }
  // abstract: override in subclasses
  renderNode() {
    return <div></div>
  }
}