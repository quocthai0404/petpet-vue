import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    // ✅ Product detail trong src/views
    {
      path: '/product/:id',
      name: 'product-detail',
      component: () => import('../views/ProductDetail.vue'),
      props: true,
    },

    {
      path: '/products/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
    },
    // ...
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
    },
    // ...

    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },

    // optional: trang 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
