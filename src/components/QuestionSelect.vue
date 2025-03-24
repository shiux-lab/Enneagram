<script setup lang="ts">
import type { QuestionOption } from '@/types/datasets'

defineProps<{
  question: QuestionOption[]
  disabled?: boolean
}>()
</script>

<template>
  <div class="grid gap-4">
    <RippleButton
      :disabled="disabled"
      class="flex justify-evenly whitespace-normal h-auto"
      variant="outline"
      v-for="(item, key) in question"
      :value="item.value"
      :key="key"
      @click="$emit('selected', item.value)"
      ><span class="text-lg">{{ !key ? 'A' : 'B' }}:</span>{{ item.name }}</RippleButton
    >
  </div>
</template>
