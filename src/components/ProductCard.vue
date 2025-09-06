<template>
  <div class="product">
    <RouterLink :to="`/product/${id}`">
      <img :src="img" :alt="title" />
    </RouterLink>

    <div class="product-info">
      <span v-if="badge" class="badge">{{ badge }}</span>

      <div class="product-title">
        <RouterLink :to="`/product/${id}`">{{ title }}</RouterLink>
      </div>

      <div class="rating">
        <img v-for="n in 5" :key="n" :src="n <= rating ? filledStar : emptyStar" alt="star" />
      </div>

      <div class="product-price">
        {{ price }}$
        <!-- ✅ icon giỏ hàng click thêm -->
        <span class="cart-icon" @click.stop="onAddToCart"> 🛒 </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { cart } from '../stores/cart'

const props = defineProps({
  id: { type: String, required: true },
  img: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: [String, Number], required: true },
  rating: { type: Number, default: 0 },
  badge: { type: String, default: '' },
})

const toast = useToast()
const filledStar = 'https://img.icons8.com/fluency/16/star.png'
const emptyStar = 'https://img.icons8.com/fluency/16/star--v1.png'

function onAddToCart() {
  cart.add({ _id: props.id, name: props.title, image: props.img, price: props.price }, 1)
  toast.success('Đã thêm vào giỏ 🛒')
}
</script>

<style scoped>
.cart-icon {
  cursor: pointer;
  margin-left: 6px;
  transition: transform 0.2s ease;
}
.cart-icon:hover {
  transform: scale(1.2);
}

.product-title a {
  text-decoration: none;
  color: inherit;
}
</style>
