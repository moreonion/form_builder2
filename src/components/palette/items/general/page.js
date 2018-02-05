import AbstractItem from '../base/abstract'
import {PageNode, NODE_TYPE_PAGE} from '../../../builder/nodes/general/page'
import {DnDNode} from '../../../builder/nodes/base/dnd'

import faColumns from '@fortawesome/fontawesome-free-solid/faColumns'

export default class PageFieldItem extends AbstractItem {
  constructor(label='Page', icon=faColumns) {
    super(label, icon)
    this.nodeType = NODE_TYPE_PAGE
  }

  nodeFactory() {
    new PageNode([
      new DnDNode([])
    ])
  }
}
