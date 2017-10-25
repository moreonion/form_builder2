<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="8">
        Left
        <!-- <mo-palette></mo-palette> -->
        <div class="dragContainer" v-dragula="items1" bag="abc">
          <div class="formItem" :key="i" v-for="(item, i) in items1">{{item}}</div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="16">
        Right
        <!-- <mo-settings></mo-settings> -->
        <div class="dragContainer" v-dragula="items2" bag="abc">
          <div class="formItem" :key="i" v-for="(item, i) in items2">{{item}}</div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <!-- <mo-legend></mo-legend> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Palette from './components/Palette.vue'
import Builder from './components/Builder.vue'
import Settings from './components/Settings.vue'
import Legend from './components/Legend.vue'

import Test from './components/Test.vue'

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
      items1: [
        'First Name',
        'Second Name'
      ],
      items2: []
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
