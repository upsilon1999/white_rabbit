// 用于定义store
import {defineStore} from "pinia"
import { getCategoryAPI } from '@/apis/layout'
import { ref } from 'vue';
export const useCategoryStore = defineStore("useCategory",()=>{
		// 用于存放一级导航路由列表方便生成
		//state 导航列表数据
		const categoryList = ref([])

		//action 获取导航列表的方法
		const getCategory = async () => {
			// 发送请求
			const res = await getCategoryAPI()
			console.log(res);
			categoryList.value = res.data.result
		}

		// 暴露
		return {
			categoryList,
			getCategory
		}

})