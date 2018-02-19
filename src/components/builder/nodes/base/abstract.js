import Renderable from '../../../Renderable'

export const NODE_TYPE_ABSTRACT = 'abstract'

let nodeCounter = 0

// Common interface for all builder nodes
export class AbstractNode extends Renderable {
  constructor() {
    super()
    this.id = nodeCounter++
    this.type = NODE_TYPE_ABSTRACT
  }

  toString() {
    return {
      id: this.id,
      type: this.type
    }
  }
}
