<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import type { EnneagramData, Question } from '@/types/global'
import { useUserStore } from '@/stores/user'
import questions from '@/dataset/questions.json'
import { transformI18n } from '@/plugins/i18n'
import { getRoutes } from '@/router'

definePage({
  name: 'index',
  meta: {
    title: 'title'
  }
})

const userStore = useUserStore()

const { isLogin, user, enneagram } = storeToRefs(userStore)

const { enneagramItemPlusOne } = userStore

const enneagramData = ref<EnneagramData[]>([])

// Reuse `form` section
const isDesktop = useMediaQuery('(min-width: 768px)')

const isOpen = ref(!isLogin.value)

watch(isLogin, (val) => {
  isOpen.value = !val
})

// 是否显示问题
const isOpenQuestion = ref(true)

// 当前问题
const question = ref<Question[]>(questions[0])

// 问题计数
const selectedCount = ref<number>(1)

// 问题计数
const handleSelected = (value: number) => {
  if (questions[selectedCount.value]) {
    question.value = questions[selectedCount.value++]
    enneagramItemPlusOne(value)
  } else {
    isOpenQuestion.value = false
    enneagramData.value.push({
      name: user.value,
      value: enneagram.value
    })
  }
}
</script>

<template>
  <CardHeader>
    <CardTitle>{{
      transformI18n(getRoutes().find((item) => item.path === '/')?.meta?.title)
    }}</CardTitle>
    <CardDescription>
      <span class="text-lg text-foreground">{{ user || '' }}</span>
      {{ $t('timeout') }}
      <p class="text-foreground">{{ $t('description') }}</p>
      <p class="text-lg text-destructive" v-show="isOpen">{{ $t('form.waning') }}</p>
    </CardDescription>
  </CardHeader>
  <CardContent>
    <QuestionSelect
      v-show="isOpenQuestion"
      :disabled="isOpen"
      :question="question"
      @selected="handleSelected"
    />
    <Transition name="bounce">
      <EnneagramChart v-model:data="enneagramData" v-if="!isOpenQuestion" />
    </Transition>
  </CardContent>
  <Dialog v-if="isDesktop" :open="false">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ $t('form.title') }}</DialogTitle>
        <DialogDescription>{{ $t('form.description') }}</DialogDescription>
      </DialogHeader>
      <LoginForm />
    </DialogContent>
  </Dialog>

  <Drawer v-else :open="false">
    <DrawerContent>
      <DrawerHeader class="text-left">
        <DrawerTitle>{{ $t('form.title') }}</DrawerTitle>
        <DrawerDescription>{{ $t('form.description') }}</DrawerDescription>
      </DrawerHeader>
      <LoginForm />
    </DrawerContent>
  </Drawer>
</template>

<style scoped></style>
