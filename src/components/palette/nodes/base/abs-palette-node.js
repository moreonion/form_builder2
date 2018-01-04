export default class AbstractPaletteNode {
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
