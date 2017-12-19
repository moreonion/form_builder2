// See: https://github.com/DanielRosenwasser/typescript-vue-todomvc/blob/master/src/vue-file-shims.d.ts
declare module "*.vue" {
  import Vue from "vue";

  const component: typeof Vue;
  export default component;
}
