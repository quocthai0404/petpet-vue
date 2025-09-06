import { createApp } from 'vue'
import App from './App.vue'
import './style.css' // global CSS mình gom từ file cũ
import router from './router'
// import toast
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

createApp(App)
  .use(router)
  .use(Toast, {
    position: 'top-right',
    timeout: 1000,
    hideProgressBar: true,
    transition: 'Vue-Toastification__fade',
  })
  .mount('#app')
