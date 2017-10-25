<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="8">
      <mo-palette></mo-palette>
    </el-col>
    <el-col :xs="24" :sm="16">
      <mo-builder></mo-builder>
    </el-col>
  </el-row>
</template>

<script>
import Palette from './components/Palette.vue'
import Builder from './components/Builder.vue'

export default {
  components: {
    'mo-palette': Palette,
    'mo-builder': Builder
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">

</style>
