<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: "hy"
  }
})

const price = ref(5000)
const percent = ref(0)
const billdays = [11, 16, 21]
</script>

<template>
  <NuxtLayout name="home">
    <Suspense>
      <!-- <PageView /> -->
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <div class="flex justify-around w-full mx-auto px-5">
      <InputEntry class="flex-initial mx-auto w-full" v-model="price" />
      <InputEntry class="flex-initial mx-auto w-15" v-model="percent" :max="100" :max-length="3" />
    </div>

    <CalculatorView class="w-full grid grid-cols-1 mt-2 rounded-md border overflow-hidden flex-1 bg-purple-200"
      :price="price" :percent="percent" :billdays="billdays" />

  </NuxtLayout>
</template>
