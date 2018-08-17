import {DnDMdArea} from 'mo-vue-dnd' // eslint-disable-line no-unused-vars
import {Node} from '../builder/node'
import {store} from '../../store'
import {recursiveAppendNode} from '../../utils'

/** Class representing an item in the palette. */
export default class Item {
  /**
   * Create a palette item.
   * @param {Object} elTemplate The element template plugin for this palette item.
   */
  constructor (elTemplate) {
    this.elTemplate = elTemplate
    // If the palette item is clicked, append a node to the tree.
    this.handleClick = e => {
      // Get the config from the factory.
      const config = this.elTemplate.factory(store.state.builder.rootNode)
      // Generate a node with the above config and append it to the tree.
      recursiveAppendNode(store.state.builder.rootNode, new Node(config, []))
    }
  }

  /**
   * Get an element (a node instance) from this element template.
   * This is called when a palette item is dragged into the builder.
   * @returns {Node} The node instance created.
   */
  nodeFactoryProxy () {
    // If there isn’t a node instance yet, create one, so it can be dropped into the builder.
    if (!store.state.builder.draggedNode) {
      // Get the config from the factory.
      const config = this.elTemplate.factory(store.state.builder.rootNode)
      // Generate a node and cache it to store.state.builder.draggedNode until it is dropped.
      // When it is dropped, the watcher on DnDContext in the FormBuilder component will
      // clear store.state.builder.draggedNode again.
      store.commit('builder/dragNode', {node: new Node(config, [])})
    }
    return store.state.builder.draggedNode
  }

  /**
   * Render a palette item.
   * @param {function} h createElement function.
   * @returns {VNode} Virtual DOM node for the palette item.
   */
  renderFn (h) {
    const isAddable = this.elTemplate.isAddable(this.tree)
    const Wrapper = isAddable ? 'DnDMdArea' : 'div' // eslint-disable-line no-unused-vars

    return (
      <Wrapper class={{'mfb-palette-item': true, 'mfb-palette-item-disabled': !isAddable}}>
        <div onClick={this.handleClick}>
          <fa-icon icon={this.elTemplate.icon}></fa-icon><span>{this.elTemplate.label}</span>
        </div>
      </Wrapper>
    )
  }
}
