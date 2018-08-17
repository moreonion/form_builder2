import Vue from 'vue'

import Draggable from './Draggable' // eslint-disable-line no-unused-vars
import {DnDItems} from 'mo-vue-dnd' // eslint-disable-line no-unused-vars

import {BUILDER_DND_OPTIONS, BUILDER_DND_GROUP} from '../../config/dnd'
import {componentName} from '../../config/plugins'
import {getNewId} from './id'

import dropHandler from './drop'
import {clone} from '../../utils'
import {store} from '../../store'
import {plugins} from '../../config/global'

/** Class representing an element in the tree. */
export class Node {
  /**
   * Create an element.
   * @param {Object} config The element’s config properties.
   * @param {Node[]} initChildren = [] The element’s children as an array of node instances.
   */
  constructor (config, initChildren = []) {
    // If there is no id in the config, add a new one.
    if (typeof config.id === 'undefined') {
      this.id = getNewId()
    }
    this.setChildren(initChildren)

    config = clone(config) // get rid of any object references
    for (let key in config) {
      if (config.hasOwnProperty(key)) {
        this[key] = config[key]
      }
    }

    var _previewData = null

    /**
     * Cache the preview component’s data when the component is being destroyed
     * during drag’n’drop.
     * @param {Object} data Component data of the preview component.
     */
    this.setPreviewData = function (data) {
      _previewData = data
    }

    /**
     * Get the cached data for the new instance of the preview component created
     * after drag’n’drop.
     * @returns {Object} Component data for the preview component.
     */
    this.getPreviewData = function () {
      return _previewData
    }

    var _parent

    /**
     * Set the node’s parent.
     * @param {Node} parent This node’s parent node.
     */
    this.setParent = function (parent) {
      _parent = parent
    }

    /**
     * Get the node’s parent.
     * @returns {Node} This node’s parent node.
     */
    this.getParent = function () {
      return _parent
    }
  }

  /**
   * Set all of the node’s children at once.
   * @param {Node[]} children An array of node instances.
   */
  setChildren (children) {
    store.commit('builder/setChildren', {node: this, children})
  }

  /**
   * Add a child to the node at a given position.
   * @param {integer} index Zero-based position of the new child.
   * @param {Node} child The child node to add.
   */
  addChild (index, child) {
    store.commit('builder/addChild', {node: this, index, child})
  }

  /**
   * Remove a child from the node at a given position.
   * @param {integer} index Zero-based position of the child to remove.
   */
  removeChildByIndex (index) {
    store.commit('builder/removeChildByIndex', {node: this, index})
  }

  /**
   * Remove a given child from the node.
   * @param {Node} child The child to remove.
   */
  removeChild (child) {
    store.commit('builder/removeChild', {node: this, child})
  }

  /**
   * Check if the node can be removed from the tree.
   * @returns {boolean} Can the node be removed?
   */
  isRemovable () {
    if (plugins.types[this.type] && typeof plugins.types[this.type].acceptsDeletion === 'function') {
      return plugins.types[this.type].acceptsDeletion(store.state.builder.rootNode, this)
    } else {
      // In doubt let it be removable.
      return true
    }
  }

  /**
   * Remove the node from the tree.
   * @returns {boolean} Success of the operation.
   */
  removeNode () {
    if (this.isRemovable()) {
      store.commit('builder/removeChild', {node: this.getParent(), child: this})
      return true
    } else {
      return false
    }
  }

  /**
   * Render an element with a draggable, the element preview and the element’s children.
   * @param {function} h createElement function.
   * @param {boolean} parentDragged Flag indicating whether the node’s parent is being dragged.
   * @returns {VNode} Virtual DOM node.
   */
  renderFn (h, parentDragged = false) {
    // Get the preview component name for this element, fall back to missing.
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
}
