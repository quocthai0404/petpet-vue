<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Xin lỗi, trang bạn tìm không tồn tại.</p>
    <RouterLink to="/">← Về trang chủ</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 40px 20px;
}
.not-found h1 {
  font-size: 4rem;
  margin-bottom: 10px;
  color: #e53935;
}
.not-found p {
  margin-bottom: 20px;
}
</style>
