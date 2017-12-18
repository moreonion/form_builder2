<template>
  <el-row class="root">
    <el-col :span="12" class="node">
      <h1>{{formData.value}}</h1>
      <draggable v-model="formData.children" :options="dndOptions" @add="ev => eventHandler(ev, formData.children)">
        <div :key="i" v-for="(page, i) in formData.children" class="node"> <!-- pages -->
          <h2>{{page.value}}</h2>
          <draggable class="node-container" v-model="page.children" :options="dndOptions">
            <div :key="j" v-for="(pageChild, j) in page.children"> <!-- page children -->
              <div v-if="pageChild.type === 'fieldset'" class="node"> <!-- fieldset -->
                <h3>{{pageChild.value}}</h3>
                <draggable class="node-container" v-model="pageChild.children" :options="dndOptions">
                  <div :key="k" v-for="(fieldSetChild, k) in pageChild.children" >
                    <div v-if="fieldSetChild.type === 'input'" class="node">  <!-- input -->
                      <input v-model="fieldSetChild.value">
                    </div>
                    <div v-else-if="fieldSetChild.type === 'textarea'" class="node"> <!-- textarea -->
                      <textarea v-model="fieldSetChild.value"></textarea>
                    </div>
                    <div v-else>Not supported node type :)</div>
                  </div>
                </draggable>
              </div>
              <div v-else-if="pageChild.type === 'input'" class="node"> <!-- input -->
                <input v-model="pageChild.value">
              </div>
              <div v-else-if="pageChild.type === 'textarea'" class="node"> <!-- textarea -->
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

// import Node from './Node.vue'

let counter = 1

export default {
  components: {
    draggable,
    // 'mo-node': Node
  },
  props: ['formData', 'getPaletteItem'],
  data() {
    return {
      tree: this.formData,
      dndOptions: {
         group: {name: 'tree', pull: true, put: ['palette']},
         animation: 100
      }
    }
  },
  methods: {
    eventHandler(ev, dataContainer) {
      console.log('---- Builder: Event handler ----', ev.newIndex, ev.oldIndex)
      if(ev.from.className === 'paletteWrapper') {
        ev.to.removeChild(ev.to.children[ev.newIndex])
        const paletteModel = this.getPaletteItem(ev.oldIndex)
        const left = this.tree.children.slice(0, ev.newIndex)
        const right = this.tree.children.slice(ev.newIndex)
        const newChildren = left.concat({id:`page${++counter}`, type: 'page', value: `Page ${paletteModel.label}`, children: []}).concat(right)
        this.$set(this.tree, 'children', newChildren)
      }
    }
  }
}
</script>

<style lang="scss">
  .node {
    border: 2px solid pink;
    padding: 5px;
  }

  .node-container {
    min-height: 100px;
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
