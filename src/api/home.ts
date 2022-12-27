import request from '@/common/request'
import type { IHomeData, IAnimeDetail } from './types'

/**
 * 首页数据
 * @returns Promise
 */
export function getHomeData() {
  return request.get<IHomeData>({
    url: '/anime/index',
  })
}

export function getDetailData(id: string) {
  return request.get<IAnimeDetail>({
    url: '/anime/detail/' + id,
  })
}
