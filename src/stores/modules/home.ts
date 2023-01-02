import { defineStore } from 'pinia'
import { getHomeData, getDetailData } from '@/api/home'
import type { apiType } from '../types'
import localCache from '@/utils/cache'
export const useHomeStore = defineStore('home', () => {
  const hots = ref<apiType.IAnime[]>()
  const banners = ref<apiType.IAnime[]>()
  const latest = ref<apiType.IAnime[]>([])

  const animeDetail = ref<apiType.IAnimeDetail>({ anime_id: [], title: '' })
  const anime_id = ref<number>()

  async function homeDataAction() {
    const homeDataResult = await getHomeData()
    hots.value = homeDataResult.hots
    banners.value = homeDataResult.banner
    latest.value = homeDataResult.latest
  }

  async function detailDataAction(id: string) {
    const detailDataResult = await getDetailData(id)
    localCache.setCache('anime_id', detailDataResult.anime_id[0].anime_id)
    anime_id.value = detailDataResult.anime_id[0].anime_id
    animeDetail.value = detailDataResult
  }

  function loadAnimeData() {
    const _anime_id = localCache.getCache('anime_id')
    if (_anime_id) {
      anime_id.value = _anime_id
    }
  }

  return {
    hots,
    banners,
    latest,
    animeDetail,
    anime_id,
    homeDataAction,
    detailDataAction,
    loadAnimeData,
  }
})
