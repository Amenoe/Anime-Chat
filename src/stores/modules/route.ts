import { defineStore } from 'pinia'

export const useRouteStore = defineStore('route', () => {
  const routeList = ref([
    {
      name: '首页',
      routeName: 'Home',
      routePath: 'home',
      icon: 'HomeFilled',
    },
    {
      name: '搜索',
      routeName: 'Search',
      routePath: 'search',
      icon: 'Search',
    },
    {
      name: '时间表',
      routeName: 'Timeline',
      routePath: 'timeline',
      icon: 'AlarmClock',
    },
    {
      name: '关于我',
      routeName: 'User',
      routePath: 'user',
      icon: 'UserFilled',
    },
  ])

  const getRoutePath = computed(() => {
    const routePath = []
    for (const path of routeList.value) {
      routePath.push(path.routePath)
    }
    return routePath
  })

  return { routeList, getRoutePath }
})
