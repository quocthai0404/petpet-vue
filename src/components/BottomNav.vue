<script setup>
const items = [
  { icon: '/petpet_icons/icon_home.jpg', text: 'Trang chủ', to: '/' },
  { icon: '/petpet_icons/icon_video.jpg', text: 'Video', to: '/video' },
  { icon: '/petpet_icons/icon_category.jpg', text: 'Danh mục', to: '/category' },
  { icon: '/petpet_icons/icon_cart_tab.jpg', text: 'Giỏ hàng', to: '/cart' },
  { icon: '/petpet_icons/icon_account.jpg', text: 'Tài khoản', to: '/account' },
]
</script>

<template>
  <div class="bottom-nav">
    <div v-for="item in items" :key="item.text">
      <RouterLink :to="item.to || '#'">
        <img :src="item.icon" :alt="item.text" />
        {{ item.text }}
      </RouterLink>
    </div>
  </div>
</template>
