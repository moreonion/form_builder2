import {AbstractNode} from '../base/abstract'

export const NODE_TYPE_TEXT = 'text'

export class TextFieldNode extends AbstractNode {
  constructor(text='', label='Textfield', labelPos='top', labelWidth='100px') {
    super()
    this.text = text
    this.type = NODE_TYPE_TEXT
    this.label = label
    this.labelPos = labelPos
    this.labelWidth = labelWidth
  }

  renderFn(h) {
    return (
      <el-form label-position={this.labelPos} label-width={this.labelWidth}>
        <el-form-item label={this.label}>
          <el-input value={this.text} onChange={val => this.text=val}></el-input>
        </el-form-item>
      </el-form>)
  }

  toString() {
    return {
      type: this.type,
      text: this.text,
      label: this.label
    }
  }
}
