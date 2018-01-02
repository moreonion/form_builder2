<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="6" :sm="4">
        <mo-palette :paletteConfig="paletteConfig"></mo-palette>
      </el-col>
      <el-col :xs="18" :sm="20">
        <mo-settings></mo-settings>
        <mo-builder :rootNode="formData" :getPaletteItem="getPaletteItem"></mo-builder>
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
import Settings from './components/Settings.vue'
import Legend from './components/Legend.vue'
import Builder from './components/Builder.js'

import {getPaletteConfig} from './config/palette.js'
import initState from './config/initState.js'

const paletteConfig = getPaletteConfig()

export default {
  components: {
    'mo-builder': Builder,
    'mo-palette': Palette,
    'mo-settings': Settings,
    'mo-legend': Legend
  },
  data () {
    return {
      paletteConfig,
      formData: initState,
      getPaletteItem(index) {
        return paletteConfig.groups[0].fields[index]
      }
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
