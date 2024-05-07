<script setup lang="ts">
import { use } from 'echarts/core'
import { LegendComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import VChart, { THEME_KEY } from 'vue-echarts'
import { useI18n } from 'vue-i18n'
import { provide, ref } from 'vue'
import type { EnneagramData } from '@/types/global'

const props = defineProps<{
  data: EnneagramData[]
}>()

const data = props.data

const { tm, rt } = useI18n()

use([CanvasRenderer, RadarChart, LegendComponent, TooltipComponent])

provide(THEME_KEY, 'auto')

// @ts-ignore  https://github.com/intlify/vue-i18n-next/issues/1119
const labels = [...tm('enneagram.labels')]

const option = ref({
  tooltip: {
    trigger: 'axis'
  },
  color: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
  legend: {
    left: 'center',
    bottom: 'bottom',
    data: props.data.map((item) => item.name)
  },
  radar: {
    // shape: 'circle',
    axisName: {
      fontSize: 12,
      margin: 10
    },
    indicator: labels.map((item) => {
      return {
        name: rt(item)
      }
    })
  },
  series: [
    {
      type: 'radar',
      data: data,
      lineStyle: {
        width: 4
      },
      areaStyle: {
        opacity: 0.2
      },
      tooltip: {
        trigger: 'item'
      }
    }
  ]
})
</script>

<template>
  <VChart :option="option" class="h-[20rem] w-11/12 mx-auto" />
</template>

<style scoped></style>
