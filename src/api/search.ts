import request from '@/common/request'

export function getFilterData(name: string) {
  return request.get({
    url: '/anime/filter/' + name,
  })
}
