import {DnDItems} from 'mo-vue-dnd'
import {IntermediateNode} from './intermediate'

import {decodePaletteItem} from '../../../palette/util'

import {BUILDER_DND_OPTIONS, BUILDER_DND_GROUP} from '../../../../config/dnd'
import {PALETTE_DND_WRAPER_CLASSNAME} from '../../../../config/palette'
import {BUILDER_ROOT_DIV_ID, BUILDER_IS_SINGLETON_NODE_MAP} from '../../../../config/builder'

import {store} from '../../../../store'

import {getNode} from '../../util'
import {decodePath} from '../../path'
import {PageNode} from '../general/page'

export const NODE_TYPE_DND = 'dnd'

export class DnDNode extends IntermediateNode {
  constructor(initChildren=[], dndOptions=BUILDER_DND_OPTIONS, dndGroup=BUILDER_DND_GROUP) {
    super(initChildren)
    this.type = NODE_TYPE_DND
    this.dndOptions = dndOptions
    this.dndGroup = dndGroup
  }

  renderNode(h) {
    const slots = {
      default: props => props.item.renderNode(h)
    }

    return <DnDItems items={this.children} onUpdate={data => this.setChildren(data)}
      group={this.dndGroup} options={this.dndOptions} scopedSlots={slots}/>
  }
}
