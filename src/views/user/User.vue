<template>
  <div id="user" class="page">
    <template v-if="isLogin">
      <el-tabs v-model="activeName" class="user-tabs">
        <el-tab-pane label="基本资料" name="userinfo">
          <AppForm :form-item="userInfoItem"></AppForm>
          <el-button type="danger" @click="logoutClick">退出登录</el-button>
        </el-tab-pane>
        <el-tab-pane label="修改信息" name="update">
          <AppForm ref="formRef" v-model="formData" :form-item="updateItem"></AppForm>
          <el-button type="danger" @click="updateClick">确认修改</el-button>
        </el-tab-pane>
        <el-tab-pane label="我的权限" name="role">普通用户</el-tab-pane>
      </el-tabs>
    </template>
    <template v-else>
      <h1>您还没有登录哦</h1>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/stores/modules/login'
import localCache from '@/utils/cache'
import { updateUserStatus } from '@/api/login'
import type { IFormItem } from '@/components/AppForm/type'
import AppForm from '@/components/AppForm/AppForm.vue'

const activeName = ref('userinfo')

// const handleClick = (tab: TabsPaneContext, event: Event) => {
//   console.log(tab, event)
// }
const loginStore = useLoginStore()

const isLogin = computed(() => {
  return loginStore.token !== ''
})
const userInfo = loginStore.userInfo

const userInfoItem: IFormItem[] = [
  {
    field: userInfo?.username || '',
    label: '用户名',
    type: 'text',
  },
  {
    field: userInfo?.nickname || '',
    label: '用户昵称',
    type: 'text',
  },
  {
    field: userInfo?.create_time || '',
    label: '创建时间',
    type: 'text',
  },
]

const updateItem: IFormItem[] = [
  {
    field: 'nickname',
    label: '用户昵称',
    type: 'input',
    placeholder: '请输入昵称',
    rules: [
      { required: true, message: '昵称不能为空', trigger: 'blur' },
      {
        pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,6}$/,
        message: '请输入正确的昵称',
        trigger: 'change',
      },
    ],
  },
  {
    field: 'password',
    label: '新密码',
    type: 'input',
    placeholder: '请输入新密码',
    rules: [
      { required: true, message: '密码不能为空', trigger: 'blur' },
      { pattern: /^[a-zA-Z0-9]{6,10}$/, message: '请输入正确的密码', trigger: 'change' },
    ],
  },
  {
    field: 'avatar',
    label: '头像',
    type: 'select',
    options: [
      { label: '1号头像', value: '/api/images/avatar(1).png' },
      { label: '2号头像', value: '/api/images/avatar(2).png' },
      { label: '3号头像', value: '/api/images/avatar(3).png' },
      { label: '4号头像', value: '/api/images/avatar(4).png' },
      { label: '5号头像', value: '/api/images/avatar(5).png' },
    ],
  },
]

const logoutClick = () => {
  if (loginStore.userInfo) {
    loginStore.userInfo.status = 0
    updateUserStatus(loginStore.userInfo.user_id, 0).then(() => {
      //修改状态信息为登出
      //重设pinia和localStorage
      loginStore.$reset()
      localCache.clearCache()
      ElNotification({
        type: 'success',
        title: '退出成功',
      })
    })
  }
}

const formData = ref({ nickname: '', password: '', avatar: '' })
const formRef = ref<InstanceType<typeof AppForm>>()
const updateClick = () => {
  console.log(formData.value)
  formRef.value?.elFormRef?.validate((valid: boolean) => {
    console.log(valid)
    if (valid) {
      loginStore.updateUserAction(loginStore.userInfo!.user_id, formData.value).then(() => {
        ElNotification({
          type: 'success',
          title: '更新成功',
        })
      })
    }
  })
}
</script>

<style scoped lang="less">
@import '~styles/page';

// 去掉选项卡线条
:deep(.el-tabs__nav-wrap)::after {
  position: static !important;
}
//修改字体
:deep(.el-tabs__item) {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}
:deep(.el-tabs__item:hover) {
  color: var(--primary-color);
}
//选中
:deep(.is-active) {
  color: var(--primary-color);
}
//下划线
:deep(.el-tabs__active-bar) {
  background-color: var(--primary-color);
}
</style>
