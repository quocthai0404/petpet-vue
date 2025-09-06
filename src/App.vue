<template>
  <HeaderBar />
  <MenuBar />

  <!-- Chỉ chỗ này thay đổi theo route -->
  <RouterView :key="$route.fullPath" />

  <BottomNav />
</template>

<script setup>
import HeaderBar from './components/HeaderBar.vue'
import MenuBar from './components/MenuBar.vue'
import BottomNav from './components/BottomNav.vue'
</script>

<style>
a {
  text-decoration: none;
  color: inherit;
}
</style>
