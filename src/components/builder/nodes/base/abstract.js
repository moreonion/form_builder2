import Renderable from '../../../Renderable'

export const NODE_TYPE_ABSTRACT = 'abstract'

// Common interface for all builder nodes
export class AbstractNode extends Renderable {
  constructor() {
    super()
    this.type = NODE_TYPE_ABSTRACT
  }

  toString() {
    return {
      type: this.type
    }
  }
}
