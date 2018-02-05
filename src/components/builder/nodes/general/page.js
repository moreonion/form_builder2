import {IntermediateNode} from '../base/intermediate'

export const NODE_TYPE_PAGE = 'page'

export class PageNode extends IntermediateNode {
  constructor(initChildren=[], dndOptions=undefined) {
    super(initChildren, dndOptions)
    this.type = NODE_TYPE_PAGE
  }

  renderFn(h) {
    return (
      <div>
        <h1>Page</h1>
        <div style="margin: 15px">{this.children.map(child => child.renderFn(h))}</div>
      </div>)
  }
}
