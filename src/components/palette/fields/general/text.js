import AbstractField from '../base/abstract'
import TextFieldNode from '../../../builder/nodes/general/text'

export default class PaletteTextField extends AbstractField {
  constructor(label='Textfield', icon='fa fa-text-width') {
    super(label, icon)
  }

  nodeFactory() {
    return new TextFieldNode('New textfield')
  }
}
