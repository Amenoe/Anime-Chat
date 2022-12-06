<template>
  <div id="user" class="page">
    <!-- <el-form ref="loginRef" class="login-form" :model="loginForm">
      <el-form-item label="账号" prop="name">
        <el-input v-model="loginForm.name"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="loginForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" show-password></el-input>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
@import '~styles/page';

#user {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
