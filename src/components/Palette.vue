<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item title="Contact record fields" name="1">
      <el-form id="contactFields" :model="form" ref="contactFields">
        <el-form-item label="First name">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="Last name">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="Salutation">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </el-collapse-item>
    <el-collapse-item title="General fields" name="2">
      <el-form id="generalFields" ref="generalFields">
        <el-form-item label="Last name">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="Salutation">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </el-collapse-item>
    <el-collapse-item title="Payment fields" name="3">
      <el-form id="paymentFields" :model="form" ref="paymentFields">
        <el-form-item label="Salutation">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  data () {
    return {
      activeName: '1',
      form: {
        firstName: null
      },
      items: [
        'First Name',
        'Second Name'
      ]
    }
  },
  mounted: function() {
    for(let ref in this.$refs) {
      this.$emit('append', 'left', this.$refs[ref].$el)
    }
  }
}
</script>

<style lang="scss">

</style>
