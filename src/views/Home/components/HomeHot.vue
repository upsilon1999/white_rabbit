<script setup>
//封装好的面板组件
import HomePanel from '../components/HomePanel.vue'
//获取新鲜好物数据的API
import { getHotAPI } from '@/apis/home'
import { onMounted, ref } from "vue"
// 新鲜好物列表
let hotList = ref([])

//获取数据
const getHotList = async () => {
  let res = await getHotAPI()
  console.log(res);
  hotList.value = res.data.result
}

//挂载完成获取数据
onMounted(() => getHotList())
</script>

<template>

  <!-- 下面是插槽主体内容模版
  <ul class="goods-list">
    <li v-for="item in hotList" :key="item.id">
      <RouterLink to="/">
        <img :src="item.picture" alt="" />
       	<p class="name">{{ item.title }}</p>
		<p class="desc">{{ item.alt }}</p>
      </RouterLink>
    </li>
  </ul>
  -->
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <ul class="goods-list">
      <li v-for="item in hotList" :key="item.id">
        <RouterLink to="/">
          <img :src="item.picture" alt="" />
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all 0.5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>