import AbstractField from '../base/abstract'
import {TextFieldNode, NODE_TYPE_TEXT} from '../../../builder/nodes/general/text'

import faTextWidth from '@fortawesome/fontawesome-free-solid/faTextWidth'

export default class PaletteTextField extends AbstractField {
  constructor(label='Textfield', icon=faTextWidth) {
    super(label, icon)
    this.nodeType = NODE_TYPE_TEXT
  }

  nodeFactory() {
    return new TextFieldNode('New textfield')
  }
}
