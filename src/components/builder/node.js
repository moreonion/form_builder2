import Vue from 'vue'

import Draggable from './Draggable'
import {DnDItems} from 'mo-vue-dnd'

import {BUILDER_DND_OPTIONS, BUILDER_DND_GROUP} from '../../config/dnd'
import {componentName} from '../../config/plugins'
import {getNewId} from './id'

import dropHandler from  './drop'
import {clone} from '../../utils'

export class Node {
  constructor(config, initChildren=[]) {
    this.id = getNewId()
    this.children = initChildren

    config = clone(config) // get rid of any object references
    for (let key in config) {
      if(config.hasOwnProperty(key) ) {
        this[key] = config[key]
      }
    }
  }

  setChildren(children) {
    this.children = children
  }

  addChild(index, child) {
    this.children.splice(index, 0, child)
  }

  pushChild(child) {
    this.children.push(child)
  }

  removeChildByIndex(i) {
    this.children.splice(i, 1)
  }

  removeChild(child) {
    const index = this.children.findIndex(c => c === child)
    if(index !== -1) {
      this.children.splice(index, 1)
    }
  }

  renderFn(h, parentDragged=false) {
    var ElementPreview = componentName(this.type)
    if (!Vue.options.components[ElementPreview]) {
      ElementPreview = componentName('missing')
    }

    // With scoped slots, we can pass props to child components inside slots.
    // <Parent scopedSlots={ {slotName: props => {return <Child dragged={props.dragged} />}} } />
    // is the JSX version of:
    // <Parent>
    //   <template slot="slotName" scope="props">
    //    <Child :dragged="props.dragged" />
    //   </template>
    // </Parent>

    const slots = {
      // Draggable renders the element preview in the preview slot.
      // The element preview component from the plugin can implement a default slot,
      // where the DnDItems container will be rendered.
      preview: previewProps => {
        // Caution: the drop handler references the ElementPreview component via vm.$parent,
        // so the DnDItems component has to live directly inside the preview component.
        return <ElementPreview element={this} dragged={previewProps.dragged || parentDragged}>
          <DnDItems group={BUILDER_DND_GROUP} dropHandler={dropHandler}
            items={this.children} onUpdate={this.setChildren.bind(this)}
            options={BUILDER_DND_OPTIONS} keyFn={item => item.id}
            // DnDItems renders the children in the default slot.
            scopedSlots={{default: props => props.item.renderFn(h, previewProps.dragged || parentDragged)}} />
        </ElementPreview>
      }
    }

    return (<Draggable element={this} scopedSlots={slots} />)
  }

  toString() {
    return {
      id: this.id,
      type: this.type,
      children: this.children.map(child => child.toString())
    }
  }
}
