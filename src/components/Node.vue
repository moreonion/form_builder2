<template>
  <div>
    <h4>Node</h4>
    <slot></slot>
  </div>
</template>

<script>
export default {

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
