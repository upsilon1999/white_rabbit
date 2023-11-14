import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引入初始化样式文件
import '@/styles/common.scss'

import * as Elicons from '@element-plus/icons-vue';
const app = createApp(App)
//全局注册elementplus icon
Object.keys(Elicons).forEach((key) => {
    app.component(key, Elicons[key]);
});

//引入懒加载指令插件并且注册
import {lazyPlugin} from '@/directives/imgLazy.js'
app.use(lazyPlugin)

app.use(createPinia())

app.use(router)

app.mount('#app')


