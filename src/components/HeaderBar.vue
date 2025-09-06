<template>
  <div class="header">
    <div class="search-box">
      <img src="/petpet_icons/icon_logo.jpg" alt="search" />
      <input
        v-model="q"
        type="text"
        placeholder="Thức ăn ngon, đa dạng ..."
        @keydown.enter="doSearch"
      />
    </div>
    <div class="header-icons">
      <img src="/petpet_icons/icon_qr.jpg" alt="qr" />
      <img src="/petpet_icons/icon_bell.jpg" alt="bell" />
      <img src="/petpet_icons/icon_user.jpg" alt="user" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const q = ref('')
const router = useRouter()

function doSearch() {
  const kw = q.value.trim()
  if (!kw) return
  // đẩy sang route /products/search?search=kw
  router.push({ path: '/products/search', query: { search: kw } })
  q.value = ''
}
</script>
