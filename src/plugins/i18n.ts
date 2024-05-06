import { createI18n } from 'vue-i18n'
import type { App } from 'vue'

import messages from '@intlify/unplugin-vue-i18n/messages'


export const i18n = createI18n({
  legacy: false,
  locale: localStorage.lang ? localStorage.lang : 'zh',
  fallbackLocale: 'zh',
  messages: messages
})

export const getLocales = (): string[] => i18n.global.availableLocales

export const availableLangCodes = getLocales()

/**
 * 国际化转换工具函数（自动读取根目录locales文件夹下文件进行国际化匹配）
 * @param message message
 * @returns 转化后的message
 */
export function transformI18n(message: any = '') {
  if (typeof message !== 'string') {
    return message
  }
  return i18n.global.t(message)
}

export const useI18n = (app: App) => {
  return app.use(i18n)
}

export function getCurrentLocale() {
  return i18n.global.locale
}
