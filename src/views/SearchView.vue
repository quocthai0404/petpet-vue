<template>
  <div class="search">
    <h1 style="padding: 10px">Kết quả tìm kiếm cho "{{ kw }}"</h1>

    <div v-if="!kw" class="empty">Vui lòng nhập từ khóa để tìm kiếm.</div>

    <div v-else>
      <!-- ✅ ProductList có prop search -->
      <ProductList :search="kw" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import ProductList from '../components/ProductList.vue'

const route = useRoute()
const kw = ref(route.query.search || '')

// 🔥 lắng query.search, update kw khi nó đổi
watch(
  () => route.query.search,
  (newVal) => {
    kw.value = newVal || ''
  },
)
</script>

<style scoped>
.search {
  padding: 10px;
}
.empty {
  padding: 16px;
  background: #fff;
  border-radius: 10px;
}
</style>
