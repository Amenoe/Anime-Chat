import { getUserInfo, login, updateUserInfo } from '@/api/login'
import { defineStore } from 'pinia'
import type { apiType } from '../types'
import localCache from '@/utils/cache'
import type { IUserInfo } from '@/api/types'
export const useLoginStore = defineStore('login', () => {
  const userInfo = ref<IUserInfo>()
  const token = ref('')
  async function loginAction(data: apiType.ILogin) {
    //登录
    const loginData = await login(data)
    token.value = loginData.token
    localCache.setCache('token', loginData.token)

    // //请求用户信息
    const userInfoData = await getUserInfo(loginData.user_id)
    userInfo.value = userInfoData
    localCache.setCache('userInfo', userInfoData)
  }

  async function updateUserAction(id: string, data: Partial<IUserInfo>) {
    //更新用户信息
    const updateData = await updateUserInfo(id, data)
    userInfo.value = updateData
    localCache.setCache('userInfo', updateData)
  }

  function loadLocalLogin() {
    const _token = localCache.getCache('token')
    if (_token) {
      token.value = _token
    }
    const _userInfo = localCache.getCache('userInfo')
    if (_userInfo) {
      userInfo.value = _userInfo
    }
  }

  return { token, userInfo, loginAction, loadLocalLogin, updateUserAction }
})
