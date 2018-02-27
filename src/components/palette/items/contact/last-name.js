import faUsers from '@fortawesome/fontawesome-free-solid/faUsers'

import AbstractItem from '../base/abstract'
import {LastNameNode, NODE_TYPE_LAST_NAME} from '../../../builder/nodes/contact/last-name'
import {DragNode} from '../../../builder/nodes/base/drag/drag'

export default class LastNameItem extends AbstractItem {
  constructor(label='Last name', icon=faUsers) {
    super(label, icon)
    this.nodeType = NODE_TYPE_LAST_NAME
  }

  nodeFactory() {
    return new DragNode(new LastNameNode())
  }
}
