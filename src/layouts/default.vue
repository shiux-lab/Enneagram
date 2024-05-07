<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const router = useRouter()
const route = useRoute()
</script>

<template>
  <Card class="w-[25rem] text-center mx-auto mt-20 relative">
    <RouterView />

    <Toolboxes />
    <div
      @click="router.back()"
      v-show="router.options.history.state.back"
      class="absolute top-2 overflow-hidden left-2 rounded-full cursor-pointer"
    >
      <Icon icon="solar:round-arrow-left-bold" class="w-6 h-6 text-foreground" />
    </div>
    <div
      @click="router.push('/helper')"
      v-show="route.path !== '/helper'"
      class="absolute top-2 overflow-hidden right-2 rounded-full cursor-pointer"
    >
      <Icon icon="solar:danger-circle-bold" class="w-6 h-6 text-foreground" />
    </div>
  </Card>
</template>

<style scoped></style>
