export class Palette {
  constructor(groups) {
    this.groups = groups
  }
}

export class PaletteGroup {
  constructor(label, dndOptions, fields) {
    this.label = label
    this.dndOptions = dndOptions
    this.fields = fields
  }
}
