<script setup lang="ts">
import type { Question } from '@/types/global'
import { Button } from '@/components/ui/button'

defineProps<{
  question: Question[]
  disabled?: boolean
}>()
</script>

<template>
  <div class="grid gap-4">
    <!-- :variant="!key ? 'default' : 'outline'"  我认为不该让第一个默认默认选中，会影响用户的选择，不该默认有选中样式-->
    <Button
      :disabled="disabled"
      class="flex justify-evenly whitespace-normal h-auto"
      :variant="!key ? 'default' : 'outline'"
      v-for="(item, key) in question"
      :value="item.value"
      :key="key"
      @click="$emit('selected', item.value)"
      ><span class="text-lg">{{ !key ? 'A' : 'B' }}:</span>{{ item.name }}</Button
    >
  </div>
</template>

<style scoped></style>
