import { reactive, computed, watch } from 'vue'

const LS_KEY = 'petpet_cart_v1'

// an toàn JSON.parse
function readLS() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : { items: [] }
  } catch {
    return { items: [] }
  }
}
function writeLS(state) {
  localStorage.setItem(LS_KEY, JSON.stringify({ items: state.items }))
}

const state = reactive(readLS())

// đồng bộ localStorage mỗi khi items thay đổi
watch(
  () => state.items,
  () => writeLS(state),
  { deep: true },
)

export const cart = {
  // state
  items: state.items, // [{id,name,image,price,qty}]
  // derived
  count: computed(() => state.items.reduce((s, it) => s + it.qty, 0)),
  total: computed(() => state.items.reduce((s, it) => s + Number(it.price) * it.qty, 0)),

  // actions
  add(product, qty = 1) {
    const id = product._id || product.id
    if (!id) return
    const found = state.items.find((it) => it.id === id)
    if (found) found.qty += qty
    else
      state.items.push({
        id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty,
      })
  },
  updateQty(id, qty) {
    const it = state.items.find((x) => x.id === id)
    if (!it) return
    it.qty = Math.max(1, Number(qty) || 1)
  },
  remove(id) {
    const idx = state.items.findIndex((x) => x.id === id)
    if (idx >= 0) state.items.splice(idx, 1)
  },
  clear() {
    state.items.splice(0, state.items.length)
  },
}
