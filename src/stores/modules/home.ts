import { defineStore } from 'pinia'
import { getHomeData, getDetailData } from '@/api/home'
import type { apiType } from '../types'
export const useHomeStore = defineStore('home', () => {
  const hots = ref<apiType.IAnime[]>()
  const banners = ref<apiType.IAnime[]>()
  const latest = ref<apiType.IAnime[]>([])

  const animeDetail = ref<apiType.IAnimeDetail>({ anime_id: [], title: '' })

  async function homeDataAction() {
    const homeDataResult = await getHomeData()
    hots.value = homeDataResult.hots
    banners.value = homeDataResult.banner
    latest.value = homeDataResult.latest
  }

  async function detailDataAction(id: string) {
    const homeDataResult = await getDetailData(id)
    animeDetail.value = homeDataResult
  }

  return { hots, banners, latest, animeDetail, homeDataAction, detailDataAction }
})
