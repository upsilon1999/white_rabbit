# 兔儿鲜前端Vue3

## 项目起步

### 项目初始化

```sh
npm init vue@latest
# 项目名字和相关配置
# VueRouter、Pinia、ESLint都打开，其他不需要
```

### src目录调整

>初始目录

```sh
assets
components
router
stores
views
```

>新增目录

```sh
"apis"
API接口文件夹封装接口函数，根据业务进行拆分

"composables"
组合函数文件夹，一些通用的逻辑函数

"directives"
全局指令文件夹

"styles"
全局样式文件夹

"utils"
工具函数文件夹
```

### git管理

如果没有`.git`目录就进行如下设置

```sh
git init

# 暂存所有
git add .

# 第一次初始化更改
git commit -m 'init'

# 关联远程仓库
git remote add <名称> <地址>
#示例
git remote add origin https://gitee.com/lmrybc49/white-rabbit.git   

# 推送到远程仓库
git push <名称>
#示例
git push -u origin "master" 
```

### 配置别名路径联想提示

```sh
在编写代码的过程中，一旦输入`@/`,VScode会立刻联想出`src下的所有子目录和文件`

优势：统一文件路径，访问不容易出错
```

>如何配置

```sh
1.在项目的`根目录`下新增"jsconfig.json"文件
2.添加json格式的配置项，如下
```

```json
{
	"compilerOptions": {
		"baseUrl": "./",
		"paths": {
			"@/*":[
				"src/*"
			]
		}
	}
}
```

讲解

```sh
baseUrl 配置路径，我们采用"./",即把"jsconfig.json"所在路径设置为根路径

"paths"设置转义路径组
"@/*":["src/*"]  所有"@/"目录都会转义成"src/",最终就变成了去寻找根路径下的"src/"，因为我们把"jsconfig.json"所在路径设置为根路径，所以就找到了
```

注意这个配置只是联想提示，他并不是真的配置路径

#### 联想路径配置

`vite.config.js`

```js
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
	//实际的路径转换  @ -> src
    //别名路径配置项
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

>核心

```js
resolve: {
    //实际的路径转换 @ -> src
    //别名路径配置项
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
}
```

>提交

```sh
git commit -m "完成别名联想设置"
```

### elementPlus引入

根据文档决定引入方式

```sh
https://element-plus.org/zh-CN/
```

#### 添加ElementsPlus到项目(按需引入)

>安装

```sh
npm install element-plus --save
```

>按需引入

```sh
# 目的减少打包体积
npm install -D unplugin-vue-components unplugin-auto-import
```

> vite要采取的配置

官网

```js
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

实际，`vite.config.js`

```js
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
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
		//实际的路径转换 @ -> src
		//别名路径配置项
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

>理解

```sh
这是自动按需引入，要组件需要使用的地方直接使用即可，不需要显式的import，他会帮我们自动按需要引入
```

>git

```sh
git commit -m "elementPlus自动按需引入"
```

### elementPlus主题定制

>原因

有时候我们项目默认的主题色可能会与elementsPlus默认的主题色存在冲突，通过定制主题让elementsPlus的主题色和项目保持一致

#### 如何定制(scss变量替换方案)

官方有提供定制方案

```sh
https://element-plus.org/zh-CN/guide/theming.html
```

我们采用Scss变量替换方案

>安装scss

```sh
npm i sass -D
```

>准备定制样式文件

`styles/element/index.scss`

```scss
// 只需要重写需要的即可
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
	$colors:  (
    'white': #ffffff,
    'black': #000000,
    'primary': (
			//主题色
      'base': #27ba9b,
    ),
    'success': (
			//成功
      'base': #1dc779,
    ),
    'warning': (
			//警告
      'base': #ffb302,
    ),
    'danger': (
			//危险
      'base': #e26237,
    ),
    'error': (
			//错误
      'base': #cf4444,
    ),
    'info': (
			//信息
      'base': #909399,
    ),
  ),
);
```

推荐把源码部分粘贴过来再改，源码在

```sh
node_modules/element-plus/theme-chalk/src/common/var.scss

因为一个逗号或者一个分号出错，都会报错，还无法定位，例如我修改的时候报错

