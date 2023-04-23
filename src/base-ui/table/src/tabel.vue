<template>
  <div class="hy-tabel">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectChange"
      v-bind="childrenProps"
    >
      <el-table-column
        type="selection"
        v-if="showSelectColumn"
        align="center"
      />
      <el-table-column
        type="index"
        v-if="showIndexColumn"
        label="序号"
        align="center"
        width="80"
      />
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column
          :prop="propItem.prop"
          :label="propItem.label"
          :min-width="propItem.minWidth"
          align="center"
          :show-overflow-tooltip="true"
        >
          <!-- vue里面是tabel组件，实现类似react antd表格里面的render效果 -->
          <!-- 使用作用域插槽：对tabel里面的数据进行改变 -->
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          :page-sizes="[5, 10, 15, 20]"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          :total="listCount"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    listData: {
      type: Array,
      require: true
    },
    listCount: {
      type: Number,
      require: true
    },
    propList: {
      type: Array,
      require: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelectChange = (value) => {
      emit('handleSelectChange', value)
    }
    const handleSizeChange = (pageSize) => {
      emit('update:page', { ...props.page, pageSize })
    }
    const handleCurrentChange = (currentPage) => {
      emit('update:page', { ...props.page, currentPage })
    }
    return {
      handleSelectChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
