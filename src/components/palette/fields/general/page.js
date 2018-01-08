import AbstractField from '../base/abstract'
import {PageNode, NODE_TYPE_PAGE} from '../../../builder/nodes/general/page'
import {DnDNode} from '../../../builder/nodes/base/dnd'

export default class PalettePageField extends AbstractField {
  constructor(label='Page', icon='') {
    super(label, icon)
    this.type = NODE_TYPE_PAGE
  }

  nodeFactory() {
    return new PageNode([
      new DnDNode([])
    ])
  }
}
