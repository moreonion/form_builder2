<template>
  <el-collapse v-model="activeName" accordion>
      <el-collapse-item :title="paletteGroup.label" :name="i"
        :key="i" v-for="(paletteGroup, i) in palette.groups">
        <!--
          NOTE: :value="[]" :move="moveHandler"
          Use dummy array for value prop to get move callbacks.
          `moveHandler` is only called, when some value binding (v-model, list)
          is used with vuedraggable.
        -->
        <draggable :value="[]" :class="paletteWrapperClsName"
          :move="moveHandler" :options="paletteGroup.dndOptions"
          @remove="removeHandler">
          <div class="paletteItem" :id="encodePaletteItem(i, j)" :key="j"
            v-for="(field, j) in paletteGroup.fields">
            {{field.label}}
          </div>
        </draggable>
      </el-collapse-item>
  </el-collapse>
</template>

<script>
import {mapState} from 'vuex'

import {encodePaletteItem} from './encode'
import {decodePaletteItem} from './decode'
import {PALETTE_DND_WRAPER_CLASSNAME} from '../../config/palette'
import {BUILDER_ROOT_DIV_ID} from '../../config/builder'
import PalettePageField from './fields/general/page'

export default {
  computed: {
    paletteWrapperClsName: () => PALETTE_DND_WRAPER_CLASSNAME,
    ...mapState('palette', ['palette', 'activeName'])
  },
  methods: {
    encodePaletteItem,
    moveHandler(event) {
      const paletteModelId = decodePaletteItem(event.dragged.id)
      if(paletteModelId !== null) {
        const {paletteGroupIndex, paletteItemIndex} = paletteModelId
        const paletteModel = this.$store.getters['palette/getPaletteItem'](paletteGroupIndex, paletteItemIndex)

        if(paletteModel instanceof PalettePageField) {
          /*
           * RULE: Page node is only allowed as child of root node.
           */
          return event.to.parentNode.id === BUILDER_ROOT_DIV_ID
        } else if(event.to.parentNode.id === BUILDER_ROOT_DIV_ID) {
          /*
           * RULE: Children of root may only be page nodes.
           */
          return paletteModel instanceof PalettePageField
        }
      }

      return true
    },
    removeHandler(event) {
    },
    endHandler(event) {
    }
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
