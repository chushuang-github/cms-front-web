<template>
  <div class="page-content">
    <hy-tabel
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTabelConfig"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="medium"
          @click="handleNewClick"
        >
          新建用户
        </el-button>
      </template>
      <!-- 默认插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handle="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleEditClick(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="isDelete"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDeleteClick(scope.row)"
          >
            删除
          </el-button>
        </div>
      </template>
      <!-- 动态插槽 -->
      <template
        v-for="item in otherPropSlot"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-tabel>
  </div>
</template>

<script>
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import HyTabel from '@/base-ui/table'
import { usePermissions } from '@/hooks/usePermissions'

export default defineComponent({
  components: {
    HyTabel
  },
  emits: ['newBtnClick', 'editBtnClick'],
  props: {
    contentTabelConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10
    })
    watch(pageInfo, () => getPageData())

    // 获取操作的权限
    const isCreate = usePermissions(props.pageName, 'create')
    const isUpdate = usePermissions(props.pageName, 'update')
    const isDelete = usePermissions(props.pageName, 'delete')
    const isQuery = usePermissions(props.pageName, 'query')

    // 发送网络请求
    const getPageData = (queryInfo = {}) => {
      // 看用户是否有查询列表的权限
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 从vuex里面获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // 获取动态插槽名称
    const otherPropSlot = props.contentTabelConfig?.propList.filter((item) => {
      if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'handle') return false
      return true
    })

    // 删除
    const handleDeleteClick = (item) => {
      store.dispatch('system/deletePageData', {
        pageName: props.pageName,
        id: item.id
      })
    }

    // 新增
    const handleNewClick = () => {
      emit('newBtnClick')
    }

    // 编辑
    const handleEditClick = (item) => {
      emit('editBtnClick', item)
    }

    return {
      dataList,
      dataCount,
      pageInfo,
      otherPropSlot,
      isCreate,
      isUpdate,
      isDelete,
      getPageData,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
