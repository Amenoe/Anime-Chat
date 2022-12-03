<template>
  <div id="home" class="page">
    <!-- <HomeBanner></HomeBanner> -->
    <div class="home-main">
      <HomeList title="热门" :list-data="hots"></HomeList>
      <HomeList title="最近更新" :list-data="latest"></HomeList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHomeStore } from '@/stores/modules/home'
import HomeList from './components/HomeList.vue'
// import HomeBanner from '@/components/Home/HomeBanner.vue'
//store
const homeStore = useHomeStore()
homeStore.homeDataAction()
const hots = computed(() => {
  return homeStore.hots
})
const latest = computed(() => {
  return homeStore.latest
})
</script>

<style scoped lang="less">
@import '~styles/page';

.home-main {
}
</style>
