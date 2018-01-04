import AbstractPaletteNode from '../base/abs-palette-node'
import TextfieldNode from '../../../builder/nodes/general/textfield'

export default class PaletteTextfield extends AbstractPaletteNode {
  constructor(label, icon) {
    super(label, icon)
  }

  nodeFactory() {
    return new TextFieldNode('')
  }
}
