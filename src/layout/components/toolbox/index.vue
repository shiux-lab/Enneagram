<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import Toolbox from '@/components/Toolbox.vue'
import LoginTool from '@/layout/components/toolbox/components/LoginTool.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const toggleDarkMode = () => {
  toggleDark()
}

const { locale } = useI18n()

const switchLocale = () => {
  if (locale.value === 'en') {
    locale.value = 'zh'
  } else {
    locale.value = 'en'
  }
}
</script>

<template>
  <LoginTool />
  <Toolbox y="bottom-10" @click="switchLocale" icon="mingcute:translate-fill" />
  <Toolbox
    y="top-20"
    @click="toggleDarkMode"
    :icon="isDark ? 'streamline:brightness-1-solid' : 'streamline:dark-dislay-mode-solid'"
  />
</template>

<style scoped></style>
