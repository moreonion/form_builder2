<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="6" :sm="4">
        <mo-palette></mo-palette>
      </el-col>
      <el-col :xs="18" :sm="20">
        <mo-settings></mo-settings>
        <mo-builder :rootNode="rootNode"></mo-builder>
        <pre>{{palette}}</pre>
        <pre>{{rootNode.toString()}}</pre>
        <fa-icon :icon="testIcon" />
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
import {mapState, mapGetters} from 'vuex'

import faUser from '@fortawesome/fontawesome-free-solid/faUser'

import Palette from './components/palette/Palette.vue'
import Settings from './components/Settings.vue'
import Legend from './components/Legend.vue'
import Builder from './components/builder/Builder'

export default {
  components: {
    'mo-builder': Builder,
    'mo-palette': Palette,
    'mo-settings': Settings,
    'mo-legend': Legend
  },
  computed: {
    ...mapGetters('palette', {
      palette: 'paletteState'
    }),
    ...mapState('builder', ['rootNode']),
    testIcon() {
      return faUser
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
