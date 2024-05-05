import { createRouter, createWebHistory } from 'vue-router/auto'
import { transformI18n } from '@/plugins/i18n'

import { setupLayouts, createGetRoutes } from 'virtual:generated-layouts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts
})

export const getRoutes = createGetRoutes(router)

router.beforeEach((to, from, next) => {
  //beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta && to.meta.title) {    
    //判断是否有标题
    document.title = transformI18n(to.meta.title)
  }

  next()
})

export default router