$color2: null is not a color
这个是源码遍历生成的东西，具体的报错原因是冒号问题
```

```sh
$colors : (
    'white': #ffffff,
    'black': #000000,
    'primary': (
      //主题色
      'base': #27ba9b,
    ),
    'success': (
        //成功
        'base': #1dc779,
    ),
    'warning': (
        //警告
        //上面错误的原因，此处的冒号是中文冒号
        'base'：#ffb302,
    ),
    'danger': (
        //危险色
        'base': #e26237,
    ),
    'error': (
        //错误色
        'base': #cf4444,
    ),
    'info': (
        'base': #909399,
    ),
),
```

>对ElementPlus样式进行覆盖

```sh
1.通知Element采用scss语言
2.导入定制scss文件覆盖
```

`vite.config.js`

```js
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
        AutoImport({
          // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
            resolvers: [
                ElementPlusResolver({importStyle:"sass"})
            ],
        }),
        Components({
          resolvers: [
                    //1.配置elementPlus采用sass样式配色系统
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
```

>git

```sh
git commit -m "elementsPlus主题的定制"
```

### axios基础配置

>安装axios

```sh
npm i axios
```

>配置基础实例(统一接口配置)

```sh
1.接口基地址
2.接口超时时间
3.请求拦截器
4.响应拦截器
```

#### 简易配置

`utils/http.js`

```js
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
```

目前只是简易封装，后续根据业务完善拦截器

#### API测试

`apis/testAPI.js`

```js
import httpInstance from "@/utils/http";

export function getCategoryAPI(){
	return httpInstance({
		url:"home/category/head"
	})
}
```

`App.vue`

```vue
<script setup>
import {getCategoryAPI} from "@/apis/testAPI"
import {ref} from "vue"

const msg = ref("")
const getData = ()=>{
	getCategoryAPI().then(res=>{
		console.log(res);
	})
}

</script>

<template>
  <header>
    <el-button type="primary" @click="getData">点我获取数据</el-button>
  </header>
</template>

<style scoped>
</style>
```

>git管理

```sh
git commit -m "axios基础配置"
```

### 项目路由设计

#### 设计首页和登录页的路由(一级路由)

>路由设计原则

```sh
找内容切换的区域，如果是"页面整体切换"，则为一级路由
```

>设置对应的路由组件

首页 -- `views/Layout/index.vue`

```vue
<template>
	<div>我是首页</div>
</template>
```

登录页--`views/Login/index.vue`

```vue
<template>
	<div>我是登录页</div>
</template>
```

由于eslint默认组件采用小写加短杆分隔的方式，所以会报红，我们可以对其进行配置

`.eslintrc.cjs`在项目根目录下

```js
/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
	rules:{
		//不再强制要求组件命令
		//eslint默认组件采用小写加中间短杆的形式
		'vue/multi-word-component-names':0,
	}
}
```

##### 路由的设置

`router/index.js`先进行清空方便配置

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
		
  ]
})

export default router
```

>配置路由

```js
//createRouter 创建router实例对象
//createWebHistory 创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
//导入组件
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
	//path和component对应关系的位置
  routes: [
		{
			path:"/",
			component:Layout
		},
		{
			path:"/login",
			component:Login
		}
  ]
})

export default router
```

>配置路由出口

`App.vue`

```vue
<script setup>

</script>

<template>
 
	<!-- 一级路由出口组件 -->
	<RouterView></RouterView>
</template>

<style scoped>
</style>
```

#### 设计分类页和默认Home页路由(二级路由)

>路由设计原则

```sh
找内容切换的区域，如果是在"一级路由页的内部切换"，则为二级路由
```

##### 路由设置

>设置对应的路由组件

首页 -- `views/Home/index.vue`

```vue
<template>
	<div>我是home页面</div>
</template>
```

登录页--`views/Login/index.vue`

```vue
<template>
	<div>我是Category页</div>
</template>
```

>配置路由

```js
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
					// 故意写个空字符串，那么默认使用他
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
```

故意给空字符串，则访问`/`时默认加载他，即设置默认二级路由

>路由出口

`Layout.vue`

```vue
<template>
	<div>
		我是首页
		<!-- 二级路由出口 -->
		<RouterView/>
	</div>
</template>
```

#### 路由设计总结

>路由设计的依据是什么?

```sh
内容切换的方式
```

>默认二级路由如何进行设置

```sh
将path配置项置空
```

>git

```sh
git commit -m "项目路由设计"
```

### 静态资源引入和ErrorLen安装

#### 说明

>资源说明

```sh
1.实际工作中图片资源通常由UI设计师提供，常见的图片格式有png，svg等都是由UI切图交给前端
2.样式资源通常是指项目初始化的时候进行样式的重置，常见的比如开源的`normalize.css`或者手写
```

>资源操作

```sh
1.图片资源 - 把images文件夹放到assets目录下
2.样式资源 - 把common.scss文件放到styles目录下
```

`common.scss`

```scss
// 重置样式
* {
  box-sizing: border-box;
}

html {
  height: 100%;
  font-size: 14px;
}
body {
  height: 100%;
  color: #333;
  min-width: 1240px;
  font: 1em/1.4 'Microsoft Yahei', 'PingFang SC', 'Avenir', 'Segoe UI',
    'Hiragino Sans GB', 'STHeiti', 'Microsoft Sans Serif', 'WenQuanYi Micro Hei',
    sans-serif;
}
body,
ul,
h1,
h3,
h4,
p,
dl,
dd {
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  color: #333;
  outline: none;
}
i {
  font-style: normal;
}
input[type='text'],
input[type='search'],
input[type='password'],
input[type='checkbox'] {
  padding: 0;
  outline: none;
  border: none;
  -webkit-appearance: none;
  &::placeholder {
    color: #ccc;
  }
}
img {
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
  background: #ebebeb url('@/assets/images/200.png') no-repeat center / contain;
}
ul {
  list-style: none;
}

#app {
  background: #f5f5f5;
  user-select: none;
}

.container {
  width: 1240px;
  margin: 0 auto;
  position: relative;
}
.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.ellipsis-2 {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.clearfix:after {
  content: '.';
  display: block;
  visibility: hidden;
  height: 0;
  line-height: 0;
  clear: both;
}

// reset element
.el-breadcrumb__inner.is-link {
  font-weight: 400 !important;
}
```

#### 重置样式

在入口文件引入`common.scss`

`main.js`

```js
// 之前默认的样式不需要
// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引入初始化样式文件
import '@/styles/common.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
```

#### 安装error lens

```sh
"Error Lens"是一个实时提供错误警告信息的VScode插件，方便开发
```

>git

```sh
git commit -m "静态资源的引入和error插件安装"
```

### scss文件自动导入

>原因

```sh
在项目里一些组件共享的色值会以scss变量的方式统一放到一个名为var.scss的文件中，正常组件使用，需要"先导入scss文件，要使用内部的变量"，比较繁琐,自动导入"可以免去手动导入的步骤，直接使用内部的变量"。
```

>使用

`App.vue`

```vue
<script setup>

</script>

<template>
	<div class="test">
		test
	</div>
	<!-- 一级路由出口组件 -->
	<RouterView></RouterView>
</template>

<style lang="scss" scoped>
@import '@/styles/var.scss'
.test {
	color:$priceColor;
}
</style>
```

### 自动导入配置

```sh
1.新增一个var.scss文件，存入色值变量
```

`styles/var.scss`

```scss
$xtxColor:#27ba9b;
$helpColor:#e26237;
$sucColor:#1dc779;
$warnColor:#ffb302;
$priceColor:#cf4444;
```

```sh
2.通过vite.config.js配置自动导入文件
```

```js
css:{
    preprocessorOptions:{
        scss:{
            // 2.自动导入定制化样式文件进行样式覆盖
            //此处的值使用了模板字符串
            additionalData:`
                @use "@/styles/element/index.scss" as *;
                @use "@/styles/var.scss" as *;
            `,
        }
    }
},
```

>完整配置

```js
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
      resolvers: [
				//1.配置elementPlus采用sass样式配色系统
				ElementPlusResolver({importStyle:"sass"})
			],
    })
  ],
  resolve: {
		//实际的路径转换 @ -> src
		//别名路径配置项
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
	css:{
		preprocessorOptions:{
			scss:{
				// 2.自动导入定制化样式文件进行样式覆盖
				//此处的值使用了模板字符串
				additionalData:`
					@use "@/styles/element/index.scss" as *;
					@use "@/styles/var.scss" as *;
				`,
			}
		}
	},
})
```

>测试使用

`App.vue`

配置了自动导入之后，我们就不用再手动导入了，直接使用就可以

```vue
<script setup>

</script>

<template>
	<div class="test">
		test
	</div>
	<!-- 一级路由出口组件 -->
	<RouterView></RouterView>
</template>

<style lang="scss" scoped>
.test{
	color:$priceColor;
}
</style>
```

>git

```sh
git commit -m "scss文件的自动导入"
```

## Layout

### 静态模板结构搭建

采取就近原则，在Layout文件夹下新建components文件夹，然后建立下述组件

`LayoutNav.vue`

```vue
<script setup>

</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="true">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>周杰伦</a></li>
          <li>
            <el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;">我的订单</a></li>
          <li><a href="javascript:;">会员中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
```

`LayoutHeader.vue`

```vue
<script setup>

</script>

<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">小兔鲜</RouterLink>
      </h1>
      <ul class="app-header-nav">
        <li class="home">
          <RouterLink to="/">首页</RouterLink>
        </li>
        <li> <RouterLink to="/">居家</RouterLink> </li>
        <li> <RouterLink to="/">美食</RouterLink> </li>
        <li> <RouterLink to="/">服饰</RouterLink> </li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
      <!-- 头部购物车 -->
      
    </div>
  </header>
</template>


<style scoped lang='scss'>
.app-header {
  background: #fff;

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    }
  }

  .app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;
  
    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;
  
      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
  
        &:hover {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;
        }
      }
  
      .active {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }
  }

  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;

    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }

    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }

  .cart {
    width: 50px;

    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      .icon-cart {
        font-size: 22px;
      }

      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: $helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
</style>
```

`LayoutFooter.vue`

```vue
<template>
  <footer class="app_footer">
    <!-- 联系我们 -->
    <div class="contact">
      <div class="container">
        <dl>
          <dt>客户服务</dt>
          <dd><i class="iconfont icon-kefu"></i> 在线客服</dd>
          <dd><i class="iconfont icon-question"></i> 问题反馈</dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd><i class="iconfont icon-weixin"></i> 公众号</dd>
          <dd><i class="iconfont icon-weibo"></i> 微博</dd>
        </dl>
        <dl>
          <dt>下载APP</dt>
          <dd class="qrcode"><img src="@/assets/images/qrcode.jpg" /></dd>
          <dd class="download">
            <span>扫描二维码</span>
            <span>立马下载APP</span>
            <a href="javascript:;">下载页面</a>
          </dd>
        </dl>
        <dl>
          <dt>服务热线</dt>
          <dd class="hotline">400-0000-000 <small>周一至周日 8:00-18:00</small></dd>
        </dl>
      </div>
    </div>
    <!-- 其它 -->
    <div class="extra">
      <div class="container">
        <div class="slogan">
          <a href="javascript:;">
            <i class="iconfont icon-footer01"></i>
            <span>价格亲民</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer02"></i>
            <span>物流快捷</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer03"></i>
            <span>品质新鲜</span>
          </a>
        </div>
        <!-- 版权信息 -->
        <div class="copyright">
          <p>
            <a href="javascript:;">关于我们</a>
            <a href="javascript:;">帮助中心</a>
            <a href="javascript:;">售后服务</a>
            <a href="javascript:;">配送与验收</a>
            <a href="javascript:;">商务合作</a>
            <a href="javascript:;">搜索推荐</a>
            <a href="javascript:;">友情链接</a>
          </p>
          <p>CopyRight © 小兔鲜儿</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang='scss'>
.app_footer {
  overflow: hidden;
  background-color: #f5f5f5;
  padding-top: 20px;

  .contact {
    background: #fff;

    .container {
      padding: 60px 0 40px 25px;
      display: flex;
    }

    dl {
      height: 190px;
      text-align: center;
      padding: 0 72px;
      border-right: 1px solid #f2f2f2;
      color: #999;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        border-right: none;
        padding-right: 0;
      }
    }

    dt {
      line-height: 1;
      font-size: 18px;
    }

    dd {
      margin: 36px 12px 0 0;
      float: left;
      width: 92px;
      height: 92px;
      padding-top: 10px;
      border: 1px solid #ededed;

      .iconfont {
        font-size: 36px;
        display: block;
        color: #666;
      }

      &:hover {
        .iconfont {
          color: $xtxColor;
        }
      }

      &:last-child {
        margin-right: 0;
      }
    }

    .qrcode {
      width: 92px;
      height: 92px;
      padding: 7px;
      border: 1px solid #ededed;
    }

    .download {
      padding-top: 5px;
      font-size: 14px;
      width: auto;
      height: auto;
      border: none;

      span {
        display: block;
      }

      a {
        display: block;
        line-height: 1;
        padding: 10px 25px;
        margin-top: 5px;
        color: #fff;
        border-radius: 2px;
        background-color: $xtxColor;
      }
    }

    .hotline {
      padding-top: 20px;
      font-size: 22px;
      color: #666;
      width: auto;
      height: auto;
      border: none;

      small {
        display: block;
        font-size: 15px;
        color: #999;
      }
    }
  }

  .extra {
    background-color: #333;
  }

  .slogan {
    height: 178px;
    line-height: 58px;
    padding: 60px 100px;
    border-bottom: 1px solid #434343;
    display: flex;
    justify-content: space-between;

    a {
      height: 58px;
      line-height: 58px;
      color: #fff;
      font-size: 28px;

      i {
        font-size: 50px;
        vertical-align: middle;
        margin-right: 10px;
        font-weight: 100;
      }

      span {
        vertical-align: middle;
        text-shadow: 0 0 1px #333;
      }
    }
  }

  .copyright {
    height: 170px;
    padding-top: 40px;
    text-align: center;
    color: #999;
    font-size: 15px;

    p {
      line-height: 1;
      margin-bottom: 20px;
    }

    a {
      color: #999;
      line-height: 1;
      padding: 0 10px;
      border-right: 1px solid #999;

      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
```

>在Layout的文件下的`index.vue`的引入

`@/views/Layout/index.vue`

```vue
<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
</script>

<template>
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>
```

>git 

```sh
git commit -m "layout-静态结构的搭建"
```

### 字体图标的引入

>图标来源

```sh
阿里图标库
```

>引入方式

```sh
"font-class"引用

# 这是一种不安全的引入方式，目前采用这个，后续会修改
```

>步骤

```sh
https://www.iconfont.cn/
==> 
帮助 
==> 
代码应用
==>
web应用
==>
font-class
```

第一步：拷贝项目下面生成的fontclass代码：

```sh
# 把图标选中后加入我们在阿里图标库中建立的项目
# 会生成一个css链接

//at.alicdn.com/t/font_8d5l8fzk5b87iudi.css

#把上述路径在index.html中引入
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite App</title>
		<link rel="stylesheet" href="//at.alicdn.com/t/font_8d5l8fzk5b87iudi.css">
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

第二步：挑选相应图标并获取类名，应用于页面：

```css
<i class="iconfont icon-xxx"></i>
```

>ps

```sh
本人的项目暂时不采用这种方式
```

### 使用element-plus的图标

由于element-plus的自动导入图标经常异常，所以使用全局导入图标库的方式

>安装图标组件

```sh
npm i @element-plus/icons-vue -S
```

>`main.js`

全局注册

```js
import * as Elicons from '@element-plus/icons-vue';

const app = createApp(App);
const pinia = createPinia();
//全局注册elementplus icon
Object.keys(Elicons).forEach((key) => {
  app.component(key, Elicons[key]);
});
/*
Object.keys(Elicons).forEach((key) => {
   如果使用的是ts语法，加上as keyof typeof Elicons可避免报错
  app.component(key, Elicons[key as keyof typeof Elicons]);
});
*/
```

>组件中的使用

```vue
<template v-if="true">
  <li><a href="javascript:;">
      <el-icon>
        <User />
      </el-icon>
      周杰伦</a></li>
  <li>
    <el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
      <template #reference>
        <a href="javascript:;">退出登录</a>
      </template>
    </el-popconfirm>
  </li>
  <li><a href="javascript:;">我的订单</a></li>
  <li><a href="javascript:;">会员中心</a></li>
</template>
```

>核心

```sh
<el-icon>
	<User />
</el-icon>
#由于全局注册了，所以无需导入
# 可以直接在 el-icon上加样式
```

>git

```sh
git commit -m "学习使用阿里图标以及引入element-plus图标"
```

### 一级导航渲染

>需求

```sh
使用后端接口渲染一级路由导航
```

>实现步骤

```sh
1.根据接口文档封装接口函数
2.发送请求获取数据列表
3.v-for渲染页面
```

>封装请求API

`@/apis/layout.js`

```sh
import httpInstance from "@/utils/http";

export function getCategoryAPI(){
	return httpInstance({
		url:"/home/category/head",
		method:"get"
	})
}
```

>发送请求，获取数据

```vue
<script setup>
import { getCategoryAPI } from '@/apis/layout'
import { onMounted, ref } from 'vue';

// 用于存放一级导航路由列表方便生成
const categoryList = ref([])


const getCategory = async () => {
	// 发送请求
  const res = await getCategoryAPI()
  console.log(res);
  categoryList.value = res.data.result
}

onMounted(() => {
	// 组件挂载完成后得到一级导航路由列表
  getCategory()
})
</script>
```

>渲染列表

```vue
<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">小兔鲜</RouterLink>
      </h1>
      <ul class="app-header-nav">
				<!-- 渲染生成列表 -->
        <li class="home" v-for="item in categoryList" :key="item.id">
          <RouterLink to="/">{{item.name}}</RouterLink>
        </li>

      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
      <!-- 头部购物车 -->

    </div>
  </header>
</template>
```

链接跳转地址也应该生成

>git

```sh
git commit -m "一级导航路由渲染"
```

### 吸顶导航的交互实现

>需求

```sh
浏览器在上下滚动的过程中，如果距离顶部的滚动距离大于78px,吸顶导航显示，小于78px隐藏

#虽然用粘性定位就可以实现，但是组件化的可扩展性更高
```

>步骤

```sh
准备吸顶组件 ==> 获取滚动距离 ==> 以滚动距离做判断条件控制组建盒子展示隐藏
```

>新建组件被构建静态结构

`@/views/Layout/components/LayoutSticky.vue`

```vue
<script setup>

</script>

<template>
<!-- 当有show这个样式时进行展示，反之隐藏 -->
  <div class="app-header-sticky">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!-- 导航区域 -->
      <ul class="app-header-nav ">
        <li class="home">
          <RouterLink to="/">首页</RouterLink>
        </li>
        <li>
          <RouterLink to="/">居家</RouterLink>
        </li>
        <li>
          <RouterLink to="/">美食</RouterLink>
        </li>
        <li>
          <RouterLink to="/">服饰</RouterLink>
        </li>
        <li>
          <RouterLink to="/">母婴</RouterLink>
        </li>
        <li>
          <RouterLink to="/">个护</RouterLink>
        </li>
        <li>
          <RouterLink to="/">严选</RouterLink>
        </li>
        <li>
          <RouterLink to="/">数码</RouterLink>
        </li>
        <li>
          <RouterLink to="/">运动</RouterLink>
        </li>
        <li>
          <RouterLink to="/">杂项</RouterLink>
        </li>
      </ul>

      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 此处为关键样式!!!
  // 状态一：往上平移自身高度 + 完全透明
  transform: translateY(-100%);
  opacity: 0;

  // 状态二：移除平移 + 完全不透明
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 80px;
    background: url("@/assets/images/logo.png") no-repeat right 2px;
    background-size: 160px auto;
  }

  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid $xtxColor;

    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;

      &:hover {
        color: $xtxColor;
      }
    }
  }
}

