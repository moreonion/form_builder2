import AbstractField from '../base/abstract'
import {FieldSetNode, NODE_TYPE_FIELD_SET} from '../../../builder/nodes/general/field-set'
import {DnDNode} from '../../../builder/nodes/base/dnd'

export default class PaletteFieldSetField extends AbstractField {
  constructor(label='Fieldset', icon='') {
    super(label, icon)
    this.nodeType = NODE_TYPE_FIELD_SET
  }

  nodeFactory() {
    return new FieldSetNode([
      new DnDNode([])
    ])
  }
}
