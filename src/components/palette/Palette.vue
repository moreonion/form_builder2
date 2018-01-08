<template>
  <el-collapse v-model="activeName" accordion>
      <el-collapse-item :title="paletteGroup.label" :name="i"
        :key="i" v-for="(paletteGroup, i) in paletteConfig.groups">
        <!--
          NOTE: :value="[]" :move="moveHandler"
          Use dummy array for value prop to get move callbacks.
          `moveHandler` is only called, when some value binding (v-model, list)
          is used with vuedraggable.
        -->
        <draggable :value="[]" :class="paletteWrapperClsName" :move="moveHandler" :options="paletteGroup.dndOptions">
          <div class="paletteItem" :id="encodePaletteItem(i, j)" :key="j" v-for="(field, j) in paletteGroup.fields">
            {{field.label}}
          </div>
        </draggable>
      </el-collapse-item>
  </el-collapse>
</template>

<script>
import {mapState} from 'vuex'

import {encodePaletteItem} from './encode'
import {PALETTE_DND_WRAPER_CLASSNAME} from '../../config/palette'

export default {
  computed: {
    paletteWrapperClsName: () => PALETTE_DND_WRAPER_CLASSNAME,
    ...mapState('palette', ['paletteConfig', 'activeName'])
  },
  methods: {
    encodePaletteItem
  }
}
</script>

<style lang="scss">
  .paletteItem {
    padding: 5px;
    margin-bottom: 5px;
    border: 1px solid grey;
    border-radius: 2px;
  }
</style>
