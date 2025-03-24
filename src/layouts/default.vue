<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const router = useRouter()
const route = useRoute()
</script>

<template>
  <div class="relative w-screen h-screen flex justify-center items-center">
    <FlickeringGrid
      class="absolute size-full inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
      :square-size="4"
      :grid-gap="6"
      color="#60A5FA"
      :max-opacity="0.5"
      :flicker-chance="0.1"
      :height="800"
    />
    <Card class="w-[25rem] text-center relative">
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
  </div>
</template>

<style scoped></style>
