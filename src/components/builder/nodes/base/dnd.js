import {DnDItems} from 'mo-vue-dnd'
import {IntermediateNode} from './intermediate'
import {BUILDER_DND_OPTIONS, BUILDER_DND_GROUP} from '../../../../config/dnd'

import dropHandler from  '../../drop.js'

export const NODE_TYPE_DND = 'dnd'

export class DnDNode extends IntermediateNode {
  constructor(initChildren=[], dndOptions=BUILDER_DND_OPTIONS, dndGroup=BUILDER_DND_GROUP) {
    super(initChildren)
    this.type = NODE_TYPE_DND
    this.dndOptions = dndOptions
    this.dndGroup = dndGroup
  }

  renderFn(h) {
    const slots = {default: props => props.item.renderFn(h)}

    return (<DnDItems data-node-id={this.id} group={this.dndGroup} dropHandler={dropHandler} items={this.children} onUpdate={this.setChildren.bind(this)}
      options={this.dndOptions} scopedSlots={slots} keyFn={item => item.id}/>)
  }
}
