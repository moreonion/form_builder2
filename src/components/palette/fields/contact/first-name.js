import AbstractField from '../base/abstract'
import FirstNameNode from '../../../builder/nodes/contact/first-name'

export default class PaletteFirstNameField extends AbstractField {
  constructor(label='First name', icon='fa fa-text-width') {
    super(label, icon)
  }

  nodeFactory() {
    return new FirstNameNode()
  }
}
