import AbstractField from '../base/abstract'
import {FirstNameNode, NODE_TYPE_FIRST_NAME} from '../../../builder/nodes/contact/first-name'

import faUser from '@fortawesome/fontawesome-free-solid/faUser'

export default class PaletteFirstNameField extends AbstractField {
  constructor(label='First name', icon=faUser) {
    super(label, icon)
    this.nodeType = NODE_TYPE_FIRST_NAME
  }

  nodeFactory() {
    return new FirstNameNode()
  }
}
