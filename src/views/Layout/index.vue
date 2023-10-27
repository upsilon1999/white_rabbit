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
  <LayoutSticky/>
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>
