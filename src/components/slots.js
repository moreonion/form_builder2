import {AbstractNode} from '../components/builder/nodes/base/abstract'

export function slotsFactory(h) {
  return {
    default: props => {
      return props.item instanceof AbstractNode ?
        props.item.renderNode(h):
        props.item.renderItem(h, props.item)
    }
  }
}
