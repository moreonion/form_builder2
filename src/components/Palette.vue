<template>
  <el-collapse v-model="activeName" accordion>
      <el-collapse-item :title="paletteGroup.label" :name="i"
        :key="i" v-for="(paletteGroup, i) in paletteConfig.groups">
        <!--<draggable v-model="paletteConfig.groups[i].fields" :options="dndOptions" @end="eventHandler">
            <div class="paletteItem" :key="j" v-for="(field, j) in paletteGroup.fields">
              {{field.label}}
            </div>
        </draggable>-->
        <draggable class="paletteWrapper" :options="dndOptions">
          <div class="paletteItem" :key="j" v-for="(field, j) in paletteGroup.fields">
            {{field.label}}
          </div>
        </draggable>
      </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  props: ['paletteConfig'],
  data () {
    return {
      dndOptions: {
        group: {name: 'palette', pull: true, put: ['tree']},
        sort: false
      },
      activeName: 0,
    }
  },
  methods: {
    eventHandler(ev) {
      console.log('---- Palette: Event handler ----')
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
