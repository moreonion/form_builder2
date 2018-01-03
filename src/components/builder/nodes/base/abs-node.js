// Common interface for all builder nodes
export default class AbstractNode {
  // abstract: override in subclasses
  renderNode() {
    return <div></div>
  }
}
