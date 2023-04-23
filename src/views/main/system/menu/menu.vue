<template>
  <div class="menu">
    <page-content
      :contentTabelConfig="contentTabelConfig"
      pageName="menu"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { contentTabelConfig } from './config/content.config'

export default defineComponent({
  name: 'hy-menu',
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
