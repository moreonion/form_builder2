import AbstractField from '../base/abstract'
import PageNode from '../../../builder/nodes/general/page'
import {DnDNode} from '../../../builder/nodes/base/dnd'

export default class PalettePageField extends AbstractField {
  constructor(label='Page', icon='') {
    super(label, icon)
  }

  nodeFactory() {
    return new PageNode([
      new DnDNode([])
    ])
  }
}
