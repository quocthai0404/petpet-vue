<template>
  <div>
    <div ref="paypalEl"></div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  amount: { type: [Number, String], required: true }, // tổng tiền
  currency: { type: String, default: 'USD' }, // tiền tệ
})
const emit = defineEmits(['success', 'error', 'cancel'])

const paypalEl = ref(null)
let paypalButtons = null

function loadScript(src) {
  return new Promise((resolve, reject) => {
    // nếu đã có thì resolve
    if (window.paypal) return resolve()
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = reject
    document.head.appendChild(s)
  })
}

async function renderButtons() {
  // clear cũ
  if (paypalEl.value) paypalEl.value.innerHTML = ''
  if (paypalButtons && paypalButtons.close)
    try {
      await paypalButtons.close()
    } catch {}

  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID
  if (!clientId) {
    console.error('Missing VITE_PAYPAL_CLIENT_ID')
    return
  }

  const sdkUrl = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=${encodeURIComponent(props.currency)}`
  await loadScript(sdkUrl)

  const amount = Number(props.amount || 0)
  const value = amount > 0 ? amount.toFixed(2) : '0.00'

  paypalButtons = window.paypal.Buttons({
    style: { layout: 'horizontal', color: 'gold', shape: 'rect', label: 'paypal' },
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{ amount: { currency_code: props.currency, value } }],
      })
    },
    onApprove: async (data, actions) => {
      try {
        const details = await actions.order.capture()
        emit('success', details) // gửi dữ liệu cho parent xử lý (clear cart, toast…)
      } catch (e) {
        emit('error', e)
      }
    },
    onCancel: () => emit('cancel'),
    onError: (err) => emit('error', err),
  })

  paypalButtons.render(paypalEl.value)
}

onMounted(renderButtons)
// nếu số tiền đổi, re-render nút
watch(
  () => props.amount,
  () => renderButtons(),
)

onBeforeUnmount(async () => {
  if (paypalButtons && paypalButtons.close)
    try {
      await paypalButtons.close()
    } catch {}
})
</script>
