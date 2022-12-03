<template>
  <div class="home-list">
    <div class="home-list_category">{{ title }}</div>
    <el-carousel height="250px" indicator-position="none" :autoplay="false" :loop="false">
      <el-carousel-item v-for="carousel in carouselData" :key="carousel" class="carousel-list">
        <template v-for="item in carousel" :key="item.anime_id">
          <div class="list-item">
            <div class="content">
              <el-image :src="item.cover"> </el-image>
              <div class="title">{{ item.title }}</div>
            </div>
          </div>
        </template>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import type { IAnime } from '@/api/types'
import type { PropType } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  listData: {
    type: Array as PropType<IAnime[]>,
    default: () => [],
  },
})

//分割二维数组
const carouselData = computed(() => {
  const newArr = []
  // eslint-disable-next-line space-in-parens
  for (let i = 0; i < props.listData.length; ) {
    newArr.push(props.listData.slice(i, (i += 6)))
  }
  return newArr
})
</script>

<style scoped lang="less">
@list-margin: 22px;
@radius: 8px;
.home-list {
  margin-bottom: @list-margin;

  &_category {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 12px;
  }
}
.carousel-list {
  display: flex;
  flex-direction: row;
  justify-content: start;

  .list-item {
    width: calc((100% - 25px * 5) / 6);
    height: 100%;
    margin-right: 25px;
    .title {
      width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: @radius;
      margin-left: @radius;
    }
    .content {
      width: 100%;
      height: 100%;
      .el-image {
        height: calc(100% - 30px);
        border-radius: @radius;
      }
    }
  }
}
// 修改el组件样式
:deep(.el-carousel__arrow--left) {
  position: absolute;
  left: 0px;
}
:deep(.el-carousel__arrow--right) {
  position: absolute;
  right: 50px;
}

:deep(.el-carousel__arrow) {
  background-color: rgba(255, 255, 255, 0.7);
  color: #000;
}
</style>