.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;

      &:hover {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }

    .active {
      color: $xtxColor;
      border-bottom: 1px solid $xtxColor;
    }
  }
}
</style>
```

>在`Layout/index.vue`引入

```vue
<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutSticky from './components/LayoutSticky.vue';
</script>

<template>
	<LayoutSticky/>
    <LayoutNav />
    <LayoutHeader />
    <RouterView />
    <LayoutFooter />
</template>
```

#### 目标

```sh
控制class名为"app-header-sticky"的div上根据条件动态添加show样式
```

>认识插件

```sh
VueUse
# 官方封装的一个函数库，需要安装插件使用
http://www.vueusejs.com/
```

>安装

```sh
npm i @vueuse/core
```

>使用里面的钩子

```sh
useScroll
# 教程使用
http://www.vueusejs.com/core/useScroll/
```

#### 步骤

>安装并使用vueUse插件

```sh
npm i @vueuse/core
```

>使用useScroll钩子

```vue
<script setup>
// 使用vueUse的库
import { useScroll } from '@vueuse/core'

/* 
  useScroll(①)
  ①DOM对象，
  获得DOM对象滚动时的状态
*/
// y DOM对象在垂直方向上滚动的距离
const { y } = useScroll(window)

//返回的值是自带响应式的
</script>
```

>动态样式控制

```vue
<template>
  <!-- 当有show这个样式时进行展示，反之隐藏 -->
  <!-- 通过动态class控制来实现 -->
  <div class="app-header-sticky" :class="{show:y>78}">
      ...
    </div>
