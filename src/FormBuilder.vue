<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="6" :sm="4">
        <mo-palette :paletteConfig="paletteConfig"></mo-palette>
      </el-col>
      <el-col :xs="18" :sm="20">
        <mo-settings></mo-settings>
        <mo-builder :formData="formData"></mo-builder>
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

import {getPaletteConfig} from './config/palette.js'

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
      paletteConfig: getPaletteConfig(),
      formData: {
        id: 'root',
        value: 'Hello root',
        children: [
          {
            id: 'page0',
            type: 'page',
            value: 'Page 0',
            children: [
              {
                id: 'fieldset0',
                type: 'fieldset',
                value: 'FieldSet :D',
                children: [
                  {
                    id: 'input0',
                    type: 'input',
                    value: 'First name'
                  },
                  {
                    id: 'input1',
                    type: 'input',
                    value: 'Last name'
                  }
                ]
              }
            ]
          },
          {
            id: 'page1',
            type: 'page',
            value: 'Page 1',
            children: [
              {
                id: 'textarea0',
                type: 'textarea',
                value: 'Well :)'
              }
            ]
          }
        ]
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
