<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  y: string
  icon: string
}>()
</script>

<template>
  <div
    :class="[y]"
    class="absolute left-full bg-foreground overflow-hidden rounded-r hover:rounded-r-full transition-all duration-300 w-1 hover:w-8 h-8 cursor-pointer"
  >
    <Icon :icon="icon" class="w-4 h-4 text-background absolute top-1/2 right-2 -translate-y-1/2" />
  </div>
</template>
