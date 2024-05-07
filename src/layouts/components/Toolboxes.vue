<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { transformI18n } from '@/plugins/i18n'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const toggleDarkMode = () => {
  toggleDark()
}

const { getIsOpen } = storeToRefs(useUserStore())

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
  <Popover default-open v-model:open="getIsOpen">
    <PopoverTrigger as-child>
      <Toolbox y="top-10" icon="streamline:login-1-solid" />
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">{{ transformI18n('form.title') }}</h4>
          <p class="text-sm text-muted-foreground">{{ transformI18n('form.description') }}</p>
        </div>
        <LoginForm />
      </div>
    </PopoverContent>
  </Popover>
  <Toolbox y="bottom-10" @click="switchLocale" icon="mingcute:translate-fill" />
  <Toolbox
    y="top-20"
    @click="toggleDarkMode"
    :icon="isDark ? 'streamline:brightness-1-solid' : 'streamline:dark-dislay-mode-solid'"
  />
</template>

<style scoped></style>
