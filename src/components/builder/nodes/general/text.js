import {AbstractNode} from '../base/abstract'

export const NODE_TYPE_TEXT = 'text'

export class TextFieldNode extends AbstractNode {
  constructor(label='Textfield', labelPos='top', labelWidth='100px') {
    super()
    this.type = NODE_TYPE_TEXT
    this.label = label
    this.labelPos = labelPos
    this.labelWidth = labelWidth
  }

  renderFn(h) {
    return (
      <el-form id={this.path} label-position={this.labelPos} label-width={this.labelWidth}>
        <el-form-item label={this.label}>
          <el-input></el-input>
        </el-form-item>
      </el-form>)
  }

  toString() {
    return {
      type: this.type,
      path: this.path,
      label: this.label
    }
  }
}
