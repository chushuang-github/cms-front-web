/* eslint-disable */
declare module '*.vue' {
  // DefineComponent表示组件类型
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  // 导出component，表示引入的.vue文件是DefineComponent类型的组件
  export default component
}
declare module '*.json'
