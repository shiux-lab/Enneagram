import { createRouter, createWebHistory } from 'vue-router'
import { transformI18n } from '@/plugins/i18n'

const Layout = () => import('@/layout/index.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Layout,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import('@/views/index/index.vue'),
          meta: {
            title: 'title'
          }
        },
        {
          path: '/helper',
          name: 'helper',
          component: () => import('@/views/helper/index.vue'),
          meta: {
            title: 'helper.title'
          }
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/About.vue'),
          meta: {
            title: 'about.title'
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  //beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta && to.meta.title) {
    //判断是否有标题
    document.title = transformI18n(to.meta.title)
  }
  next() //执行进入路由，如果不写就不会进入目标页
})

export default router
