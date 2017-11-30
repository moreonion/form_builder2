<template>
  <el-form id="builder" ref="builder">

  </el-form>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  mounted: function() {
    // for(let ref in this.$refs) {
    //   this.$emit('append', 'right', this.$refs[ref].$el)
    // }
  }
}
</script>

<style lang="scss">
  #builder {
    min-height: 400px;
    width: 100%;
    border: 2px solid blue;
  }
</style>
