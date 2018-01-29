import AbstractItem from '../base/abstract'
import {LastNameNode, NODE_TYPE_LAST_NAME} from '../../../builder/nodes/contact/last-name'
import {wrapDragNode} from '../../../builder/util'

import faUsers from '@fortawesome/fontawesome-free-solid/faUsers'

export default class LastNameItem extends AbstractItem {
  constructor(label='Last name', icon=faUsers) {
    super(label, icon)
    this.nodeType = NODE_TYPE_LAST_NAME
  }

  // nodeFactory() {
  //   return wrapDragNode(new LastNameNode())
  // }
  nodeFactory() {
    return new LastNameNode()
  }
}
