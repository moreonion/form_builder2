<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="8">
        <mo-palette></mo-palette>
      </el-col>
      <el-col :xs="24" :sm="16">
        <mo-settings></mo-settings>
        <mo-builder></mo-builder>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <mo-legend></mo-legend>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Palette from './components/Palette.vue'
import Builder from './components/Builder.vue'
import Settings from './components/Settings.vue'
import Legend from './components/Legend.vue'

export default {
  components: {
    'mo-palette': Palette,
    'mo-builder': Builder,
    'mo-settings': Settings,
    'mo-legend': Legend
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">

</style>
