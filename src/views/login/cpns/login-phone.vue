<template>
  <div class="login-account">
    <el-form label-width="60px">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="get-button">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const phone = reactive({
      num: '',
      code: ''
    })

    const loginAction = () => {
      store.dispatch('login/phoneLoginAction', { ...phone })
    }

    return {
      phone,
      loginAction
    }
  }
})
</script>

<style lang="less" scoped>
.get-code {
  display: flex;
}
.get-button {
  margin-left: 8px;
}
</style>
