<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="6" :sm="8">
        <mo-palette :paletteConfig="paletteConfig"></mo-palette>
      </el-col>
      <el-col :xs="18" :sm="16">
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
import debounce from 'lodash.debounce'
import Palette from './components/Palette.vue'
import Builder from './components/Builder.vue'
import Settings from './components/Settings.vue'
import Legend from './components/Legend.vue'

import Test from './components/Test.vue'

import {getPaletteConfig} from './config/palette'

export default {
  components: {
    'mo-palette': Palette,
    'mo-builder': Builder,
    'mo-settings': Settings,
    'mo-legend': Legend,
    'mo-test': Test
  },
  data () {
    return {
      paletteConfig: getPaletteConfig()
    }
  }
}
</script>

<style lang="scss">
  .formItem {
    border: 1px solid pink;
    padding: 5px;
    cursor: pointer;
  }

  .dragContainer {
    min-height: 400px;
    border: blue 1px solid;
  }
</style>
