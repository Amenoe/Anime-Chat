<template>
  <div id="detail" class="page">
    <h1>{{ detailData.title }}</h1>
    <div class="anime">
      <el-image :src="detailData.cover" class="anime-image"> </el-image>
      <!-- <template v-for="detailData" :key=""></template> -->
      <el-descriptions direction="horizontal" :column="1" class="anime-desc">
        <el-descriptions-item label="地区">{{ detailData.region }}</el-descriptions-item>
        <el-descriptions-item label="分类">{{ detailData.category }}</el-descriptions-item>
        <el-descriptions-item label="评分">{{ detailData.rank }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{ status }}</el-descriptions-item>
        <el-descriptions-item label="发布时间">{{
          formatUnixStamp(Number(detailData.pub_time))
        }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{
          formatUnixStamp(Number(detailData.update_time))
        }}</el-descriptions-item>
        <el-descriptions-item label="简介">{{ detailData.description }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <el-button class="detail-btn" type="danger" @click="newChatClick">加入聊天室</el-button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useHomeStore } from '@/stores/modules/home'
import { useLoginStore } from '@/stores/modules/login'
import { formatUnixStamp, formatStamp } from '@/utils/date-format'
const route = useRoute()
const anime_id = route.params.anime_id as string

const homeStore = useHomeStore()
const loginStore = useLoginStore()
//调用网络请求
homeStore.detailDataAction(anime_id)

const detailData = computed(() => homeStore.animeDetail)

//状态
const status = computed(() => {
  return `${homeStore.animeDetail.anime_id.length}集(${homeStore.animeDetail.season})`
})

const newChatClick = () => {
  if (loginStore.token === '') {
    ElNotification({
      type: 'error',
      message: '您还没有登录',
    })
  } else {
    router.push('/chat')
  }
}
</script>

<style scoped lang="less">
@import '~styles/page';
.anime {
  display: flex;
  margin-top: 12px;
  .anime-image {
    width: 200px;
    border-radius: 8px;
    margin-right: 12px;
  }
  .anime-desc {
    width: 500px;
  }
}

.detail-btn {
  margin-top: 30px;
}

:deep(.el-descriptions__body) {
  background-color: rgba(255, 255, 255, 0);
}

:deep(.el-descriptions__label) {
  color: #fff;
}
</style>
