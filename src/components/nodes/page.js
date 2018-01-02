import IntermediateNode from './intermediate.js'

export default class PageNode extends IntermediateNode {
  renderNode(h) {
    return <div>Intermediate node :)</div>
  }
}
