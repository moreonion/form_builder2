export default class TextFieldNode {
  renderNode(h) {
    return (
      <el-form label-position={'top'} label-width="100px">
        <el-form-item label="Name">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    )
  }
}
