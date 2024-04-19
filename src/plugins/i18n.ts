import { createI18n } from 'vue-i18n'
import type { App, WritableComputedRef } from 'vue'
import { isObject } from '@vueuse/core'

export const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  messages: {
    zh: await import('@/locales/zh.json'),
    en: await import('@/locales/en.json')
  }
})

/**
 * 国际化转换工具函数（自动读取根目录locales文件夹下文件进行国际化匹配）
 * @param message message
 * @returns 转化后的message
 */
export function transformI18n(message: any = '') {
  return i18n.global.t(message)
}

export const useI18n = (app: App) => {
  return app.use(i18n)
}
