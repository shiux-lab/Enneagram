<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'
</script>

<template>
  <config-provider>
    <div vaul-drawer-wrapper class="flex flex-col min-h-screen bg-background">
      <RouterView />
    </div>
  </config-provider>
</template>

<style scoped></style>
