<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item :title="paletteGroup.label" :name="i" :key="i"
      v-for="(paletteGroup, i) in palette.groups">
      <DnDItems :items="paletteGroup.items">
        <template scope="props">
          <div class="paletteItem">
            <fa-icon :icon="props.item.icon"></fa-icon> <span>{{props.item.label}}</span>
          </div>
        </template>
      </DnDItems>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import {DnDItems} from 'mo-vue-dnd'
import {encodePaletteItem, decodePaletteItem} from './util'
import {PALETTE_DND_WRAPER_CLASSNAME} from '../../config/palette'
import {BUILDER_ROOT_DIV_ID} from '../../config/builder'
import PalettePageField from './fields/general/page'

export default {
  components: {
    DnDItems
  },
  computed: {
    paletteWrapperClsName: () => PALETTE_DND_WRAPER_CLASSNAME,
    ...mapState('palette', ['activeName']),
    ...mapGetters('palette', {
      palette: 'paletteState'
    })
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
    max-width: 200px;
    padding: 5px;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
    border: 1px solid grey;
    border-radius: 2px;
  }
</style>
