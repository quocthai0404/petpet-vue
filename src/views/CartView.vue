<template>
  <div class="cart">
    <h1 style="padding: 10px">Giỏ hàng ({{ cart.count }})</h1>

    <div v-if="!cart.items.length" class="empty">
      Giỏ hàng trống.
      <RouterLink to="/" style="margin-left: 6px">← Về trang chủ</RouterLink>
    </div>

    <div v-else class="cart-list">
      <div v-for="it in cart.items" :key="it.id" class="cart-item">
        <img :src="it.image" :alt="it.name" />
        <div class="info">
          <RouterLink :to="`/product/${it.id}`" class="name">{{ it.name }}</RouterLink>
          <div class="price">{{ it.price }}$</div>

          <div class="actions">
            <label>Số lượng:</label>
            <input
              type="number"
              min="1"
              :value="it.qty"
              @input="(e) => cart.updateQty(it.id, e.target.value)"
            />
            <button
              class="remove"
              @click="(cart.remove(it.id), toast.error(`Đã xóa ${it.name} khỏi giỏ 🗑️`))"
            >
              Xoá
            </button>
          </div>
        </div>
      </div>

      <div class="summary">
        <div>Tổng số lượng: {{ cart.count }}</div>
        <div>Tạm tính: {{ cart.total }}$</div>
        <div style="margin-top: 10px">
          <PaypalCheckout
            :amount="cart.total.value"
            currency="USD"
            @success="onPaySuccess"
            @error="onPayError"
            @cancel="onPayCancel"
          />
        </div>
      </div>
      <button class="clear" @click="clearCart">Xoá giỏ hàng</button>
      <!-- ✅ PayPal real checkout -->
    </div>
  </div>
</template>

<script setup>
import { cart } from '../stores/cart'
import { useToast } from 'vue-toastification'
import PaypalCheckout from '../components/PaypalCheckout.vue'

const toast = useToast()

function clearCart() {
  cart.clear()
  toast.error('Đã xóa giỏ hàng 🗑️')
}

onError: (err) => {
  console.error('PayPal error:', err)
  emit('error', err)
}

function onPaySuccess(details) {
  // details có payer, id đơn hàng, v.v.
  cart.clear()
  toast.success('Thanh toán thành công ✅', { timeout: 1000, hideProgressBar: true })
}

function onPayError(err) {
  console.error(err)
  toast.error('Thanh toán thất bại', { timeout: 1500, hideProgressBar: true })
}

function onPayCancel() {
  toast.info('Đã hủy thanh toán', { timeout: 1000, hideProgressBar: true })
}
</script>

<style scoped>
.cart {
  padding: 10px;
}
.empty {
  padding: 16px;
  background: #fff;
  border-radius: 10px;
}
.cart-list {
  display: grid;
  gap: 10px;
}
.cart-item {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 10px;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}
.cart-item img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
}
.info .name {
  font-weight: 700;
  display: block;
  margin-bottom: 6px;
}
.price {
  color: #e53935;
  font-weight: 700;
  margin-bottom: 8px;
}
.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.actions input {
  width: 70px;
  padding: 6px;
}
.remove {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 6px 10px;
}
.summary {
  background: #fff;
  border-radius: 10px;
  padding: 12px;
  display: grid;
  gap: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}
.checkout {
  background: #ff6f00;
  color: #fff;
  border: 0;
  border-radius: 10px;
  padding: 12px;
  font-weight: 700;
}
.clear {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
}
</style>
