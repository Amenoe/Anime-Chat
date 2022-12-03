import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './stores'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
app.use(router)
app.use(store)

//注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//element国际化
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
