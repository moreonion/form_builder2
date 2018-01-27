export class Palette {
  constructor(groups) {
    this.groups = groups
  }
}

export class PaletteGroup {
  constructor(label, dndOptions, items) {
    this.label = label
    this.dndOptions = dndOptions
    this.items = items
  }
}
