import AbstractField from '../base/abs-field'
import TextfieldNode from '../../../builder/nodes/general/textfield'

export default class PaletteTextfield extends AbstractField {
  constructor(label='Textfield', icon='fa fa-text-width') {
    super(label, icon)
  }

  nodeFactory() {
    return new TextfieldNode('New textfield')
  }
}
