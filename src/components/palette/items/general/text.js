import faTextWidth from '@fortawesome/fontawesome-free-solid/faTextWidth'

import AbstractItem from '../base/abstract'
import {TextFieldNode, NODE_TYPE_TEXT} from '../../../builder/nodes/general/text'
import {wrapDragNode} from '../../../builder/util'

export default class TextFieldItem extends AbstractItem {
  constructor(label='Textfield', icon=faTextWidth) {
    super(label, icon)
    this.nodeType = NODE_TYPE_TEXT
  }

  // nodeFactory() {
  //   return wrapDragNode(
  //     new TextFieldNode('New textfield'))
  // }

  nodeFactory() {
    return new TextFieldNode('New textfield')
  }
}
