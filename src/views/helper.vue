<script setup lang="ts">
import { getCurrentLocale, transformI18n } from '@/plugins/i18n'
import { getRoutes } from '@/router'

import type { TypeItem } from '@/types/datasets'

import enTypeDesc from '@/dataset/en/typeDesc'

import zhTypeDesc from '@/dataset/zh/typeDesc'

import enneagramImg from '@/assets/images/Enneagram_symbo.png'

definePage({
  name: 'helper',
  meta: {
    title: 'helper.title'
  }
})

const typeItems = ref<TypeItem[]>()

onMounted(() => {
  if (getCurrentLocale().value === 'en') {
    typeItems.value = enTypeDesc
  } else {
    typeItems.value = zhTypeDesc
  }
})
</script>

<template>
  <CardHeader>
    <CardTitle>{{
      transformI18n(getRoutes().find((item) => item.path === '/helper')?.meta?.title)
    }}</CardTitle>
  </CardHeader>
  <CardContent>
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <ScrollArea class="h-72 pr-3">
            <Accordion type="single" class="w-full" collapsible>
              <AccordionItem v-for="item in typeItems" :key="item.title" :value="item.title">
                <AccordionTrigger>{{ item.title }}</AccordionTrigger>
                <AccordionContent class="text-left">
                  <p v-for="el in item.content" :key="el.element">
                    <span class="text-gray-500 font-semibold">【{{ el.element }}】</span
                    >{{ el.text }}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
        </CarouselItem>
        <CarouselItem>
          <img :src="enneagramImg" class="h-[18rem] mx-auto" />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </CardContent>
</template>

<style scoped></style>
