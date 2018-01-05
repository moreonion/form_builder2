export default class AbstractField {
  constructor(label, icon) {
    this.label = label
    this.icon = icon
  }

  // abstract: override in subclasses
  // Implement builder node factory
  nodeFactory() {
    return null
  }
}
