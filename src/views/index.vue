<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import type { EnneagramData } from '@/types/global'
import { useUserStore } from '@/stores/user'
// 我提供了一份，英文的题库，具体看你怎么弄，可能格式并不是你需要的，你可以联系我🐶
import enQuestions from '@/dataset/zh/questions'
import zhQuestions from '@/dataset/zh/questions'
import { getCurrentLocale, transformI18n } from '@/plugins/i18n'
import { getRoutes } from '@/router'
import { createI18n } from 'vue-i18n'
import type { QuestionOption } from '@/types/datasets'

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

const isOpen = computed(() => !isLogin)

const questionsI18n = createI18n({
  legacy: false,
  locale: getCurrentLocale().value,
  fallbackLocale: 'zh',
  messages: {
    'en': {questions: enQuestions},
    'zh': {questions: zhQuestions}
  }
})

// 是否显示问题
const isOpenQuestion = ref(true)

// 当前问题
const questionI18nStringStart = 'questions'

// 问题计数
const selectedCount = ref<number>(0)

const questionI18nString = computed(() => questionI18nStringStart +'.'+ selectedCount.value)

const question = ref<QuestionOption[]>(questionsI18n.global.tm(questionI18nString.value))

// 问题总数
const totalQuestionCount = ref<number>(questionsI18n.global.tm(questionI18nStringStart).length)

// 问题计数处理
const handleSelected = (value: number) => {
  selectedCount.value++;
  if(selectedCount.value === totalQuestionCount.value){
    isOpenQuestion.value = false
    enneagramData.value.push({
        name: user.value,
        value: enneagram.value
    })
  }else{  
    question.value = questionsI18n.global.tm(questionI18nString.value);
    // done
    enneagramItemPlusOne(value)
  }
}



// 问题进度
const progressValue = computed(() => (selectedCount.value / totalQuestionCount.value) * 100)

const loginIn = () => {
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
      {{ transformI18n('timeout') }}
      <p class="text-foreground">{{ transformI18n('description') }}</p>
      <p class="text-lg text-destructive underline" @click="loginIn" v-show="isOpen">
        {{ transformI18n('form.waning') }}
      </p>
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
      <span class="ml-4 text-sm text-muted-foreground"
        >{{ selectedCount }}/{{ totalQuestionCount }}</span
      >
    </div>
  </CardContent>
  <Dialog v-if="isDesktop" :open="false">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ transformI18n('form.title') }}</DialogTitle>
        <DialogDescription>{{ transformI18n('form.description') }}</DialogDescription>
      </DialogHeader>
      <LoginForm />
    </DialogContent>
  </Dialog>

  <Drawer v-else :open="false">
    <DrawerContent>
      <DrawerHeader class="text-left">
        <DrawerTitle>{{ transformI18n('form.title') }}</DrawerTitle>
        <DrawerDescription>{{ transformI18n('form.description') }}</DrawerDescription>
      </DrawerHeader>
      <LoginForm />
    </DrawerContent>
  </Drawer>
</template>

<style scoped></style>