//引入vueUse 监听目标元素可变性的插件
import { useIntersectionObserver } from '@vueuse/core'

// 定义懒加载指令
export const lazyPlugin = {
	install(app){
		//懒加载指令逻辑
		// 第一个参数是指令名字
		// 第二个是具体的配置对象
		app.directive("img-lazy",{
			mounted(el,binding){
				//el 指令绑定的元素
				//binding 指令对象
				//binding.value 指令表达式后面的值,这里存储着图片地址
				//因为我们的用法 v-img-lay="" 替换了 src=""

				// console.log(el)
				// console.log(binding);
				const {stop} =useIntersectionObserver(
					el,
					([{ isIntersecting }]) => {
						// isIntersecting 布尔值，元素进入视口区域为true，反之false
						console.log(isIntersecting)
						if (isIntersecting) {
								//进入视口区域
								el.src = binding.value

								stop()
						}
					},
				)
			}
		})
	}
}