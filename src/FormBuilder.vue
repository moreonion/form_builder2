<template>
  <div class="wrapper">
    <el-row :gutter="20">
      <el-col :xs="6" :sm="8">
        <mo-palette></mo-palette>
      </el-col>
      <el-col :xs="18" :sm="14">
        <mo-settings></mo-settings>
        <mo-builder :rootNode="rootNode"></mo-builder>
        <pre>{{rootNode.toString()}}</pre>
        <pre>{{prettyPrintPalette(palette)}}</pre>
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
    ...mapState('builder', ['rootNode'])
  },
  methods: {
    prettyPrintPalette(palette) {
      return {
        groups: palette.groups.map(group => {
          return {
            label: group.label,
            fields: group.fields.map(field => {
              return {
                label: field.label,
                icon: field.icon.iconName
              }
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
  .wrapper {
    @media screen and (min-width: 768px) {
      margin: 5%;
    }
  }
</style>
