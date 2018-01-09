import AbstractField from '../base/abstract'
import {LastNameNode, NODE_TYPE_LAST_NAME} from '../../../builder/nodes/contact/last-name'

import faUsers from '@fortawesome/fontawesome-free-solid/faUsers'

export default class PaletteLastNameField extends AbstractField {
  constructor(label='Last name', icon=faUsers) {
    super(label, icon)
    this.nodeType = NODE_TYPE_LAST_NAME
  }

  nodeFactory() {
    return new LastNameNode()
  }
}
