import {DnDMdArea} from 'mo-vue-dnd' // eslint-disable-line no-unused-vars
import {Node} from '../builder/node'
import {store} from '../../store'
import {recursiveAppendNode} from '../../utils'

export default class Item {
  constructor (elTemplate) {
    this.elTemplate = elTemplate
    this.handleClick = e => {
      const config = this.elTemplate.factory(store.state.builder.rootNode)
      recursiveAppendNode(store.state.builder.rootNode, new Node(config, []))
    }
  }

  nodeFactoryProxy () {
    if (!store.state.builder.draggedNode) {
      // Get the config from the factory.
      const config = this.elTemplate.factory(store.state.builder.rootNode)
      // Cache the newly generated node until it is dropped.
      store.commit('builder/dragNode', {node: new Node(config, [])})
    }
    return store.state.builder.draggedNode
  }

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
