<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import type { EnneagramData, Question } from '@/types/global'
import { useUserStore } from '@/stores/user'
// 我提供了一份，英文的题库，具体看你怎么弄，可能格式并不是你需要的，你可以联系我🐶
import questions from '@/dataset/zh/questions.json'
import { transformI18n } from '@/plugins/i18n'
import { getRoutes } from '@/router'

import { Progress } from '@/components/ui/progress';

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

const isOpen = computed(()=>!isLogin);

// 是否显示问题
const isOpenQuestion = ref(true)

// 当前问题
const question = ref<Question[]>(questions[0])

// 问题计数
const selectedCount = ref<number>(0)

// 问题计数处理
const handleSelected = (value: number) => {
  if (questions[selectedCount.value]) {
    question.value = questions[++selectedCount.value]
    enneagramItemPlusOne(value)
  } else {
    // done
    isOpenQuestion.value = false
    enneagramData.value.push({
      name: user.value,
      value: enneagram.value
    })
  }
}


// 问题总数
const totalQuestionCount = questions.length;


// 问题进度
const progressValue = computed(()=> (selectedCount.value / totalQuestionCount)  * 100);

const loginIn = ()=>{
  // #TODO... 显示未登录，用户并不知道如何登录，建议点击时，弹窗登录，看你具体要不要这么做
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
      <p class="text-lg text-destructive underline" @click="loginIn" v-show="isOpen">{{ $t('form.waning') }}</p>
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
    <div class="flex items-center mt-4">
      <Progress :modelValue="progressValue"></Progress>
      <span class="ml-4 text-sm text-muted-foreground">{{ selectedCount }}/{{ totalQuestionCount }} </span>
    </div>
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