</template>
```

>git管理

```sh
git commit -m "吸顶效果的实现和vueUse的使用"
```

### Pinia优化重复请求

>问题背景

```sh
我们的顶部导航和吸顶导航用到的导航列表是一致的,但是要发送两次网络请求，存在浪费。通过pinia集中管理数据，再把数据给组件使用。
```

>思路

```sh
把Layout组件的请求放到pinia的action中，将获取到的数据存到state，然后在由LayoutHeader和LayoutSticky调用
之所以选择Layout组件发送请求，是因为他是两个导航组件共同的父组件，状态提升
```

>建立列表仓库

在仓库里发起请求并暴露请求方法和列表值

`@/store/category.js`

```js
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
```

>Layout组件发送请求

Layout组件发送请求获取数据,使得仓库里面存的值修改,两个子组件访问仓库,获取数据

`@/views/Layout/index.vue`

```vue
<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutSticky from './components/LayoutSticky.vue';

// 触发获取导航列表的action
import { useCategoryStore } from '@/stores/category';
import { onMounted } from 'vue';

// 获取pinia仓库实例,方法和状态都在这个对象身上
const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.getCategory()
})
</script>

<template>
  <LayoutSticky />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>
```

>LayoutHeader

`@/views/Layout/components/LayoutHeader.vue`

```vue
<script setup>
//使用pinia里面的数据 
import { useCategoryStore } from '@/stores/category';

