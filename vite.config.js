import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//elementPlus按需引入，下面三项
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //elementPlus按需引入配置，下面两项
    AutoImport({
      // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
      resolvers: [
        ElementPlusResolver({importStyle:"sass"})
      ],
    }),
    Components({
      // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
      resolvers: [
        ElementPlusResolver({importStyle:"sass"})
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css:{
		preprocessorOptions:{
			scss:{
				// 2.自动导入定制化样式文件进行样式覆盖
                //此处的值采用了模板字符串
				additionalData:`@use "@/styles/element/index.scss" as *;`,
			}
		}
	}
})
