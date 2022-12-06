<template>
  <div class="app-header">
    <div class="app-header_user">
      <el-avatar class="avatar" :size="28" icon="Avatar" @click="dialogVisible = true" />
    </div>

    <el-dialog v-model="dialogVisible" class="login-dialog" title="用户登录" center>
      <el-form ref="loginRef" label-position="left" class="login-form" :model="loginForm">
        <el-form-item prop="name">
          <el-input v-model="loginForm.name" prefix-icon="User"></el-input>
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
  </div>
</template>

<script setup lang="ts">
const avatarUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const dialogVisible = ref(false)
const loginForm = ref({
  name: '',
  password: '',
})

const loginClick = () => {
  console.log(loginForm.value)
}
const registerClick = () => {
  console.log('去注册')
}
</script>

<style scoped lang="less">
@base-margin: 40px;
@base-height: 28px;
.app-header {
  position: fixed;
  right: @base-margin;
  top: calc((@base-margin - @base-height) / 2);
  display: flex;
  align-items: center;
  z-index: 10;
  &_user {
    .avatar:hover {
      color: var(--primary-color);
    }
  }
}
</style>
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
