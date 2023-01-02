import { defineStore } from 'pinia'
import type { apiType } from '../types'
import io from 'socket.io-client'
import { useLoginStore } from './login'
import { useHomeStore } from './home'
export const useChatStore = defineStore('chat', () => {
  const loginStore = useLoginStore()
  const homeStore = useHomeStore()

  const messageList = ref<any[]>()
  const group = ref<any>()
  const anime_id = computed(() => homeStore.anime_id)
  const activeUser = ref(1)

  const socket = io(`http://localhost:3000?user_id=${loginStore.userInfo!.user_id}`, {
    reconnection: true,
  })

  socket.on('connect', () => {
    console.log(socket.id, '连接成功')
  })

  // 断开连接
  socket.on('disconnect', (reason) => {
    console.log('断开连接-disconnect', reason)
  })

  //初始化连接
  async function connectSocketAction() {
    socket.connect()
    //创建或加入聊天室
    console.log(anime_id.value)
    socket.emit('addGroup', anime_id.value)
    socket.on('addGroup', (res) => {
      group.value = res
    })
  }

  async function chatMessageAction() {
    //获取聊天室所有信息
    socket.emit('chatData', group.value.group_id)

    socket.on('chatData', (res) => {
      console.log(res)
      messageList.value = res.reverse()
    })

    socket.on('groupMessage', (res) => {
      socket.emit('chatData', group.value.group_id)
    })

    socket.on('activeGroupUser', (res) => {
      console.log(res)
      activeUser.value = res.data
    })
  }

  return { socket, messageList, group, activeUser, connectSocketAction, chatMessageAction }
})
