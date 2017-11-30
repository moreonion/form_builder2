<template>
  <el-collapse v-model="activeName" accordion>
      <el-collapse-item :title="paletteGroup.label" :name="i"
        :key="i" v-for="(paletteGroup, i) in paletteConfig.groups">
        <draggable v-model="paletteConfig.groups[i].fields" :options="dndOptions">
            <div class="paletteItem" :key="j" v-for="(field, j) in paletteGroup.fields">
              {{field.label}}
            </div>
        </draggable>
      </el-collapse-item>
  </el-collapse>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  props: ['paletteConfig'],
  data () {
    return {
      dndOptions: {
        group: 'palette',
        sort: false
      },
      activeName: 0,
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
