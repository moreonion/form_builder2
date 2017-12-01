<template>
  <div class="wrapper">
    <h1>Root</h1>
    <div id="root" class="node">
      <div id="page0" class="node">
        <h2>Page</h2>
        <div id="textarea0" class="node">
          <textarea :value="'abcd'"></textarea>
        </div>
      </div>
      <div id="page1" class="node">
        <h2>Page</h2>
        <div id="fieldset0" class="node">
          <h3>Fieldset Header</h3>
          <div class="fieldset-children">
            <div id="input0" class="node">
              <input type="text" placeholder="first name">
            </div>
            <div id="input0" class="node">
              <input type="text" placeholder="last name">
            </div>
          </div>
        </div>
        <div id="textarea0" class="node">
          <textarea :value="'dsadasdabcd'"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Node from './Node.vue'

export default {
  components: {'mo-node': Node},
  props: ['formData']
}
</script>

<style lang="scss">
  .node {
    border: 2px solid red;
    padding: 5px;
  }

  .wrapper {
    min-height: 400px;
    width: 100%;
    border: 2px solid lightblue;
  }
</style>
