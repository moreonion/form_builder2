import IntermediateNode from '../base/intermediate'

export default class FieldSetNode extends IntermediateNode {
  constructor(initChildren=[], dndOptions=undefined) {
    super(initChildren, dndOptions)
    this.type = 'fieldSet'
  }

  renderNode(h) {
    return (
      <div style={{border: '5px solid blue'}}>
        <h1>Fieldset</h1>
        <div style={{border: '2px dashed blue', margin: '2px'}}>
          {this.children.map(child => child.renderNode(h))}
        </div>
      </div>
    )
  }
}
