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
