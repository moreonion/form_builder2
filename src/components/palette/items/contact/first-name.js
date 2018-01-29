import AbstractItem from '../base/abstract'
import {FirstNameNode, NODE_TYPE_FIRST_NAME} from '../../../builder/nodes/contact/first-name'
import {wrapDragNode} from '../../../builder/util'

import faUser from '@fortawesome/fontawesome-free-solid/faUser'

export default class FirstNameItem extends AbstractItem {
  constructor(label='First name', icon=faUser) {
    super(label, icon)
    this.nodeType = NODE_TYPE_FIRST_NAME
  }

  nodeFactory() {
    return wrapDragNode(new FirstNameNode())
  }
}
