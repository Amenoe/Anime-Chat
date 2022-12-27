<template>
  <div id="search" class="page">
    <!-- <img src="~@/assets/images/empty.png" alt="" />
    <h1>该页面施工中</h1> -->
    <el-input v-model="searchText" class="seach-input" placeholder="请输入搜索的动漫名称">
      <template #append>
        <el-button icon="Search" @click="searchClick" />
      </template>
    </el-input>
    <div class="search-content">
      <template v-for="item in searchList" :key="item.anime_id">
        <div class="list-item">
          <div class="content">
            <div class="content-left" @click="animeClick(item.anime_id)">
              <el-image :src="item.cover"> </el-image>
              <div :title="item.title" class="title">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getFilterData } from '@/api/search'
import router from '@/router'

const searchText = ref('')
const searchList = ref<any>()

const searchClick = () => {
  if (searchText.value != '') {
    getFilterData(searchText.value)
      .then((res) => {
        searchList.value = res
      })
      .then(() => {
        ElNotification({
          type: 'success',
          title: '搜索成功',
        })
      })
  } else {
    searchList.value = []
  }
}

const animeClick = (anime_id: number) => {
  router.push('/detail/' + anime_id)
}
</script>

<style scoped lang="less">
@list-margin: 30px;
@radius: 8px;
@comic-width: 180px;
@comic-margin: 25px;
@import '~styles/page';
.seach-input {
  width: 400px;
  height: 40px;
  margin-left: calc((100% - 400px) / 2);
  margin-bottom: 100px;
}

.search-content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.list-item {
  height: 300px;
  margin-right: @comic-margin;
  margin-bottom: @comic-margin;

  .title {
    width: calc(@comic-width - @radius);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: @radius;
    padding-left: @radius;
  }
  .content {
    height: 100%;
    display: flex;
    flex-direction: row;

    &-left {
      width: 100%;
      .el-image {
        width: @comic-width;
        height: calc(100% - 30px);
        border-radius: @radius;
        cursor: pointer;
      }
    }
    &-right {
      width: 200px;
    }
  }
}
</style>
