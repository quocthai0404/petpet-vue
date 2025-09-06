<template>
  <div class="menu">
    <div class="menu-item" v-for="item in items" :key="item.text">
      <img :src="item.icon" :alt="item.text" />
      <span>{{ item.text }}</span>
    </div>
  </div>
</template>

<script setup>
const items = [
  { icon: '/petpet_icons/icon_paw.jpg', text: 'Dành Cho Boss' },
  { icon: '/petpet_icons/icon_food.jpg', text: 'Thức ăn' },
  { icon: '/petpet_icons/icon_toy.jpg', text: 'Đồ chơi' },
  { icon: '/petpet_icons/icon_health.jpg', text: 'Sức khoẻ' },
]
</script>
