import { setupLayouts, createGetRoutes } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { transformI18n } from '@/plugins/i18n'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes)
})

export const getRoutes = createGetRoutes(router)

router.beforeEach((to, from, next) => {
  const route = getRoutes().find((route) => route.path === to.path)

  //beforeEach是router的钩子函数，在进入路由前执行
  if (route?.meta && route.meta.title) {
    //判断是否有标题
    document.title = transformI18n(route.meta.title)
  }

  next()
})

export default router
