import IntermediateNode from '../base/intermediate'

export const NODE_TYPE_FIELD_SET = 'field-set'

export class FieldSetNode extends IntermediateNode {
  constructor(initChildren=[], dndOptions=undefined) {
    super(initChildren, dndOptions)
    this.type = NODE_TYPE_FIELD_SET
  }

  renderNode(h) {
    return (
      <div id={this.path} style={{border: '5px solid blue'}}>
        <h1>Fieldset</h1>
        <div style={{border: '2px dashed blue', margin: '2px'}}>
          {this.children.map(child => child.renderNode(h))}
        </div>
      </div>)
  }
}
