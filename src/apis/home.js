// 导入实例
import httpInstance from '@/utils/http'

// 获取banner
export function getBannerAPI(){
	return httpInstance({
		url:"/home/banner",
		method:"get"
	})
}

//获取新鲜好物的数据
export const findNewAPI = () => {
    return httpInstance({
      url:'/home/new',
          method:"get"
    })
  }