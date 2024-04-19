import { defineStore } from 'pinia'

interface State {
  isLogin: boolean
  user: string
  enneagram: number[]
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    isLogin: false,
    user: '',
    enneagram: [0, 0, 0, 0, 0, 0, 0, 0, 0]
  }),
  getters: {
    getUser(): string | null {
      return this.user
    }
  },
  actions: {
    setIsLogin(isLogin: boolean) {
      this.isLogin = isLogin
    },
    enneagramItemPlusOne(key: number) {
      this.enneagram[key]++
    }
  }
})
