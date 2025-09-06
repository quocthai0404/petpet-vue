<template>
  <div class="products">
    <template v-for="(item, idx) in displayItems" :key="item._id || 'bn-' + idx">
      <ProductCard
        v-if="item.type === 'product'"
        :id="item._id"
        :img="item.image"
        :title="item.name"
        :price="item.price"
        :rating="item.rating || 0"
        :badge="item.badge || ''"
      />
      <BannerCard v-else> DEAL CÙNG DANH MỤC 🔥 </BannerCard>
    </template>

    <div v-if="loading" class="product" style="padding: 16px; text-align: center">Đang tải...</div>
    <div
      v-if="!loading && !hasMore && products.length"
      class="product"
      style="padding: 16px; text-align: center"
    >
      Hết hàng
    </div>
    <div v-if="error" class="product" style="padding: 16px; color: #c00">{{ error }}</div>
  </div>

  <!-- sentinel đặt ngoài -->
  <div ref="sentinel" style="height: 1px"></div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import BannerCard from '../components/BannerCard.vue'
import { getProducts } from '../services/productService'

const props = defineProps({
  category: { type: String, required: true },
})

const products = ref([])
const page = ref(1)
const limit = ref(10)
const hasMore = ref(true)
const loading = ref(false)
const error = ref('')
const sentinel = ref(null)

const displayItems = computed(() => {
  const out = []
  products.value.forEach((p, i) => {
    out.push({ ...p, type: 'product' })
    if ((i + 1) % 15 === 0) out.push({ type: 'banner' })
  })
  return out
})

async function loadMore() {
  if (loading.value || !hasMore.value) return
  loading.value = true
  error.value = ''
  try {
    const data = await getProducts({
      page: page.value,
      limit: limit.value,
      category: props.category,
    })
    products.value.push(...(data.products || []))
    hasMore.value = !!data.hasMore
    page.value += 1
  } catch (e) {
    error.value = `Không tải được dữ liệu: ${e?.message || e}`
  } finally {
    loading.value = false
  }
}

let observer
function startObserver() {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) loadMore()
    },
    { root: null, rootMargin: '0px 0px 600px 0px', threshold: 0 },
  )
  if (sentinel.value) observer.observe(sentinel.value)
}

function resetAndLoad() {
  products.value = []
  page.value = 1
  hasMore.value = true
  loadMore()
}

onMounted(() => {
  resetAndLoad()
  startObserver()
})
onUnmounted(() => {
  if (observer && sentinel.value) observer.unobserve(sentinel.value)
})

// Nếu đổi category khi đang ở trang detail (nhảy sp khác), reset danh sách
watch(
  () => props.category,
  () => resetAndLoad(),
)
</script>
