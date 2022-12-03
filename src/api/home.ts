import request from '@/common/request'
import type { IHomeData } from './types'

export function getHomeData() {
  return request.get<IHomeData>({
    url: '/anime/getIndex',
  })
}
