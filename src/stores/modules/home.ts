import { defineStore } from 'pinia'
import { getHomeData } from '@/api/home'
import type { IAnime } from '../types'
export const useHomeStore = defineStore('home', () => {
  const hots = ref<IAnime[]>()
  const banners = ref<IAnime[]>()
  const latest = ref<IAnime[]>()

  async function homeDataAction() {
    const homeDataResult = await getHomeData()
    hots.value = homeDataResult.banner
    banners.value = homeDataResult.banner
    latest.value = homeDataResult.latest
  }

  return { hots, banners, latest, homeDataAction }
})
