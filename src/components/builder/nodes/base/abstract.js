export const NODE_TYPE_ABSTRACT = 'abstract'

// Common interface for all builder nodes
export class AbstractNode {
  constructor() {
    this.type = NODE_TYPE_ABSTRACT
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
