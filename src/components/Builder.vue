<template>
  <el-form v-dragula="items" bag="builder">
    <div :key="i" v-for="(item, i) in items">{{item}}</div>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  }
}
</script>

<style lang="scss">

</style>
