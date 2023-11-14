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

//引入vueUse 监听目标元素可变性的插件
import { useIntersectionObserver } from '@vueuse/core'

app.use(createPinia())

app.use(router)

app.mount('#app')


// 定义全局指令
// 第一个参数是指令名字
// 第二个是具体的配置对象
app.directive("img-lazy",{
	mounted(el,binding){
		//el 指令绑定的元素
		//binding 指令对象
		//binding.value 指令表达式后面的值
		// console.log(el);
		// console.log(binding);
		useIntersectionObserver(
      el,
      ([{ isIntersecting }]) => {
      // isIntersecting 布尔值，元素进入视口区域为true，反之false
        console.log(isIntersecting)
        if (isIntersecting) {
                //进入视口区域
                el.src = binding.value
        }
      },
    )
	}
})
