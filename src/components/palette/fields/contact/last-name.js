import AbstractField from '../base/abstract'
import LastNameNode from '../../../builder/nodes/contact/last-name'

export default class PaletteLastNameField extends AbstractField {
  constructor(label='Last name', icon='fa fa-text-width') {
    super(label, icon)
  }

  nodeFactory() {
    return new LastNameNode()
  }
}
