export default class TextFieldNode {
  constructor(label, labelPos='top', labelWidth='100px') {
    this.label = label
    this.labelPos = labelPos
    this.labelWidth = labelWidth
  }

  renderNode(h) {
    return (
      <el-form label-position={this.labelPos} label-width={this.labelWidth}>
        <el-form-item label={this.label}>
          <el-input></el-input>
        </el-form-item>
      </el-form>
    )
  }
}
