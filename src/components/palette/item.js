import {DnDMdArea} from 'mo-vue-dnd'
import {Node} from '../builder/node'

var $store

export default class Item {
  constructor(elTemplate, vuexStore) {
    this.elTemplate = elTemplate
    $store = vuexStore
  }

  nodeFactoryProxy() {
    if (!$store.state.builder.draggedNode) {
      // Get the config from the factory.
      const config = this.elTemplate.factory($store.state.builder.rootNode)
      // Cache the newly generated node until it is dropped.
      $store.commit('builder/dragNode', {node: new Node(config, [])})
    }
    return $store.state.builder.draggedNode
  }

  renderFn(h) {
    const isAddable = this.elTemplate.isAddable(this.tree)
    const Wrapper = isAddable ? 'DnDMdArea' : 'div'

    return (
      <Wrapper class={{'mfb-palette-item': true, 'mfb-palette-item-disabled': !isAddable}}>
        <fa-icon icon={this.elTemplate.icon}></fa-icon> <span>{this.elTemplate.label}</span>
      </Wrapper>
    )
  }
}
