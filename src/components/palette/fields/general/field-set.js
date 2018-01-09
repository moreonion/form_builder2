import AbstractField from '../base/abstract'
import {FieldSetNode, NODE_TYPE_FIELD_SET} from '../../../builder/nodes/general/field-set'
import {DnDNode} from '../../../builder/nodes/base/dnd'

import faObjectGroup from '@fortawesome/fontawesome-free-solid/faObjectGroup'

export default class PaletteFieldSetField extends AbstractField {
  constructor(label='Fieldset', icon=faObjectGroup) {
    super(label, icon)
    this.nodeType = NODE_TYPE_FIELD_SET
  }

  nodeFactory() {
    return new FieldSetNode([
      new DnDNode([])
    ])
  }
}
