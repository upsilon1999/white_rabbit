//createRouter 创建router实例对象
//createWebHistory 创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
//导入组件
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
	//path和component对应关系的位置
  routes: [
		{
			path:"/",
			component:Layout,
			children:[
				{
					// 故意写个空字符串，设置默认的二级路由
					path:'',
					component:Home
				},
				{
					path:"category",
					component:Category
				}
			]
		},
		{
			path:"/login",
			component:Login,
		}
  ]
})

export default router

