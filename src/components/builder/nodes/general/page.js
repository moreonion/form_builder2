import {IntermediateNode} from '../base/intermediate'
import Draggable from '../../Draggable'

export const NODE_TYPE_PAGE = 'page'

export class PageNode extends IntermediateNode {
  // TODO: omit dndOptions from arguments
  constructor(initChildren=[], dndOptions=undefined) {
    super(initChildren, dndOptions)
    this.type = NODE_TYPE_PAGE
  }

  renderFn(h) {
    return (
      <Draggable>
        <h1>Page</h1>
        <div style="margin: 15px">{this.children.map(child => child.renderFn(h))}</div>
      </Draggable>
    )
  }
}
