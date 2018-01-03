import DndNode from '../base/dnd'

import {BUILDER_DND_OPTIONS} from '../../../config/dnd'

export default class PageNode extends DndNode {
  constructor(initChildren=[], dndOptions=undefined) {
    super(initChildren, dndOptions)
  }
}
