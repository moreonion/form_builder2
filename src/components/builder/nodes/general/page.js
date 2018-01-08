import IntermediateNode from '../base/intermediate'

export default class PageNode extends IntermediateNode {
  constructor(initChildren=[], dndOptions=undefined) {
    super(initChildren, dndOptions)
    this.type = 'page'
    this.key = Math.random()
  }

  renderNode(h) {
    return (
      <div key={this.key} id={this.path} style={{border: '10px solid pink'}}>
        <h1>Page</h1>
        <div style={{border: '5px dashed pink', margin: '5px'}}>
          {this.children.map(child => child.renderNode(h))}
        </div>
      </div>)
  }
}
