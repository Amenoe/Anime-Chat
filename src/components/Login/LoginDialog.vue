<template>
  <el-dialog
    v-model="dialogVisible"
    class="login-dialog"
    title="用户登录"
    center
    :close-on-click-modal="false"
  >
    <el-form ref="loginRef" label-position="left" class="login-form" :model="loginForm">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" prefix-icon="User"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" prefix-icon="Lock" show-password></el-input>
      </el-form-item>
      <el-button type="primary" @click="loginClick"> 立即登录 </el-button>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        还没有账号？<span class="register" @click="registerClick">点击注册</span>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/stores/modules/login'
const dialogVisible = ref(false)
const loginStore = useLoginStore()

const loginForm = ref({
  username: '',
  password: '',
})

// 登录事件
const loginClick = () => {
  loginStore.loginAction(loginForm.value).then(() => {
    dialogVisible.value = false
    ElNotification({
      type: 'success',
      title: '登录成功',
    })
  })
}
const emit = defineEmits(['goRegister'])

const registerClick = () => {
  dialogVisible.value = false
  emit('goRegister')
}

defineExpose({
  dialogVisible,
})
</script>

<style lang="less">
@input-width: 300px;
@input-height: 35px;
// 因为对话框是使用Teleport渲染的，所以用在全局写样式
.login-dialog {
  width: 400px;
  background-color: var(--bg-color);
  border-radius: var(--df-radius);
  .el-dialog__title {
    font-weight: 700;
    color: #fff;
  }

  // 登录框
  .login-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    //表单输入框
    .el-input {
      width: @input-width;
      height: @input-height;
    }

    .el-button {
      margin-top: 8px;
      width: @input-width;
      height: @input-height;
      margin-bottom: 8px;
      background-color: var(--primary-color);
    }
  }
}

.dialog-footer {
  .register {
    cursor: pointer;
    color: var(--primary-color);
  }
}
</style>
