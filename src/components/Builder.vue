<template>
  <el-row class="root">
    <el-col :span="12" class="node">
      <h1>{{formData.value}}</h1>
      <draggable v-model="formData.children" :options="{group: 'tree'}">
        <div :key="i" v-for="(page, i) in formData.children" class="node">
          <h2>{{page.value}}</h2>
          <draggable :options="{group: 'tree'}">
            <div :key="j" v-for="(pageChild, j) in page.children">
              <div v-if="pageChild.type === 'fieldset'" class="node">
                <h3>{{pageChild.value}}</h3>
                <draggable v-model="pageChild.children" :options="{group: 'tree'}">
                  <div :key="k" v-for="(fieldSetChild, k) in pageChild.children" >
                    <div v-if="fieldSetChild.type === 'input'" class="node">
                      <input v-model="fieldSetChild.value">
                    </div>
                    <div v-else-if="fieldSetChild.type === 'textarea'" class="node">
                      <textarea v-model="fieldSetChild.value"></textarea>
                    </div>
                    <div v-else>Not supported node type :)</div>
                  </div>
                </draggable>
              </div>
              <div v-else-if="pageChild.type === 'input'" class="node">
                <input v-model="pageChild.value">
              </div>
              <div v-else-if="pageChild.type === 'textarea'" class="node">
                <textarea v-model="pageChild.value"></textarea>
              </div>
              <div v-else>Not supported node type :)</div>
            </div>
          </draggable>
        </div>
      </draggable>
    </el-col>
    <el-col :span="12">
      <pre>{{formData}}</pre>
    </el-col>
  </el-row>
</template>

<script>
import draggable from 'vuedraggable'

import Node from './Node.vue'

export default {
  components: {
    draggable,
    'mo-node': Node
  },
  props: ['formData'],
}
</script>

<style lang="scss">
  .node {
    border: 2px solid pink;
    padding: 5px;
  }

  // .root {
  //   min-height: 400px;
  //   width: 100%;
  //   border: 2px solid lightblue;
  // }

  pre {
    overflow: scroll;
  }
</style>
