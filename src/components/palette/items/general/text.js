import faTextWidth from '@fortawesome/fontawesome-free-solid/faTextWidth'

import AbstractItem from '../base/abstract'
import {TextFieldNode, NODE_TYPE_TEXT} from '../../../builder/nodes/general/text'
import {DragNode} from '../../../builder/nodes/base/drag/drag'

export default class TextFieldItem extends AbstractItem {
  constructor(text, label='Textfield', icon=faTextWidth) {
    super(label, icon)
    this.nodeType = NODE_TYPE_TEXT
  }

  nodeFactory() {
    return new DragNode(new TextFieldNode('', 'New textfield'))
  }
}
