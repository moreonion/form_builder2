import AbstractField from '../base/abs-palette-node'
import TextfieldNode from '../../../builder/nodes/general/textfield'

export default class PaletteTextfield extends AbstractField {
  constructor(label='Textfield', icon='fa fa-text-width') {
    super(label, icon)
  }

  nodeFactory() {
    return new TextFieldNode('New textfield')
  }
}
