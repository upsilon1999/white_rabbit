// 导入实例
import httpInstance from '@/utils/http'

// 获取banner
export function getBannerAPI(){
	return httpInstance({
		url:"/home/banner",
		method:"get"
	})
}