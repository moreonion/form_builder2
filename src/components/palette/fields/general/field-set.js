import AbstractField from '../base/abstract'
import FieldSetNode from '../../../builder/nodes/general/field-set'
import DnDNode from '../../../builder/nodes/base/dnd'

export default class PaletteFieldSetField extends AbstractField {
  constructor(label='Fieldset', icon='') {
    super(label, icon)
  }

  nodeFactory() {
    return new FieldSetNode([
      new DnDNode([])
    ])
  }
}
