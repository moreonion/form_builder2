import faUser from '@fortawesome/fontawesome-free-solid/faUser'

import AbstractItem from '../base/abstract'
import {FirstNameNode, NODE_TYPE_FIRST_NAME} from '../../../builder/nodes/contact/first-name'
import {DragNode} from '../../../builder/nodes/base/drag/drag'

export default class FirstNameItem extends AbstractItem {
  constructor(label='First name', icon=faUser) {
    super(label, icon)
    this.nodeType = NODE_TYPE_FIRST_NAME
  }

  nodeFactory() {
    return new DragNode(new FirstNameNode())
  }
}
