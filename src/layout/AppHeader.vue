<template>
  <div class="app-header">
    <div class="user-info">
      <el-avatar :size="22" :src="avatarUrl" />
    </div>
  </div>
</template>

<script setup lang="ts">
const avatarUrl = ref('https://avatars.githubusercontent.com/u/49900967?s=40&v=4')
</script>

<style scoped>
.app-header {
  position: fixed;
  right: 40px;
  top: 10px;
  display: flex;
  align-items: center;
  z-index: 8;
}
</style>
