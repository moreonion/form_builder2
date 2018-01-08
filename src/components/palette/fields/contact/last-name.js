import AbstractField from '../base/abstract'
import {LastNameNode, NODE_TYPE_LAST_NAME} from '../../../builder/nodes/contact/last-name'

export default class PaletteLastNameField extends AbstractField {
  constructor(label='Last name', icon='fa fa-text-width') {
    super(label, icon)
    this.nodeType = NODE_TYPE_LAST_NAME
  }

  nodeFactory() {
    return new LastNameNode()
  }
}
