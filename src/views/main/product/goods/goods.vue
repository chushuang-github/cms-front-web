<template>
  <div class="goods">
    <page-content :contentTabelConfig="contentTabelConfig" pageName="goods">
      <template #image="scope">
        <el-image
          :preview-src-list="[scope.row.imgUrl]"
          :src="scope.row.imgUrl"
          :style="{ width: '60px' }"
        />
      </template>
      <template #newPrice="scope">
        <span>{{ '￥' + scope.row.newPrice }}</span>
      </template>
      <template #oldPrice="scope">
        <span>{{ '￥' + scope.row.oldPrice }}</span>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { contentTabelConfig } from './config/content.config'

export default defineComponent({
  name: 'goods',
  components: {
    PageContent
  },
  setup() {
    return {
      contentTabelConfig
    }
  }
})
</script>

<style scoped></style>
