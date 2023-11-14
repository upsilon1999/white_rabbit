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

  //获取人气推荐的数据
export const getHotAPI = () => {
    return httpInstance({
      url:'/home/hot',
          method:"get"
    })
  }


  //获取产品列表
export const getProductListAPI = ()=>{
	return httpInstance({
		url:"/home/goods",
		method:"get"
	})
}