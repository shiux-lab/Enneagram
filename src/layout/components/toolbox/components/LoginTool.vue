<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import LoginForm from '@/components/LoginForm.vue'
import Toolbox from '@/components/Toolbox.vue'
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Toolbox y="top-10" icon="streamline:login-1-solid" />
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">{{ $t('form.title') }}</h4>
          <p class="text-sm text-muted-foreground">{{ $t('form.description') }}</p>
        </div>
        <LoginForm />
      </div>
    </PopoverContent>
  </Popover>
</template>

<style scoped></style>
