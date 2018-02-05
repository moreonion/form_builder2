import {IntermediateNode} from '../base/intermediate'

export const NODE_TYPE_FIELD_SET = 'field-set'

export class FieldSetNode extends IntermediateNode {
  constructor(initChildren=[], dndOptions=undefined) {
    super(initChildren, dndOptions)
    this.type = NODE_TYPE_FIELD_SET
  }

  renderFn(h) {
    return (
      <div>
        <h1>Fieldset</h1>
        <div style="border: 2px dashed blue; padding: 10px; margin-bottom: 20px">
          {this.children.map(child => child.renderFn(h))}
        </div>
      </div>)
  }
}
