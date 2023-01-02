<template>
  <div id="chat" class="page">
    <div class="chat-header">
      <h1 class="caht-header-title">{{ chatTitle }}</h1>
      <span class="chat-header-user">当前在线人数：{{ activeUser }}</span>
    </div>

    <div class="chat-content">
      <div class="chat-in-content">
        <template v-for="item in chatMessage" :key="item.id">
          <div v-if="item.user_id !== loginStore.userInfo!.user_id" class="chat-message">
            <div class="user-name">
              {{ item.nickname }}
            </div>
            <div class="user-time">{{ formatStamp(Number(item.time)) }}</div>
            <div>{{ item.message }}</div>
          </div>

          <div v-else class="other-message">
            <div class="user-name">
              {{ item.nickname }}
            </div>
            <div class="user-time">{{ formatStamp(Number(item.time)) }}</div>
            <div>{{ item.message }}</div>
          </div>
        </template>
      </div>
    </div>
    <div class="chat-input">
      <el-input v-model="inputText"></el-input>
      <el-button class="sendBtn" @click="sendMessageClick">发送</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '@/stores/modules/chat'
import { useLoginStore } from '@/stores/modules/login'
import { formatStamp } from '@/utils/date-format'
const inputText = ref('')

const chatStore = useChatStore()
const loginStore = useLoginStore()

const chatMessage = computed(() => chatStore.messageList)
const chatTitle = computed(() => chatStore.group?.group_name)
const activeUser = computed(() => chatStore.activeUser)

//初始化连接
chatStore.connectSocketAction()
setTimeout(() => {
  chatStore.chatMessageAction()
}, 200)

onUnmounted(() => {
  chatStore.socket.disconnect()
})

//发送消息
const sendMessageClick = () => {
  chatStore.socket.emit('groupMessage', {
    group_id: chatStore.group.group_id,
    user_id: loginStore.userInfo!.user_id,
    message: inputText.value,
    message_type: 'text',
  })
  inputText.value = ''
}

// const chatMessage = [
//   {
//     user_id: 1,
//     nikename: 'rain1',
//     message: '你好',
//     time: 1111111111,
//   },
//   {
//     user_id: 1,
//     nikename: 'rain1',
//     message: '111',
//     time: 1111111113,
//   },
//   {
//     user_id: 1,
//     nikename: 'rain1',
//     message: '你好',
//     time: 1111111114,
//   },
// ]
</script>

<style scoped lang="less">
@import '~styles/page';
.chat-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;

  &-user {
    margin-left: 20px;
  }
}

.chat-content {
  position: relative;
  width: 100%;
  height: calc(100% - 170px);
  overflow: hidden;
  .chat-in-content {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}

.chat-message {
  margin-bottom: 20px;
  .user-name {
    color: var(--primary-color);
  }
  .user-time {
    color: #ffffffa3;
    font-size: 12px;
  }
}

.other-message {
  position: relative;
  left: calc(100% - 170px);
  margin-bottom: 20px;
  .user-name {
    color: var(--primary-color);
  }
  .user-time {
    color: #ffffffa3;
    font-size: 12px;
  }
}

.chat-input {
  position: absolute;
  bottom: 20px;
  width: calc(100% - 50px);
  overflow: hidden;

  .el-input {
    height: 50px;
  }

  .sendBtn {
    position: relative;
    bottom: 40px;
    left: calc(100% - 70px);
  }
}
</style>
