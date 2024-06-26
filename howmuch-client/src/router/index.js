import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '../views/Main.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Main
    }
  ]
})

export default router
