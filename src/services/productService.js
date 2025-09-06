// function joinUrl(...parts) {
//   return parts
//     .map((p) => String(p || '').replace(/(^\/+|\/+$)/g, ''))
//     .filter(Boolean)
//     .join('/')
// }

// const BASE = import.meta.env.VITE_API_BASE_URL || ''
// const API_PREFIX = 'api'

// async function fetchJSON(url, options = {}) {
//   const res = await fetch(url, {
//     headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
//     ...options,
//   })
//   if (!res.ok) {
//     const text = await res.text().catch(() => '')
//     throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`)
//   }
//   return res.json()
// }

// export async function getProducts({ page = 1, limit = 5 } = {}) {
//   const path = joinUrl(BASE, API_PREFIX, 'products')
//   const url = `${path}?page=${page}&limit=${limit}`
//   return fetchJSON(url)
// }

// ---- URL utils ----
function joinUrl(...parts) {
  return parts
    .map((p) => String(p || '').replace(/(^\/+|\/+$)/g, ''))
    .filter(Boolean)
    .join('/')
}

const BASE = import.meta.env.VITE_API_BASE_URL || '' // '' nếu dùng proxy
const API_PREFIX = 'api'

// Tạo URL: nếu BASE rỗng => bắt đầu bằng '/api/...'; ngược lại => 'BASE/api/...'
function apiPath(...segs) {
  const path = joinUrl(API_PREFIX, ...segs)
  return BASE ? `${joinUrl(BASE, path)}` : `/${path}`
}

// ---- fetch helper ----
async function fetchJSON(url, options = {}) {
  const opts = { ...options }
  if (!opts.method) opts.method = 'GET'

  // CHỈ set Content-Type khi KHÔNG phải GET (tránh preflight cho GET)
  if (opts.method !== 'GET') {
    opts.headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) }
  }

  const res = await fetch(url, opts)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`)
  }
  return res.json()
}

// ---- APIs ----
export async function getProducts({ page = 1, limit = 5, category } = {}) {
  const params = new URLSearchParams({ page, limit })
  if (category) params.set('category', category)

  const url = `${apiPath('products')}?${params.toString()}`
  return fetchJSON(url)
}

export async function getProductById(id) {
  const url = apiPath('products', id)
  return fetchJSON(url)
}

export async function searchProducts({ search, page = 1, limit = 20 } = {}) {
  const path = joinUrl(BASE, API_PREFIX, 'products/search')
  const params = new URLSearchParams({ search, page, limit })
  const url = `${path}?${params.toString()}`
  return fetchJSON(url)
}
