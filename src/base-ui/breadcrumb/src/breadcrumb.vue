<template>
  <div>
    <el-breadcrumb>
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumb } from '../types'

export default defineComponent({
  props: {
    breadcrumbs: {
      // 组件接收的参数是数组或对象类型，如果确定数组或对象里面的属性类型
      // 使用PropType<>泛型的形式给确定数组里面的类型
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  setup() {}
})
</script>

<style lang="less" scoped></style>
