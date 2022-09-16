<script setup lang="ts">
import { Ref } from 'vue';

const price = ref(5000)
const persent = ref(0)
const pResult = computed(() => {
  return price.value - (price.value * persent.value / 100)
})
const billdays: Ref<number[]> = ref([11, 16, 21])

// const today = ref(() => new Date().getDate())
const fromDay = computed(() => new Date().getDate())
const selectedDay = computed(() => {
  return billdays.value[2]
})

const lowerThenTen = computed(() => {
  return Number(fromDay) <= Number(selectedDay)
})

const expr = () => {
  if (lowerThenTen) {
    const value = (fromDay.value - selectedDay.value) * (pResult.value / 30) + pResult.value
    return Math.ceil(value * 50) / 50
  }

  return pResult.value
}


const result = ref(0)

onMounted(() => {
  result.value = useRoundUp(expr(), 50)
})
watch(() => fromDay.value, () => {
  result.value = useRoundUp(expr(), 50)
})
</script>

<template>
  <div class="wrapper bg-white rounded shadow w-screen">
    <div>{{price}} | {{persent}}% = {{pResult}}</div>
    <div>fromDay: {{fromDay}}</div>

    <div>selectedDay: {{selectedDay}}</div>

    <div>result: {{result}}</div>
  </div>
</template>
