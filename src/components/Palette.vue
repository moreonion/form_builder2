<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item
      :key="i" v-for="(paletteGroup, i) in paletteConfig.groups"
      :title="paletteGroup.label" :name="i" >
      <div class="paletteItem" :key="j" v-for="(field, j) in paletteGroup.fields">
        {{field.label}}
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  props: ['paletteConfig'],
  data () {
    return {
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
