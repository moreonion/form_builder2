import IntermediateNode from './intermediate'

export default class PageNode extends IntermediateNode {
  renderNode(h) {
    return <div>Intermediate node :)</div>
  }
}
