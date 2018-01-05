import AbstractField from '../base/abstract'

export class PalettePageField extends AbstractField {
  constructor(label='Page', icon='') {
    super(label, icon)
  }

  nodeFactory() {
    return new PageNode([
      new DnDNode([])
    ])
  }
}
