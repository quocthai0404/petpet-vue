<template>
  <div class="products">
    <template v-for="(item, idx) in displayItems" :key="item._id || 'banner-' + idx">
      <!-- Nếu là sản phẩm -->
      <ProductCard
        v-if="item.type === 'product'"
        :id="item._id"
        :img="item.image"
        :title="item.name"
        :price="item.price"
        :rating="item.rating || 0"
        :badge="item.badge || ''"
      />

      <!-- Nếu là banner -->
      <BannerCard v-else>
        SEN ƠI EM ĐÓI 😋 <br />
        VÀO HOTDEAL PETPET NGAY!
      </BannerCard>
    </template>

    <div v-if="loading" class="product" style="padding: 16px; text-align: center">Đang tải...</div>

    <div
      v-if="!loading && !hasMore && products.length"
      class="product"
      style="padding: 16px; text-align: center"
    >
      Hết hàng để hiển thị
    </div>

    <div ref="sentinel" style="height: 1px"></div>

    <div v-if="error" class="product" style="padding: 16px; color: #c00">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed, watch } from 'vue'
import ProductCard from './ProductCard.vue'
import BannerCard from './BannerCard.vue'
import { getProducts, searchProducts } from '../services/productService'

const props = defineProps({
  search: { type: String, default: '' },
})

const products = ref([])
const page = ref(1)
const limit = ref(20)
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
    let data
    if (props.search) {
      data = await searchProducts({ search: props.search, page: page.value, limit: limit.value })
    } else {
      data = await getProducts({ page: page.value, limit: limit.value })
    }
    const list = Array.isArray(data.products) ? data.products : []
    products.value.push(...list)
    hasMore.value = !!data.hasMore
    page.value += 1
  } catch (e) {
    error.value = `Không tải được dữ liệu: ${e?.message || e}`
  } finally {
    loading.value = false
  }
}

function resetAndLoad() {
  products.value = []
  page.value = 1
  hasMore.value = true
  loadMore()
}

let observer
onMounted(() => {
  resetAndLoad()
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) loadMore()
    },
    { rootMargin: '400px 0px 0px 0px' },
  )
  if (sentinel.value) observer.observe(sentinel.value)
})
onUnmounted(() => {
  if (observer && sentinel.value) observer.unobserve(sentinel.value)
})

watch(
  () => props.search,
  () => resetAndLoad(),
)
</script>
