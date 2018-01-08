import {NODE_TYPE_ABSTRACT} from '../../../builder/nodes/base/abstract'

export default class AbstractField {
  constructor(label, icon) {
    this.label = label
    this.icon = icon
    this.nodeType = NODE_TYPE_ABSTRACT
  }

  // abstract: override in subclasses
  // Implement builder node factory
  nodeFactory() {
    return null
  }
}
