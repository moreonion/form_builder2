<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item title="Contact record fields" name="1">
      <div>TODO</div>
    </el-collapse-item>
    <el-collapse-item title="General fields" name="2">
      <div>TODO</div>
    </el-collapse-item>
    <el-collapse-item title="Payment fields" name="3">
      <div>TODO</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  data () {
    return {
      activeName: '1'
    }
  }
}
</script>

<style lang="scss">

</style>