//获得pinia仓库实例 
const categoryStore = useCategoryStore()
</script>

<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">小兔鲜</RouterLink>
      </h1>
      <ul class="app-header-nav">
        <!-- 渲染生成列表 -->
        <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
          <RouterLink to="/">{{item.name}}</RouterLink>
        </li>

      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
      <!-- 头部购物车 -->

    </div>
  </header>
</template>
```

>LayoutSticky

`@/views/Layout/components/LayoutSticky.vue`

```vue
<script setup>
// 使用vueUse的库
import { useScroll } from '@vueuse/core'
//使用pinia里面的数据 
import { useCategoryStore } from '@/stores/category';


/* 
  useScroll(①)
  ①DOM对象，
  获得DOM对象滚动时的状态
*/
// y DOM对象在垂直方向上滚动的距离
// 返回的值是自带响应式的
const { y } = useScroll(window)


//获得pinia仓库实例 
const categoryStore = useCategoryStore()
</script>

<template>
  <!-- 当有show这个样式时进行展示，反之隐藏 -->
  <!-- 通过动态class控制来实现 -->
  <div class="app-header-sticky" :class="{show:y>78}">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!-- 导航区域 -->
      <ul class="app-header-nav ">
        <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
          <RouterLink to="/">{{item.name}}</RouterLink>
        </li>
      </ul>

      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>
