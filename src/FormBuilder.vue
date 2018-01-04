<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="6" :sm="4">
        <mo-palette :paletteConfig="paletteConfig"></mo-palette>
      </el-col>
      <el-col :xs="18" :sm="20">
        <mo-settings></mo-settings>
        <mo-builder :rootNode="formTree"></mo-builder>
        <pre>{{formTree}}</pre>
      </el-col>
    </el-row>
    <!--<el-row>
      <el-col>
        <mo-legend></mo-legend>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
import Palette from './components/palette/Palette.vue'
import Settings from './components/Settings.vue'
import Legend from './components/Legend.vue'
import Builder from './components/builder/Builder'

import {mapState} from 'vuex'

import initState from './config/initState'

export default {
  components: {
    'mo-builder': Builder,
    'mo-palette': Palette,
    'mo-settings': Settings,
    'mo-legend': Legend
  },
  // data () {
  //   return {
  //     getPaletteItem(index) {
  //       return paletteConfig.groups[0].fields[index]
  //     }
  //   }
  // },
  computed: {
    ...mapState('palette', ['paletteConfig']),
    ...mapState('builder', ['formTree'])
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
