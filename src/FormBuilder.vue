<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="8">
        <mo-palette @append="appendDragContainer"></mo-palette>
      </el-col>
      <el-col :xs="24" :sm="16">
        <mo-settings></mo-settings>
        <mo-builder @append="appendDragContainer"></mo-builder>
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

import * as dragula from 'dragula'

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
      drake: null,
      drakeMap: {}
    }
  },
  created: function() {
    this.drake = dragula({
      accepts: debounce(((el, target, source, sibling) => {
        const sourceContainer = this.drakeMap[source.id]
        const targetContainer = this.drakeMap[target.id]
        console.log(sourceContainer, targetContainer)
        return sourceContainer !== targetContainer || source === target
      }).bind(this), 200)
    })
  },
  methods: {
    appendDragContainer(side, container) {
      this.drakeMap[container.id] = side
      this.drake.containers.push(container)
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