```

>git管理

```sh
git commit -m "利用pinia优化重复请求"
```

## Home

### 整体结构搭建

```sh
在@/views/Home下新建components文件夹,建立五个组件
HomeCategory.vue
HomeBanner.vue
HomeNew.vue
HomeProduct.vue
HomeHot.vue
```

>`@/views/Home/index.vue`

```vue
<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import homeProduct from './components/HomeProduct.vue'
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <homeProduct />
</template>
```

>git管理

```sh
git commit -m "home-整体结构搭建"
```

### 分类实现

>思路

```sh
准备好模板,然后用pinia的数据进行渲染
```

>`@/views/Home/components/HomeCategory.vue`准备模板

```vue
<script setup>

</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in 9" :key="item">
        <RouterLink to="/">居家</RouterLink>
        <RouterLink v-for="i in 2" :key="i" to="/">南北干货</RouterLink>
        <!-- 弹层layer位置 -->
        <div class="layer">
          <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li v-for="i in 5" :key="i">
              <RouterLink to="/">
                <img alt="" />
                <div class="info">
                  <p class="name ellipsis-2">
                    男士外套
                  </p>
                  <p class="desc ellipsis">男士外套，冬季必选</p>
                  <p class="price"><i>¥</i>200.00</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>


<style scoped lang='scss'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;

      &:hover {
        background: $xtxColor;
      }

      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }

      .layer {
        width: 990px;
        height: 500px;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        left: 250px;
        top: 0;
        display: none;
        padding: 0 15px;

        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;

          small {
            font-size: 16px;
            color: #666;
          }
        }

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            width: 310px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;

            &:nth-child(3n) {
              margin-right: 0;
            }

            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;

              &:hover {
                background: #e3f9f4;
              }

              img {
                width: 95px;
                height: 95px;
              }

              .info {
                padding-left: 10px;
                line-height: 24px;
                overflow: hidden;

                .name {
                  font-size: 16px;
                  color: #666;
                }

                .desc {
                  color: #999;
                }

                .price {
                  font-size: 22px;
                  color: $priceColor;

                  i {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }

      // 关键样式  hover状态下的layer盒子变成block
      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>
```

>通过pinia数据进行分类渲染

`@/views/Home/components/HomeCategory.vue`

```vue
<script setup>
import { useCategoryStore } from '@/stores/category'
import { storeToRefs } from 'pinia'
// 创建pinia实例
const categoryStore = useCategoryStore()

//从实例中解构
const { categoryList } = storeToRefs(categoryStore)
</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in categoryList" :key="item.id">
        <RouterLink to="/">{{item.name}}</RouterLink>
        <RouterLink v-for="i in item.children.slice(0,2)" :key="i.id" to="/">{{i.name}}</RouterLink>
        <!-- 弹层layer位置 -->
        <div class="layer">
          <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li v-for="i in item.goods" :key="i.id">
              <RouterLink to="/">
                <img alt="" :src="i.picture" />
                <div class="info">
                  <p class="name ellipsis-2">
                    {{i.name}}
                  </p>
                  <p class="desc ellipsis">{{ i.desc }}</p>
                  <p class="price"><i>¥</i>{{i.price}}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
```

>git

```sh
git commit -m "Home-分类的实现"
```

### 理解

对图片歌曲的音视频的渲染

```sh
只需要给前端一个可以访问的路径即可,例如
http://192.40.10.14/home/xxx.png

路径由后端返回,通过path模块等能得到文件路径的方法即可,存放的时候也往该目录写入,然后把存放的目录写入数据库

建议存相对路径,http://182.40.10.14这种写成可调的全局变量,方便后期文件的迁移.

因为实际资源是存放在服务器的文件夹下的,和服务器读写速度和用户网络环境有关.
```

### banner轮播图功能实现

>步骤

```sh
准备模板 --> 熟悉elementPlus相关组件 --> 获取接口数据 --> 渲染组件
```

>banner模板

`@/views/Home/components/HomeBanner.vue`

```vue
<script setup>

</script>



<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/6d202d8e-bb47-4f92-9523-f32ab65754f4.jpg" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  /*绝对定位，来实现偏移*/
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
```

>熟悉element-Plus组件

```vue
<el-carousel height="500px">
   <el-carousel-item v-for="item in 4" :key="item">
		
   </el-carousel-item>
</el-carousel>
```

```sh
el-carousel 是轮播图外部盒子
el-carousel-item 是轮播图的每一项
```

>获取轮播图数据

```sh
```



















