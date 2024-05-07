<script setup lang="ts">
import { Button } from '@/components/ui/button'
import type { QuestionOption } from '@/types/datasets';

defineProps<{
  question: QuestionOption[]
  disabled?: boolean
}>()
</script>

<template>
  <div class="grid gap-4">
    <Button
      :disabled="disabled"
      class="flex justify-evenly whitespace-normal h-auto"
      variant="outline"
      v-for="(item, key) in question"
      :value="item.value"
      :key="key"
      @click="$emit('selected', item.value)"
      ><span class="text-lg">{{ !key ? 'A' : 'B' }}:</span>{{ item.name }}</Button
    >
  </div>
</template>

<style scoped></style>
