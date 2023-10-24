// axios基础的封装
import axios from 'axios'

// 创建axios实例并传入配置对象
const httpInstance = axios.create({
	//请求基础路径
	baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
	//超时时间
	timeout:5000
})

//axios请求拦截器
httpInstance.interceptors.request.use(config=>{
	return config
},e=>Promise.reject(e))


// axios响应拦截器
httpInstance.interceptors.response.use(config=>{
	return config
},e=>Promise.reject(e))


//暴露axios实例
export default httpInstance