<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item title="Contact record fields" name="1">
      <el-form :model="form" v-dragula="items" bag="palette">
        <div :key="i" v-for="(item, i) in items">{{item}}</div>
      </el-form>
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
      activeName: '1',
      form: {
        firstName: null
      },
      items: [
        'First Name',
        'Second Name'
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
