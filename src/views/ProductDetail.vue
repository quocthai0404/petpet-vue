<!-- <template>
  <div class="detail">
    <div class="detail-media">
      <img v-if="product?.image" :src="product.image" :alt="product?.name" />
    </div>

    <div class="detail-info">
      <h1 class="detail-title">{{ product?.name || 'Đang tải...' }}</h1>
      <div class="detail-price">{{ product?.price }}</div>

      <div class="detail-actions">
        <button class="btn buy">Mua ngay</button>
        <button class="btn add">Thêm vào giỏ</button>
      </div>

      <div class="detail-desc">
        <h3>Mô tả</h3>
        <p>{{ product?.description }}</p>
      </div>
    </div>
  </div>

  <div class="related-wrap" v-if="product?.category">
    <h2 style="padding: 10px">Sản phẩm cùng danh mục</h2>
    <RelatedList :category="product.category" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import RelatedList from '../sections/RelatedList.vue'
import { getProductById } from '../services/productService'

// ✅ NHẬN PROP id TỪ ROUTER
const props = defineProps({ id: { type: String, required: true } })

const product = ref(null)
const loading = ref(false)
const error = ref('')

async function fetchDetail(pid) {
  if (!pid) return
  loading.value = true
  error.value = ''
  try {
    product.value = await getProductById(pid)
  } catch (e) {
    error.value = e?.message || String(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchDetail(props.id))
watch(
  () => props.id,
  (nid) => fetchDetail(nid),
)
</script>

<style scoped>
.detail {
  padding: 10px;
}
.detail-media img {
  width: 100%;
  border-radius: 10px;
  display: block;
}
.detail-title {
  font-size: 18px;
  margin: 10px 0;
}
.detail-price {
  color: #e53935;
  font-weight: 700;
  font-size: 18px;
  margin: 6px 0;
}
.detail-actions {
  display: flex;
  gap: 10px;
  margin: 10px 0 16px;
}
.btn {
  flex: 1 1 0;
  padding: 12px;
  border: 0;
  border-radius: 10px;
  font-weight: 600;
}
.btn.buy {
  background: #ff6f00;
  color: #fff;
}
.btn.add {
  background: #ffffff;
  border: 1px solid #ddd;
}
.detail-desc h3 {
  margin: 10px 0 6px;
}
.related-wrap {
  margin-top: 10px;
}
</style> -->

<script setup>
import { ref, watch, onMounted } from 'vue'
import RelatedList from '../sections/RelatedList.vue'
import { getProductById } from '../services/productService'
import { cart } from '../stores/cart'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const props = defineProps({ id: { type: String, required: true } })
const router = useRouter()

const product = ref(null)
const loading = ref(false)
const error = ref('')

async function fetchDetail(pid) {
  if (!pid) return
  loading.value = true
  error.value = ''
  try {
    product.value = await getProductById(pid)
  } catch (e) {
    error.value = e?.message || String(e)
  } finally {
    loading.value = false
  }
}

const toast = useToast()
function onAddToCart() {
  if (!product.value) return
  cart.add(product.value, 1)
  // bạn có thể hiển thị toast ở đây
  toast.success('Đã thêm vào giỏ 🛒')
}

function onBuyNow() {
  if (!product.value) return
  cart.add(product.value, 1)
  router.push('/cart')
}

onMounted(() => fetchDetail(props.id))
watch(
  () => props.id,
  (nid) => fetchDetail(nid),
)
</script>

<template>
  <div class="detail">
    <div class="detail-media">
      <img v-if="product?.image" :src="product.image" :alt="product?.name" />
    </div>

    <div class="detail-info">
      <h1 class="detail-title">{{ product?.name || 'Đang tải...' }}</h1>
      <div class="detail-price">{{ product?.price }}$</div>

      <div class="detail-actions">
        <button class="btn add" @click="onAddToCart">Thêm vào giỏ</button>
        <button class="btn buy" @click="onBuyNow">Mua ngay</button>
      </div>

      <div class="detail-desc">
        <h3>Mô tả</h3>
        <p>{{ product?.description }}</p>
      </div>
    </div>
  </div>

  <div class="related-wrap" v-if="product?.category">
    <h2 style="padding: 10px">Sản phẩm cùng danh mục</h2>
    <RelatedList :category="product.category" />
  </div>
</template>

<style scoped>
.detail {
  padding: 10px;
}
.detail-media img {
  width: 100%;
  border-radius: 10px;
  display: block;
}
.detail-title {
  font-size: 18px;
  margin: 10px 0;
}
.detail-price {
  color: #e53935;
  font-weight: 700;
  font-size: 18px;
  margin: 6px 0;
}
.detail-actions {
  display: flex;
  gap: 10px;
  margin: 10px 0 16px;
}
.btn {
  flex: 1 1 0;
  padding: 12px;
  border: 0;
  border-radius: 10px;
  font-weight: 600;
}
.btn.buy {
  background: #ff6f00;
  color: #fff;
}
.btn.add {
  background: #ffffff;
  border: 1px solid #ddd;
}

/* nút Thêm vào giỏ */
.btn.add {
  background: #ffffff;
  border: 1px solid #ddd;
  color: #333;
}
.btn.add:hover {
  background: #f5f5f5;
  transform: translateY(-2px); /* nhô lên nhẹ */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* nút Mua ngay */
.btn.buy {
  background: #ffd500;
  border: none;
  color: #fff;
}
.btn.buy:hover {
  background: #e65c00;
  transform: scale(1.03); /* hơi to ra */
  box-shadow: 0 6px 12px rgba(255, 111, 0, 0.4);
}

.detail-desc h3 {
  margin: 10px 0 6px;
}
.related-wrap {
  margin-top: 10px;
}
</style>
